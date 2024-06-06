require('dotenv').config();
const request = require('supertest');
const app = require('../app.js'); 
const mongoose = require('mongoose');
const Fight = require('../models/Fight.js');
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

describe('Fight CRUD operations', () => {
  let token;
  let fightId;
  let fighter1Id;
  let fighter2Id;

  beforeAll(async () => {
    
    const fighter1 = new Fighter({ name: 'Fighter 1', age: 30, division: 'Welterweight', record: '15-0-0', champion: true });
    const fighter2 = new Fighter({ name: 'Fighter 2', age: 32, division: 'Middleweight', record: '12-3-0', champion: false });
    await fighter1.save();
    await fighter2.save();
    fighter1Id = fighter1._id;
    fighter2Id = fighter2._id;
  });

  beforeAll(() => {
    token = generateTestToken({ id: 'testUserId', role: 'user' });
  });

  it('should create a new fight', async () => {
    const res = await request(app)
      .post('/api/fights/addFight')
      .set('Authorization', `Bearer ${token}`)
      .send({
        card: 1,
        rounds: 5,
        outcome: 'Win by KO',
        fighters: [fighter1Id, fighter2Id],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    fightId = res.body._id;
  });

  it('should get all fights', async () => {
    const res = await request(app)
      .get('/api/fights/allFights')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a fight by id', async () => {
    const res = await request(app)
      .get(`/api/fights/fight/${fightId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', fightId);
  });

  it('should update a fight by id', async () => {
    const res = await request(app)
      .put(`/api/fights/updateFight/${fightId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ rounds: 3 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('rounds', 3);
  });

  it('should delete a fight by id', async () => {
    const res = await request(app)
      .delete(`/api/fights/deleteFight/${fightId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });

  afterAll(async () => {
    await Fighter.deleteMany({});
  });
});
