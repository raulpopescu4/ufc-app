const fighterService = require('../../services/FighterService');
const validator = require('validator');

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
        const sanitizedBody = {
            name: validator.escape(req.body.name),
            age: validator.toInt(req.body.age),
            division: validator.escape(req.body.division),
            record: validator.escape(req.body.record),
            champion: validator.toBoolean(req.body.champion)
        };

        const fighter = await fighterService.createFighter(sanitizedBody);
        res.status(201).send(fighter);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getFighterById = async (req, res) => {
    try {
        const id = validator.escape(req.params.id);

        const fighter = await fighterService.findFighterById(id);
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
        const id = validator.escape(req.params.id);
        const sanitizedBody = {
            name: validator.escape(req.body.name),
            age: validator.toInt(req.body.age),
            division: validator.escape(req.body.division),
            record: validator.escape(req.body.record),
            champion: validator.toBoolean(req.body.champion)
        };

        const fighter = await fighterService.updateFighterById(id, sanitizedBody);
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
        const id = validator.escape(req.params.id);

        const result = await fighterService.deleteFighterById(id);
        if (result) {
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
