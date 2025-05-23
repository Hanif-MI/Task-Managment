import {
  addUpdateTaskService,
  assignTaskToMemberService,
  getTasksService,
  removeTaskFromMemberService,
} from "../service/task.service.js";
import { ApiResponse } from "../utility/api-response.js";
import { MESSAGES } from "../utility/messages.js";

const addUpdateTask = async (req, res, next) => {
  try {
    const {
      id,
      title,
      due_date,
      project_id,
      section_id,
      description,
      is_active,
    } = req.body;
    const result = await addUpdateTaskService(
      id,
      title,
      due_date,
      project_id,
      section_id,
      description,
      is_active
    );
    res.send(
      new ApiResponse(
        200,
        result,
        id
          ? MESSAGES.TASK_UPDATED_SUCCESS
          : MESSAGES.TASK_ADDED_SUCCESS
      )
    );
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { limit, offset, project_id, section_id } = req.query;
    const result = await getTasksService(limit, offset, project_id, section_id);
    res.send(new ApiResponse(200, result, MESSAGES.TASK_FETCHED_SUCCESS));
  } catch (error) {
    next(error);
  }
};

const assignTaskToMember = async (req, res, next) => {
  try {
    const { task_id, member_id } = req.body;
    const result = await assignTaskToMemberService(task_id, member_id);
    res.send(new ApiResponse(200, result, MESSAGES.TASK_ASSIGNED_SUCCESS));
  } catch (error) {
    next(error);
  }
};

const removeTaskFromMember = async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await removeTaskFromMemberService(id);
    if (!result) {
      return res.send(
        new ApiResponse(404, null, MESSAGES.MEMBER_ERROR_WHILE_DELETING)
      );
    }
    res.send(new ApiResponse(200, result, MESSAGES.TASK_DELETED_SUCCESS));
  } catch (error) {
    next(error);
  }
};

export { addUpdateTask, getTasks, assignTaskToMember, removeTaskFromMember };
