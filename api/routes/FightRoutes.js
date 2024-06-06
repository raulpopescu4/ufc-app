const express = require('express');
const router = express.Router();
const fightController = require('../controllers/FightController');
const authenticateToken = require('../../authMiddleware');

router.get('/allFights', authenticateToken, fightController.getAllFights);

router.post('/addFight', authenticateToken, fightController.addNewFight);

router.get('/fight/:id', authenticateToken, fightController.getFightById);

router.put('/updateFight/:id', authenticateToken, fightController.updateFightById);

router.delete('/deleteFight/:id', authenticateToken, fightController.deleteFightById);

module.exports = router;
