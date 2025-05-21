import {
  addUpdateOrganizationService,
  getOrganizationsService,
} from "../service/organization.service.js";
import { ApiResponse } from "../utility/api-response.js";
import { MESSAGES } from "../utility/messages.js";

const addUpdateOrganization = async (req, res, next) => {
  try {
    const { id, name, description, is_active, status } = req.body;
    const result = await addUpdateOrganizationService(
      id,
      name,
      description,
      is_active,
      status
    );
    return res.send(
      new ApiResponse(
        200,
        result,
        id ? MESSAGES.ORGANIZATION_UPDATED : MESSAGES.ORGANIZATION_ADDED
      )
    );
  } catch (error) {
    next(error);
  }
};

const getOrganizations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const result = await getOrganizationsService(limit, offset);

    return res.send(
      new ApiResponse(200, {
        data: result.rows,
        total: result.count,
        page: parseInt(page),
        totalPages: Math.ceil(result.count / limit),
      })
    );
  } catch (error) {
    next(error);
  }
};

export { addUpdateOrganization, getOrganizations };
