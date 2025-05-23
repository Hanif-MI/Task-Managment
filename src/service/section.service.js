import db from "../models/index.js";
import { ApiError } from "../utility/api-error.js";
import { MESSAGES } from "../utility/messages.js";
import { getProject } from "./project.service.js";

const { section, project_section } = db;

const addUpdateSectionService = async (id, section_name, is_active, status) => {
  if (id) {
    const isSectionExist = await getSection({ id });
    if (!isSectionExist) {
      throw new ApiError(403, MESSAGES.SECTION_NOT_FOUND);
    }
    const result = await section.update(
      {
        section_name,
        is_active,
        status,
      },
      {
        where: {
          id,
        },
      }
    );
    return result;
  } else {
    const isSectionExist = await getSection({ section_name });
    if (isSectionExist) {
      throw new ApiError(403, MESSAGES.SECTION_ALREADY_EXISTS);
    }
    const result = await section.create({
      section_name,
      is_active,
      status,
    });
    return result;
  }
};

const getSection = async (where) => {
  const result = await section.findOne({
    where,
  });
  return result;
};

const getAllSectionsService = async (limit, offset) => {
  try {
    const result = await section.findAndCountAll({
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const addSectionToProjectService = async (sectionId, projectId) => {
  try {
    const isSectionExist = await getSection({ id: sectionId });
    if (!isSectionExist) throw new ApiError(403, MESSAGES.SECTION_NOT_FOUND);

    const isProjectExist = await getProject({ id: projectId });
    if (!isProjectExist) throw new ApiError(403, MESSAGES.PROJECT_NOT_FOUND);

    const isSectionAlreadyAdded = await getProjectSection({
      section_id: sectionId,
      project_id: projectId,
    });
    if (isSectionAlreadyAdded)
      throw new ApiError(403, MESSAGES.SECTION_ALREADY_ADDED_TO_PROJECT);

    const result = await project_section.create({
      section_id: sectionId,
      project_id: projectId,
    });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const removeSectionFromProjectService = async (id) => {
  try {
    const isSectionExist = await getProjectSection({ id });
    if (!isSectionExist) throw new ApiError(403, MESSAGES.SECTION_NOT_FOUND);
    await project_section.update({ is_active: false }, { where: { id } });
    const result = await project_section.destroy({ where: { id } });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const getProjectSection = async (where) => {
  try {
    const result = await project_section.findOne({ where });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

export {
  addUpdateSectionService,
  getAllSectionsService,
  addSectionToProjectService,
  removeSectionFromProjectService,
  getSection,
  getProjectSection
};
