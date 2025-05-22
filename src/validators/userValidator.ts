import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^\d{10}$/).required(), // Ensure phone is a 10-digit number
  countryCode: Joi.string().pattern(/^\+\d{1,3}$/).required(), // Ensure country code starts with '+' and is 1-3 digits
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(), // Minimum 8 characters for password
  age: Joi.number().integer().min(18).optional(), // Minimum age is 18
  gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
  address: Joi.object({
    address1: Joi.string().optional(),
    address2: Joi.string().allow(null, '').optional(), // Allow empty or null for address2
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    pinCode: Joi.string().pattern(/^\d{6}$/).optional(), // Ensure pinCode is a 6-digit number
  }).optional(),
  role: Joi.string().uuid().optional(), // Ensure role is a valid UUID
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().pattern(/^\d{10}$/).optional(),
  countryCode: Joi.string().pattern(/^\+\d{1,3}$/).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  age: Joi.number().integer().min(18).optional(),
  gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
  address: Joi.object({
    address1: Joi.string().optional(),
    address2: Joi.string().allow(null, '').optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    pinCode: Joi.string().pattern(/^\d{6}$/).optional(),
  }).optional(),
  role: Joi.string().uuid().optional(),
}).min(1); // Ensure at least one field is provided
