import Joi from 'joi';

const createContactValidation = Joi.object({
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).optional(),
  email: Joi.string().max(200).email().optional(),
  phone: Joi.string().max(20).optional()
});

const getContactvalidation = Joi.number().positive().required();

const updateContactValidation = Joi.object({
  id: Joi.number().positive().required(),
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).optional(),
  email: Joi.string().max(200).email().optional(),
  phone: Joi.string().max(20).optional()
});

export {createContactValidation, getContactvalidation, updateContactValidation};