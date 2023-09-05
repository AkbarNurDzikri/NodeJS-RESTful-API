import { createContactValidation } from "../validations/contact-validation.js";
import { validate } from "../validations/validation.js";
import { prismaClient } from "../application/database.js";

const create = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true
    }
  });
};

export default {create};