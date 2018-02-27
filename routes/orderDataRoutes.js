'use strict';

module.exports = function (app) {
    const OrderDataController = require('../controllers/orderDataController');
    const AuthHelper = require('../helpers/authHelper');

    app.route('/orders')
        .get(OrderDataController.getAllOrders)
        .post(OrderDataController.addOrder);

    app.route('/orders/:id')
        .get(OrderDataController.getOrderById)
        .delete(OrderDataController.deleteOrder)
        .put(OrderDataController.updateOrder);

    /*app.route('/orders/:productcode/:amount')
        .get(OrderDataController.getOrderByProductCodeWithAmount);*/

    // todo add rfidtoecmrRequired after testing
    app.route('/orders/byarray')
        .post(OrderDataController.getOrdersByProductCodeWithAmountArray);
};