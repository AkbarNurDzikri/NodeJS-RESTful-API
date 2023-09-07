import supertest from 'supertest';
import {web} from '../src/application/web.js';
import {createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, removeAllTestAddress, removeAllTestContact, removeTestUser} from './test-utils.js';

describe('POST /api/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContact();
    await removeTestUser();
  });

  it('should can create new address', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: 'Jl. Test',
        city: 'Kota Test',
        province: 'Provinsi Test',
        country: 'Indonesia',
        postCode: '0267'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('Jl. Test');
    expect(result.body.data.city).toBe('Kota Test');
    expect(result.body.data.province).toBe('Provinsi Test');
    expect(result.body.data.country).toBe('Indonesia');
    expect(result.body.data.postCode).toBe('0267');
  });

  it('should reject if address request is invalid', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: 'Jl. Test',
        city: 'Kota Test',
        province: 'Provinsi Test',
        country: '',
        postCode: ''
      });

    expect(result.status).toBe(400);
  });

  it('should reject if contactId is invalid', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post('/api/contacts/' + (testContact.id + 1) + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: 'Jl. Test',
        city: 'Kota Test',
        province: 'Provinsi Test',
        country: '',
        postCode: ''
      });

    expect(result.status).toBe(404);
  });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContact();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('Jl. Test');
    expect(result.body.data.city).toBe('Kota Test');
    expect(result.body.data.province).toBe('Provinsi Test');
    expect(result.body.data.country).toBe('Indonesia');
    expect(result.body.data.postCode).toBe('0267');
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContact();
    await removeTestUser();
  });

  it('should can update address', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: 'Jl. Baru',
        city: 'Kota Baru',
        province: 'Provinsi Baru',
        country: 'Indonesia Baru',
        postCode: '026712345'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe('Jl. Baru');
    expect(result.body.data.city).toBe('Kota Baru');
    expect(result.body.data.province).toBe('Provinsi Baru');
    expect(result.body.data.country).toBe('Indonesia Baru');
    expect(result.body.data.postCode).toBe('026712345');
  });

  it('should reject if request is invalid', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: 'Jl. Baru',
        city: 'Kota Baru',
        province: 'Provinsi Baru',
        country: '',
        postCode: ''
      });

    expect(result.status).toBe(400);
  });

  it('should reject if contactId is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: 'Jl. Baru',
        city: 'Kota Baru',
        province: 'Provinsi Baru',
        country: 'Indonesia Baru',
        postCode: '026712345'
      });

    expect(result.status).toBe(404);
  });

  it('should reject if addressId is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test')
      .send({
        street: 'Jl. Baru',
        city: 'Kota Baru',
        province: 'Provinsi Baru',
        country: 'Indonesia Baru',
        postCode: '026712345'
      });

    expect(result.status).toBe(404);
  });
});

describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddress();
    await removeAllTestContact();
    await removeTestUser();
  });

  it('should can remove address', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull(); 
  });

  it('should reject if addressId is not found', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });

  it('should reject if contactId is not found', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete('/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});