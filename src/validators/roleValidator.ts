import Joi from 'joi';

export const createRoleSchema = Joi.object({
  name: Joi.string().required(),
});

export const updateRoleSchema = Joi.object({
  name: Joi.string().optional(),
}).min(1); // Ensure at least one field is provided
