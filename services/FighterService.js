const Fighter = require('../models/Figther');
const faker = require('@faker-js/faker');

const createFighter = async (fighterData) => {
    const fighter = new Fighter(fighterData);
    await fighter.save();
    return fighter;
};

const findAllFighters = async () => {
    return await Fighter.find();
};

const findFighterById = async (id) => {
    return await Fighter.findById(id);
};

const updateFighterById = async (id, updateData) => {
    return await Fighter.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteFighterById = async (id) => {
    return await Fighter.findByIdAndDelete(id);
};


module.exports = {
    createFighter,
    findAllFighters,
    findFighterById,
    updateFighterById,
    deleteFighterById
};
