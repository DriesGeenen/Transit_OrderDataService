const mongoose = require('mongoose');

const orderDataSchema = mongoose.Schema({
    email : {
        type: String,
        unique: true,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    postal: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    goods: {
        type: [String],
        required: true
    }
});

const OrderData = module.exports = mongoose.model('OrderData', orderDataSchema);