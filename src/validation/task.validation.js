import Joi from "joi";

const taskSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().min(3).max(50).required(),
  due_date: Joi.date().optional(),
  project_id: Joi.string().required(),
  section_id: Joi.string().required(),
  description: Joi.string().min(3).max(500).optional(),
  is_active: Joi.boolean().default(true),
});

const assignTaskToMemberSchema = Joi.object({
  task_id: Joi.string().required(),
  member_id: Joi.string().required(),
});

export { taskSchema,assignTaskToMemberSchema };
