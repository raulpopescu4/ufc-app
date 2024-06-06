const Fight = require('../models/Fight');

const createFight = async (fightData) => {
    const fight = new Fight(fightData);
    await fight.save();
    return fight;
};

const findAllFights = async () => {
    return await Fight.find().populate('fighters');
};

const findFightById = async (id) => {
    return await Fight.findById(id).populate('fighters');
};

const updateFightById = async (id, updateData) => {
    return await Fight.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteFightById = async (id) => {
    return await Fight.findByIdAndDelete(id);
};


const deleteFightsByFighterId = async (fighterId) => {
    return await Fight.deleteMany({ fighters: fighterId });
};

module.exports = {
    createFight,
    findAllFights,
    findFightById,
    updateFightById,
    deleteFightById,
    deleteFightsByFighterId

};
