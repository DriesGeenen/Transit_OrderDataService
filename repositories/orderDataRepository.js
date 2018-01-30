'use strict';

var mongoose = require('mongoose');
var Order = mongoose.model('OrderData');

exports.getAllOrders = function () {
    return Order.find({}).select();
};

exports.getOrderById = function (id) {
    return Order.findById(id).select();
};

exports.getOrderByEmail = function (email) {
    return Order.findOne({email: email});
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
