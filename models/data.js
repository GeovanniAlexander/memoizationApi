const mongoose = require('mongoose');

const data = new mongoose.Schema({
    id: Number,
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: String
})

module.exports = mongoose.model('data', data);