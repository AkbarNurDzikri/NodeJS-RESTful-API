import supertest from 'supertest';
import {web} from '../src/application/web.js';
import {createTestContact, createManyTestContacts, createTestUser, getTestContact, removeAllTestContact, removeTestUser} from "./test-utils.js";

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

describe('DELETE /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact()
    await removeTestUser();
  });

  it('should can delete exist contact', async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete('/api/contacts/' + testContact.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });

  it('should reject if contact is not found', async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete('/api/contacts/' + (testContact.id + 1)) // parameter di set dengan id yang tidak ada di database
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});

describe('GET /api/contacts', () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContacts();
  });

  afterEach(async () => {
    await removeAllTestContact()
    await removeTestUser();
  });

  it('should can search without params', async () => {
    const result = await supertest(web)
     .get('/api/contacts')
     .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.pages).toBe(1);
    expect(result.body.paging.totalPages).toBe(2);
    expect(result.body.paging.totalItems).toBe(15);
  });

  it('should can search to page 2', async () => {
    const result = await supertest(web)
     .get('/api/contacts')
     .query({
      page: 2
     })
     .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.pages).toBe(2);
    expect(result.body.paging.totalPages).toBe(2);
    expect(result.body.paging.totalItems).toBe(15);
  });

  it('should can search using name', async () => {
    const result = await supertest(web)
     .get('/api/contacts')
     .query({
      name: 'test 1' // mencari nama yang mengandung string 'test 1' (termasuk 'test 10', 'test 11' s.d 14)
     })
     .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.pages).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });

  it('should can search using email', async () => {
    const result = await supertest(web)
     .get('/api/contacts')
     .query({
      email: 'test1' // mencari email yang mengandung string 'test1' (termasuk 'test10', 'test11' s.d 14)
     })
     .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.pages).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });

  it('should can search using phone', async () => {
    const result = await supertest(web)
     .get('/api/contacts')
     .query({
      phone: '08821' // mencari no telpon yang mengandung string '08821' (termasuk '088210', '088211' s.d 14)
     })
     .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.pages).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });
});