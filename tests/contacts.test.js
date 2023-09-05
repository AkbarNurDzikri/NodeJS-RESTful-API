import supertest from 'supertest';
import {web} from '../src/application/web.js';
import {createTestUser, removeAllTestContact, removeTestUser} from "./test-utils.js";

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
        phone: '245265'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe('test');
    expect(result.body.data.lastName).toBe('test');
    expect(result.body.data.email).toBe('test@pzn.com');
    expect(result.body.data.phone).toBe('245265');
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