require('dotenv').config();
const mongoose = require('mongoose');
const mongoDBURI = process.env.MONGODB_URI;

mongoose.connect(mongoDBURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
