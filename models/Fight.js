const mongoose = require('mongoose');

const fightSchema = new mongoose.Schema({
    card: { type: Number, required: true },
    rounds: { type: Number, required: true },
    outcome: { type: String, required: true },
    fighters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fighter' }]
});

module.exports = mongoose.model('Fight', fightSchema);
