import { createAddressValidation } from "../validations/address-validation.js";
import { validate } from "../validations/validation.js";
import { getContactValidation } from "../validations/contact-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-error.js";

const create = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  });

  if(totalContactInDatabase !== 1) {
    throw new ResponseError(404, 'Contact is not found !');
  }

  const address = validate(createAddressValidation, request);
  address.contactId = contactId;

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postCode: true
    }
  });
};

export default {create};