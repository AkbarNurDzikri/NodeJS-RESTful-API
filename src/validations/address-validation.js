import Joi from "joi";

const createAddressValidation = Joi.object({
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  province: Joi.string().max(100).optional(),
  country: Joi.string().max(100).required(),
  postCode: Joi.string().max(10).required()
});

const getAddressValidation = Joi.number().positive().min(1).required();

export {createAddressValidation, getAddressValidation};