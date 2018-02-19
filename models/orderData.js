const mongoose = require('mongoose');
const Contact = require('./contact');

const orderDataSchema = mongoose.Schema({
    sender: Contact,
    receiver: Contact,
    products: [{
        amount: Number,
        productCode: String,
        status:{
            type: String,
            enum: ['ready', 'processing', 'done'],
            default: 'ready',
            required: true
        }
    }],
    orderDate:{
        type: Date,
        default: new Date()
    }

}, { toJSON: { virtuals: true } });

orderDataSchema.virtual('goods', {
    ref: 'ProductData', // The model to use
    localField: 'products.productCode', // Find people where `localField`
    foreignField: 'productCode', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
});


const OrderData = module.exports = mongoose.model('OrderData', orderDataSchema);