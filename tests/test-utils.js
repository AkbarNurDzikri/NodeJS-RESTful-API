import { prismaClient } from "../src/application/database.js";
import bcrypt from 'bcrypt';

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test'
    }
  })
};

export const createTestUser = async () => {
  return prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test"
    }
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: 'test'
    }
  });
};

export const removeAllTestContact = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: 'test'
    }
  });
};

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test@pzn.com',
      phone: '123456'
    }
  });
};

export const createManyTestContacts = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: `test`,
        firstName: `test ${i}`,
        lastName: `test ${i}`,
        email: `test${i}@pzn.com`,
        phone: `0882${i}`
      }
    });
    
  }
};

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: 'test'
    }
  });
};

export const removeAllTestAddress = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: 'test'
      }
    }
  });
};