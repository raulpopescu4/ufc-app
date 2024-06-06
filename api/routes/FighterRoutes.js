const express = require('express');
const router = express.Router();
const fighterController = require('../controllers/FighterController');
const authenticateToken = require('../../authMiddleware');

router.get('/allFighters', authenticateToken, fighterController.getAllFighters);

router.post('/addFighter', authenticateToken, fighterController.addNewFighter);

router.get('/fighter/:id', authenticateToken, fighterController.getFighterById);

router.put('/updateFighter/:id', authenticateToken, fighterController.updateFighterById);

router.delete('/deleteFighter/:id', authenticateToken, fighterController.deleteFighterById);

module.exports = router;
