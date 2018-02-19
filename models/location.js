const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    address: String,
    postal: String,
    city: String
});
