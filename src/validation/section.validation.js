import Joi from "joi";

const addSectionSchema = Joi.object({
  id: Joi.string().optional(),
  section_name: Joi.string().required(),
});

const addSectionToProjectSchema = Joi.object({
  section_id: Joi.string().required(),
  project_id: Joi.string().required(),
});

export { addSectionSchema, addSectionToProjectSchema};
