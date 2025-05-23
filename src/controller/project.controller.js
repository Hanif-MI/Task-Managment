import {
  addMemberToProjectService,
  addUpdateProjectService,
  getProjectsService,
  removeMemberFromProjectService,
} from "../service/project.service.js";
import { ApiResponse } from "../utility/api-response.js";
import { MESSAGES } from "../utility/messages.js";

const addUpdateProject = async (req, res, next) => {
  try {
    const projectData = req.body;
    const result = await addUpdateProjectService(projectData);
    res.send(
      new ApiResponse(
        200,
        result,
        projectData.id
          ? MESSAGES.PROJECT_UPDATED_SUCCESS
          : MESSAGES.PROJECT_ADDED_SUCCESS
      )
    );
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, user_id } = req.query;
    const offset = (page - 1) * limit;
    let data = await getProjectsService(limit, offset, user_id);
    const result = data.rows.map((item) => item.get({ plain: true }));
    for (let item of result) {
      item.sections = item.sections.map((sec) => sec.section.section_name);
    }

    res.send(
      new ApiResponse(200, {
        data: result,
        total: data.count,
        page: parseInt(page),
        totalPages: Math.ceil(data.count / limit),
      })
    );
  } catch (error) {
    next(error);
  }
};

const addMemberToProject = async (req, res, next) => {
  try {
    const { projectId, userId } = req.body;
    const result = await addMemberToProjectService(projectId, userId);
    res.send(new ApiResponse(200, result, MESSAGES.MEMBER_ADDED_SUCCESS));
  } catch (error) {
    next(error);
  }
};

const removeMemberFromProject = async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await removeMemberFromProjectService(id);
    if (!result) {
      return res.send(
        new ApiResponse(404, null, MESSAGES.MEMBER_ERROR_WHILE_DELETING)
      );
    }
    res.send(new ApiResponse(200, result, MESSAGES.MEMBER_REMOVED_SUCCESS));
  } catch (error) {
    next(error);
  }
};

export {
  addUpdateProject,
  getProjects,
  addMemberToProject,
  removeMemberFromProject,
};
