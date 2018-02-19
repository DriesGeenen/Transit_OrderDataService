'use strict';

var mongoose = require('mongoose');
var Order = mongoose.model('OrderData');

exports.getAllOrders = function () {
    return Order.find({}).populate('goods');
};

exports.getOrderById = function (id) {
    return Order.findById(id).populate('goods');
};

exports.addOrder = function (newOrder) {
    return newOrder.save();
};

exports.updateOrder = function (id, order) {
    return Order.update({_id: id}, order);
};

exports.deleteOrder = function (id) {
    return Order.remove({_id: id});
};

exports.getOrderByProductCodeWithAmount = function (productCode, amount) {
    // todo uncomment this after testing
    /*return Order
        .findOneAndUpdate(
            {products: {$elemMatch: {productCode: productCode, amount: {$lte: amount}, status: 'ready'}}},
            {$set: {"products.$.status": 'processing'}}, { 'new': true },
            {products: {$elemMatch: {productCode: productCode}}})
        .populate('goods')
        .sort('orderDate');*/

    return Order
        .findOne(
            {products: {$elemMatch: {productCode: productCode, amount: {$lte: amount}, status: 'ready'}}},
            {products: {$elemMatch: {productCode: productCode}}})
        .populate('goods')
        .sort('orderDate');
};