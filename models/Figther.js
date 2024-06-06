const mongoose = require('mongoose');

const fighterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    division: { type: String, required: true },
    record: { type: String, required: true },
    champion: { type: Boolean, default: false },
    fights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fight' }]
});

module.exports = mongoose.model('Fighter', fighterSchema);
