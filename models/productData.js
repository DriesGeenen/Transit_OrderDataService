const mongoose = require('mongoose');

const productDataSchema = mongoose.Schema({
    productCode: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: Number // Could be virtual but idk how
});

const ProductData = module.exports = mongoose.model('ProductData', productDataSchema);