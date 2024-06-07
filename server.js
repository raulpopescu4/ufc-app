const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./api/routes/AuthRoutes');
const fighterRoutes = require('./api/routes/FighterRoutes');
const fightRoutes = require('./api/routes/FightRoutes')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(helmet());


app.use(cors({
  origin: 'http://localhost:3001', 
  optionsSuccessStatus: 200
}));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter);


app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/fighters', fighterRoutes);
app.use('/api/fights', fightRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
