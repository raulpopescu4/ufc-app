require('dotenv').config();
const request = require('supertest');
const app = require('../app.js'); 
const mongoose = require('mongoose');
const Fighter = require('../models/Figther.js');
const { generateTestToken } = require('../utils/jwt.js');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Fighter CRUD operations', () => {
  let token;
  let fighterId;

  beforeAll(() => {
    token = generateTestToken({ id: 'testUserId', role: 'user' });
  });

  it('should create a new fighter', async () => {
    const res = await request(app)
      .post('/api/fighters/addFighter')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        age: 28,
        division: 'Lightweight',
        record: '10-2-0',
        champion: false,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    fighterId = res.body._id;
  });

  it('should get all fighters', async () => {
    const res = await request(app)
      .get('/api/fighters/allFighters')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a fighter by id', async () => {
    const res = await request(app)
      .get(`/api/fighters/fighter/${fighterId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', fighterId);
  });

  it('should update a fighter by id', async () => {
    const res = await request(app)
      .put(`/api/fighters/updateFighter/${fighterId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ age: 29 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('age', 29);
  });

  it('should delete a fighter by id', async () => {
    const res = await request(app)
      .delete(`/api/fighters/deleteFighter/${fighterId}`)
      .set('Authorization', `Bearer ${token}`);
    if (res.statusCode !== 204) {
      console.error(res.body);
    }
    expect(res.statusCode).toEqual(204);
  });
});
