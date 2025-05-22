import db from "../models/index.js";
import { getOrganizationById } from "./organization.service.js";
import { ApiError } from "../utility/api-error.js";
import { MESSAGES } from "../utility/messages.js";
import { getUserByEmail } from "./user.service.js";
import { where } from "sequelize";

const { project, project_member, user } = db;

const addUpdateProjectService = async (params) => {
  const {
    id,
    name,
    due_date,
    organization_id,
    description,
    is_active,
    status,
  } = params;
  const validateOrganization = await getOrganizationById({
    id: organization_id,
  });
  if (!validateOrganization) {
    throw new ApiError(404, MESSAGES.ORGANIZATION_NOT_FOUND);
  }

  const projectData = {
    name,
    due_date,
    organization_id,
    description,
    is_active,
    status,
  };

  if (id) {
    const existingProject = await getProject({ id });
    if (!existingProject) {
      throw new ApiError(404, MESSAGES.PROJECT_NOT_FOUND);
    }
    return updateProject(id, projectData);
  }

  const existingProject = await getProject({ name });
  if (existingProject) {
    throw new ApiError(404, MESSAGES.PROJECT_ALREADY_EXISTS);
  }
  return addProject(projectData);
};

const getProjectsService = async (limit, offset, userId) => {
  try {
    const include = [
      {
        model: project_member,
        as: "members",
        attributes: ["id", "member_id"],
        include: [
          {
            model: user,
            as: "member",
            attributes: ["id", "name", "email"],
          },
        ],
      },
    ]; 
    if (userId) {
      include[0].where = {
        member_id: userId,
      };
    }
    const result = await project.findAndCountAll({
      where: {
        is_active: true,
      },
      limit,
      offset,
      include,
      order: [["created_at", "DESC"]],
    });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const addProject = async (projectData) => {
  return project.create(projectData);
};

const updateProject = async (id, projectData) => {
  return project.update(projectData, {
    where: { id },
  });
};

const getProject = async (where, include) => {
  try {
    return await project.findOne({ where, include });
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const addMemberToProjectService = async (projectId, userId) => {
  try {
    const projectData = await getProject({ id: projectId });
    if (!projectData) {
      throw new ApiError(404, MESSAGES.PROJECT_NOT_FOUND);
    }

    const userData = await getUserByEmail({ id: userId });
    if (!userData) {
      throw new ApiError(404, MESSAGES.USER_NOT_FOUND);
    }

    const isMemberIsAlreadyMember = await project_member.findOne({
      where: { project_id: projectId, member_id: userId },
    });

    if (isMemberIsAlreadyMember) {
      throw new ApiError(404, MESSAGES.MEMBER_ALREADY_ADDED);
    }

    const result = await addMemberToProject(projectId, userId);
    if (!result) {
      throw new ApiError(404, MESSAGES.MEMBER_NOT_ADDED);
    }
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const removeMemberFromProjectService = async (id) => {
  try {
    const projectData = await getMemberFromProjectById({ id });
    if (!projectData) {
      throw new ApiError(404, MESSAGES.MEMBER_ID_NOT_VALID);
    }
    return project_member.destroy({
      where: { id },
    });
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const addMemberToProject = async (projectId, userId) => {
  try {
    const result = await project_member.create({
      project_id: projectId,
      member_id: userId,
    });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const getMemberFromProjectById = async (where) => {
  try {
    const result = await project_member.findOne({
      where,
    });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

export {
  addUpdateProjectService,
  getProjectsService,
  getProject,
  addMemberToProjectService,
  removeMemberFromProjectService,
};
