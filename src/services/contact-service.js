import { createContactValidation, getContactvalidation, updateContactValidation } from "../validations/contact-validation.js";
import { validate } from "../validations/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-error.js";

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

const get = async (user, contactId) => {
  contactId = validate(getContactvalidation, contactId);
  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true
    }
  });

  if(!contact) {
    throw new ResponseError(404, 'Contact is not found');
  }

  return contact;
};

const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contact.id
    }
  });

  if(totalContactInDatabase !== 1) {
    throw new ResponseError(404, 'Contact is not found !');
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id
    },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true
    }
  });
};

export default {create, get, update};