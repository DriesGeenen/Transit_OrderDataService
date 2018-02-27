'use strict';

const OrderRepository = require('../repositories/orderDataRepository');
const Order = require('../models/orderData');

exports.getAllOrders = function (req, res) {
    const promise = OrderRepository.getAllOrders();
    promise.then(function (orders) {
        filterProductsFromOrders(orders);
        return res.json({success: true, data: orders});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get orders', error: err});
    });
};

exports.addOrder = function (req, res) {
    const newOrder = new Order(req.body);
    const promise = OrderRepository.addOrder(newOrder);
    promise.then(function (order) {
        //filterProductsFromOrder(order);
        return res.json({success: true, msg: 'Order created', data: order});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create order', error: err});
    });
};

exports.updateOrder = function (req, res) {
    const promise = OrderRepository.updateOrder(req.params.id, req.body);
    promise.then(function () {
        return res.json({success: true, msg: 'Order updated'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to update order', error: err});
    });
};

exports.getOrderById = function (req, res) {
    const promise = OrderRepository.getOrderById(req.params.id);
    promise.then(function (order) {
        filterProductsFromOrder(order);
        return res.json({success: true, data: order});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get order', error: err});
    });
};

exports.deleteOrder = function (req, res) {
    const promise = OrderRepository.deleteOrder(req.params.id);
    promise.then(function () {
        return res.json({success: true, msg: 'Order removed'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to remove order', error: err});
    });
};

exports.getOrdersByProductCodeWithAmountArray = function (req, res) {
    // If config is an array of queries
    const productCodesWithAmount = req.body;
    // Array of results
    const orders = [];

    processQueries(productCodesWithAmount);
    function processQueries(productCodesWithAmount) {
        if (productCodesWithAmount.length === 0) {
            // All queries complete
            return res.json({success: true, data: mergeOrdersByMatchingId(orders)});
        }

        const amount = productCodesWithAmount[0].amount;
        const productCode = productCodesWithAmount[0].productCode;

        const promise = OrderRepository.getOrderByProductCodeWithAmount(productCode, amount);
        promise.then(function (order) {
            if(order){
                filterProductsFromOrder(order);
                compareResultAndUpdateArray(productCodesWithAmount, order);
                orders.push(order);
            } else {
                // todo throw some kind of error
                // This happens when products have been requested that cannot be found in the order system
                // Freight will contain products that are not listed on ECMR
                productCodesWithAmount.splice(0,1);
            }

            processQueries(productCodesWithAmount);
        }, function (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                msg: 'Failed to get orders by productcode with amount',
                error: err
            });
        });

    }
};

/*exports.getOrderByProductCodeWithAmount = function (req, res) {
    const productCode = req.params.productcode;
    const amount = req.params.amount;

    const promise = OrderRepository.getOrderByProductCodeWithAmount(productCode, amount);
    promise.then(function (order) {
        filterProductsFromOrder(orders);
        return res.json({success: true, data: order});
    }, function (err) {
        return res.status(500).json({
            success: false,
            msg: 'Failed to get orders by productcode with amount',
            error: err
        });
    });
};*/

const filterProductsFromOrders = function (orders) {
    for (let i = 0; i < orders.length; i++) {
        filterProductsFromOrder(orders[i]);
    }
};

const filterProductsFromOrder = function (order) {
    for (let i = 0; i < order.products.length; i++) {
        order.goods[i].amount = order.products[i].amount;
    }
    order.products = undefined;
};

const compareResultAndUpdateArray = function (productCodesWithAmount, order) {
    for (let i = 0; i < order.goods.length; i++) {
        if (order.goods[i].productCode === productCodesWithAmount[0].productCode) {
            // If amount is the same, element is removed from the search array
            if (order.goods[i].amount === productCodesWithAmount[0].amount) {
                return productCodesWithAmount.splice(0, 1);
            }
            return productCodesWithAmount[0].amount -= order.goods[i].amount;
        }
    }
};

const mergeOrdersByMatchingId = function (orders) {
    const mergedOrders = {};
    for (let i = 0; i < orders.length; i++) {
        if(mergedOrders[orders[i]._id])
            mergedOrders[orders[i]._id].goods = mergedOrders[orders[i]._id].goods.concat(orders[i].goods);
        else mergedOrders[orders[i]._id] = orders[i];
    }
    // Return as array
    return Object.keys(mergedOrders).map(function (key) { return mergedOrders[key]; });
};
