const express = require('express');
const cors = require('cors');
const fighterRoutes = require('./api/routes/FighterRoutes');
const fightRoutes = require('./api/routes/FightRoutes');
const authRoutes = require('./api/routes/AuthRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/fighters', fighterRoutes);
app.use('/api/fights', fightRoutes);
app.use('/api/auth', authRoutes);

app.get('/check-connectivity', (req, res) => {
    res.status(200).send({ message: 'Backend is reachable' });
});

module.exports = app;
