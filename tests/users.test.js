require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app.js'); 
const User = require('../models/User.js');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Authentication', () => {
  const userData = {
    username: 'testuser',
    password: 'password123'
  };
  let token;

  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should not sign up an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData);
    expect(res.statusCode).toEqual(409);
    expect(res.text).toEqual('Username already exists');
  });

  it('should log in an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(userData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should not log in with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });
    expect(res.statusCode).toEqual(401);
    expect(res.text).toEqual('Invalid username or password');
  });

  afterAll(async () => {
    await User.deleteMany({});
  });
});
