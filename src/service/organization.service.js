import db from "../models/index.js";
import { ApiError } from "../utility/api-error.js";
import { MESSAGES } from "../utility/messages.js";

const { organization } = db;

const addUpdateOrganizationService = async (
  id,
  name,
  description,
  is_active,
  status
) => {
  let existingOrganization;
  if (id) {
    existingOrganization = await getOrganization({
      id,
    });
    if (!existingOrganization) {
      throw new ApiError(404, MESSAGES.ORGANIZATION_NOT_FOUND);
    }
    return updateOrganizationService(id, name, description, is_active, status);
  } else {
    existingOrganization = await getOrganization({
      name,
    });
    if (existingOrganization) {
      throw new ApiError(404, MESSAGES.ORGANIZATION_ALREADY_EXISTS);
    }
    return addOrganizationService(name, description, is_active, status);
  }
};

const getOrganizationsService = async (limit, offset) => {
  try {
    const result = await organization.findAndCountAll({
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

const addOrganizationService = async (name, description, is_active, status) => {
  try {
    const result = await organization.create({
      name,
      description,
      is_active,
      status,
    });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const updateOrganizationService = async (
  id,
  name,
  description,
  is_active,
  status
) => {
  try {
    const result = await organization.update(
      {
        name,
        description,
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
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const getOrganization = async (where) => {
  try {
    const result = await organization.findOne({
      where,
    });
    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

export { addUpdateOrganizationService, getOrganizationsService };
