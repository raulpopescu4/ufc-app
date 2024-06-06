const fightService = require('../../services/FightService');

const getAllFights = async (req, res) => {
    try {
        const fights = await fightService.findAllFights();
        res.json(fights);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addNewFight = async (req, res) => {
    try {
        const fight = await fightService.createFight(req.body);
        res.status(201).send(fight);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getFightById = async (req, res) => {
    try {
        const fight = await fightService.findFightById(req.params.id);
        if (fight) {
            res.json(fight);
        } else {
            res.status(404).send('Fight not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateFightById = async (req, res) => {
    try {
        const fight = await fightService.updateFightById(req.params.id, req.body);
        if (fight) {
            res.json(fight);
        } else {
            res.status(404).send('Fight not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteFightById = async (req, res) => {
    try {
        const result = await fightService.deleteFightById(req.params.id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send('Fight not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllFights,
    addNewFight,
    getFightById,
    updateFightById,
    deleteFightById
};
