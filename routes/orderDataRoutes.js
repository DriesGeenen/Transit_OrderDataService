'use strict';

module.exports = function (app) {
    var OrderDataController = require('../controllers/orderDataController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/orders')
        .get(OrderDataController.getAllOrders)
        .post(OrderDataController.addOrder);

    app.route('/orders/:id')
        .get(OrderDataController.getOrderById)
        .delete(OrderDataController.deleteOrder)
        .put(OrderDataController.updateOrder);

};