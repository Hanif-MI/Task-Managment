import {
  addSectionToProjectService,
  addUpdateSectionService,
  getAllSectionsService,
  removeSectionFromProjectService,
} from "../service/section.service.js";
import { ApiError } from "../utility/api-error.js";
import { ApiResponse } from "../utility/api-response.js";
import { MESSAGES } from "../utility/messages.js";

const addUpdateSection = async (req, res, next) => {
  try {
    const { id, section_name, is_active, status } = req.body;
    const result = await addUpdateSectionService(
      id,
      section_name,
      is_active,
      status
    );
    if (!result) {
      return res.send(new ApiError(400, MESSAGES.ERROR_WHILE_ADDING_SECTION));
    }
    res.send(
      new ApiResponse(
        200,
        result,
        id ? MESSAGES.SECTION_UPDATED_SUCCESS : MESSAGES.SECTION_ADDED_SUCCESS
      )
    );
  } catch (error) {
    next(error);
  }
};

const getAllSections = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    const result = await getAllSectionsService(limit, offset);
    if (!result) {
      return res.send(new ApiError(400, MESSAGES.ERROR_WHILE_FETCHING_SECTION));
    }
    res.send(
      new ApiResponse(
        200,
        {
          data: result.rows,
          total: result.count,
          page: parseInt(page),
          totalPages: Math.ceil(result.count / limit),
        },
        MESSAGES.SECTION_ADDED_SUCCESS
      )
    );
  } catch (error) {
    next(error);
  }
};

const addSectionToProject = async (req, res, next) => {
  try {
    const { section_id, project_id } = req.body;
    const result = await addSectionToProjectService(section_id, project_id);
    if (!result)
      return res.send(new ApiError(400, MESSAGES.ERROR_WHILE_ADDING_SECTION));

    res.send(
      new ApiResponse(
        200,
        result,
        MESSAGES.SECTION_ADDED_TO_PROJECT_SECTION_ADDED_SUCCESS
      )
    );
  } catch (error) {
    next(error);
  }
};

const removeSectionFromProject = async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await removeSectionFromProjectService(id);
    if (!result)
      return res.send(new ApiError(400, MESSAGES.ERROR_WHILE_ADDING_SECTION));

    res.send(
      new ApiResponse(
        200,
        result,
        MESSAGES.SECTION_REMOVED_FROM_PROJECT_SECTION_ADDED_SUCCESS
      )
    );
  } catch (error) {
    next(error);
  }
};

export { addUpdateSection, getAllSections,addSectionToProject, removeSectionFromProject };
