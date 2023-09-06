import supertest from 'supertest';
import {web} from '../src/application/web.js';
import {createTestContact, createTestUser, getTestContact, removeAllTestContact, removeTestUser} from "./test-utils.js";

describe('POST /api/contacts', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContact()
    await removeTestUser();
  });

  it('should can create new contact', async () => {
    const result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization', 'test')
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'test@pzn.com',
        phone: '123456'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe('test');
    expect(result.body.data.lastName).toBe('test');
    expect(result.body.data.email).toBe('test@pzn.com');
    expect(result.body.data.phone).toBe('123456');
  });

  it('should reject if request is invalid', async () => {
    const result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization', 'test')
      .send({
        firstName: '',
        lastName: 'test',
        email: 'emailsalah',
        phone: '64359234532639843752345872346534523487'
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact()
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstName).toBe(testContact.firstName);
    expect(result.body.data.lastName).toBe(testContact.lastName);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it('should return 404 if contactId is not found', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get('/api/contacts/' + (testContact.id +1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});

describe('PUT /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact()
    await removeTestUser();
  });

  it('should can update exist contact', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id)
      .set('Authorization', 'test')
      .send({
        firstName: 'Dzikri',
        lastName: 'Nur Akbar',
        email: 'dzikrinurakbar94@gmail.com',
        phone: '0123456'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstName).toBe('Dzikri');
    expect(result.body.data.lastName).toBe('Nur Akbar');
    expect(result.body.data.email).toBe('dzikrinurakbar94@gmail.com');
    expect(result.body.data.phone).toBe('0123456');
  });

  it('should reject if request is invalid', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id)
      .set('Authorization', 'test')
      .send({
        firstName: '', // dikosongkan
        lastName: 'Nur Akbar',
        email: 'formatemailsalah', // format email tidak sesuai
        phone: '012345614524359283567823456' // karakter > 20
      });

    expect(result.status).toBe(400);
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put('/api/contacts/' + (testContact.id + 1)) // parameter di set dengan id yang tidak ada di database
      .set('Authorization', 'test')
      .send({
        firstName: 'Dzikri',
        lastName: 'Nur Akbar',
        email: 'dzikrinurakbar94@gmail.com',
        phone: '0123456'
      });

    expect(result.status).toBe(404);
  });
});