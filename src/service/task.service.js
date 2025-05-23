import { MESSAGES } from "../utility/messages.js";
import { getMemberFromProjectById, getProject } from "./project.service.js";
import { getProjectSection, getSection } from "./section.service.js";
import db from "../models/index.js";

const { task, task_assign, user } = db;
import { ApiError } from "../utility/api-error.js";
import { where } from "sequelize";

const addUpdateTaskService = async (
  id,
  title,
  due_date,
  project_id,
  section_id,
  description,
  is_active
) => {
  try {
    const taskData = {
      title,
      due_date,
      project_id,
      section_id,
      description,
      is_active,
    };

    const isProjectExists = await getProject({ id: project_id });
    if (!isProjectExists) {
      throw new ApiError(404, MESSAGES.PROJECT_NOT_FOUND);
    }

    const isSectionExists = await getSection({ id: section_id });
    if (!isSectionExists) {
      throw new ApiError(404, MESSAGES.SECTION_NOT_FOUND);
    }

    const isHaveTheSectionInProject = await getProjectSection({
      project_id,
      section_id,
    });

    if (!isHaveTheSectionInProject) {
      throw new ApiError(404, MESSAGES.SECTION_NOT_FOUND_IN_PROJECT);
    }

    if (id) {
      const existingTask = await getTask({ id });
      if (!existingTask) {
        throw new ApiError(404, MESSAGES.TASK_NOT_FOUND);
      }
      const result = updateTask({ id }, taskData);
      return result;
    }

    const existingTask = await getTask({ title });
    if (existingTask) {
      throw new ApiError(404, MESSAGES.TASK_ALREADY_EXISTS);
    }
    const result = await createTask(taskData);
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const getTasksService = async (limit, offset, project_id, section_id) => {
  try {
    let where = {};
    if (project_id) {
      where = {
        project_id,
      };
    }
    if (section_id) {
      where = {
        ...where,
        section_id,
      };
    }
    const result = await task.findAndCountAll({
      limit,
      offset,
      where,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: task_assign,
          as: "task_assigns",
          attributes: ["id"],
          include: [
            {
              model: user,
              as: "user",
              attributes: ["id", "name", "email"],
            },
          ],
        },
      ],
    });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const assignTaskToMemberService = async (taskId, memberId) => {
  try {
    const isTaskExists = await getTask({ id: taskId });
    if (!isTaskExists) {
      throw new ApiError(404, MESSAGES.TASK_NOT_FOUND);
    }

    const isValidMember = await user.findOne({ id: memberId });
    if (!isValidMember) {
      throw new ApiError(404, MESSAGES.MEMBER_ID_NOT_VALID);
    }

    const task = await getTask({ id: taskId });
    if (!task) {
      throw new ApiError(404, MESSAGES.TASK_NOT_FOUND);
    }

    const isHaveAccessOfProject = await getMemberFromProjectById({
      project_id: task.project_id,
      member_id: memberId,
    });
    if (!isHaveAccessOfProject) {
      throw new ApiError(404, MESSAGES.MEMBER_NOT_HAVE_ACCESS);
    }

    const existingAssignment = await task_assign.findOne({
      where: { task_id: taskId, member_id: memberId },
    });

    if (existingAssignment) {
      throw new ApiError(409, MESSAGES.TASK_ALREADY_ASSIGNED);
    }

    const result = await task_assign.create({
      task_id: taskId,
      member_id: memberId,
    });

    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const removeTaskFromMemberService = async (id) => {
  try {
    const existingAssignment = await task_assign.findOne({ where: { id } });
    if (!existingAssignment) throw new ApiError(404, MESSAGES.ENTER_VALID_ID);
    await task_assign.update({ is_active: false }, { where: { id } });
    const result = await task_assign.destroy({ where: { id } });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const createTask = async (taskData) => {
  const result = await task.create(taskData);
  return result;
};

const getTask = async (where) => {
  const result = await task.findOne({ where });
  return result;
};

const updateTask = async (where, taskData) => {
  const result = await task.update(taskData, { where });
  return result;
};

export {
  addUpdateTaskService,
  getTasksService,
  assignTaskToMemberService,
  removeTaskFromMemberService,
};
