'use strict';

module.exports = function (app) {
    var ProductDataController = require('../controllers/productDataController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/products')
        .get(ProductDataController.getAllProducts)
        .post(ProductDataController.addProduct);

    app.route('/products/:id')
        .get(ProductDataController.getProductById)
        .delete(ProductDataController.deleteProduct)
        .put(ProductDataController.updateProduct);

    app.route('/products/batch')
        .post(ProductDataController.getProductsByProductCodes);
};