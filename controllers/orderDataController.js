'use strict';

var OrderRepository = require('../repositories/orderDataRepository');
var Order = require('../models/orderData');

exports.getAllOrders = function (req, res) {
    var promise = OrderRepository.getAllOrders();
    promise.then(function (orders) {
        return res.json({success: true, data: orders});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get orders', error: err});
    });
};

exports.addOrder = function (req, res) {
    var newOrder = new Order(req.body);
    var promise = OrderRepository.addOrder(newOrder);
    promise.then(function (order) {
        return res.json({success: true, msg: 'Order created', data: order});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create order', error: err});
    });
};

exports.updateOrder = function (req, res) {
    var promise = OrderRepository.updateOrder(req.params.id, req.body);
    promise.then(function () {
        return res.json({success: true, msg: 'Order updated'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to update order', error: err});
    });
};

exports.getOrderById = function (req, res) {
    var promise = OrderRepository.getOrderById(req.params.id);
    promise.then(function (order) {
        return res.json({success: true, data: order});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get order', error: err});
    });
};

exports.deleteOrder = function (req, res) {
    var promise = OrderRepository.deleteOrder(req.params.id);
    promise.then(function () {
        return res.json({success: true, msg: 'Order removed'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to remove order', error: err});
    });
};

