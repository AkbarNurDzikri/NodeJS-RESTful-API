import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validations/address-validation.js";
import { validate } from "../validations/validation.js";
import { getContactValidation } from "../validations/contact-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-error.js";
import { add } from "winston";

const checkContactIdMustExists = async (user, contactId) => {
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

  return contactId;
};

const create = async (user, contactId, request) => {
  contactId = await checkContactIdMustExists(user, contactId);

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

const get = async (user, contactId, addressId) => {
  contactId = await checkContactIdMustExists(user, contactId);
  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contactId: contactId,
      id: addressId
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postCode: true
    }
  });

  if(!address) {
    throw new ResponseError(404, 'Address is not found !');
  }

  return address;
};

const update = async (user, contactId, request) => {
  contactId = await checkContactIdMustExists(user, contactId);
  const address = validate(updateAddressValidation, request);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contactId: contactId,
      id: address.id
    }
  });

  if(totalAddressInDatabase !== 1) {
    throw new ResponseError(404, 'Address is not found !');
  }

  return prismaClient.address.update({
    where: {
      contactId: contactId,
      id: address.id
    },
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postCode: address.postCode,
    },
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
export default {create, get, update};