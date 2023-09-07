import supertest from 'supertest';
import {web} from '../src/application/web.js';
import {createTestContact, createTestUser, getTestContact, removeAllTestAddress, removeAllTestContact, removeTestUser} from './test-utils.js';

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