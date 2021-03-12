const mongoose = require('mongoose');

const data = new mongoose.Schema({
    id: Number,
    key: String,
    value: String
})

module.exports = mongoose.model('data', data);

