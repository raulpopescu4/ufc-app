const fighterService = require('../../services/FighterService');
const fightService = require('../../services/FightService');

const getAllFighters = async (req, res) => {
    try {
        const fighters = await fighterService.findAllFighters();
        res.json(fighters);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addNewFighter = async (req, res) => {
    try {
        const fighter = await fighterService.createFighter(req.body);
        res.status(201).send(fighter);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getFighterById = async (req, res) => {
    try {
        const fighter = await fighterService.findFighterById(req.params.id);
        if (fighter) {
            res.json(fighter);
        } else {
            res.status(404).send('Fighter not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateFighterById = async (req, res) => {
    try {
        const fighter = await fighterService.updateFighterById(req.params.id, req.body);
        if (fighter) {
            res.json(fighter);
        } else {
            res.status(404).send('Fighter not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteFighterById = async (req, res) => {
    try {
        const result = await fighterService.deleteFighterById(req.params.id);
        if (result) {
            await fightService.deleteFightsByFighterId(req.params.id);
            res.status(204).send();
        } else {
            res.status(404).send('Fighter not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

module.exports = {
    getAllFighters,
    addNewFighter,
    getFighterById,
    updateFighterById,
    deleteFighterById
};
