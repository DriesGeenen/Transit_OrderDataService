'use strict';

var ProductRepository = require('../repositories/productDataRepository');
var Product = require('../models/productData');

exports.getAllProducts = function (req, res) {
    var promise = ProductRepository.getAllProducts();
    promise.then(function (products) {
        return res.json({success: true, data: products});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get products', error: err});
    });
};

exports.addProduct = function (req, res) {
    var newProduct = new Product(req.body);
    var promise = ProductRepository.addProduct(newProduct);
    promise.then(function (product) {
        return res.json({success: true, msg: 'Product created', data: product});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to create product', error: err});
    });
};

exports.updateProduct = function (req, res) {
    var promise = ProductRepository.updateProduct(req.params.id, req.body);
    promise.then(function () {
        return res.json({success: true, msg: 'Product updated'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to update product', error: err});
    });
};

exports.getProductById = function (req, res) {
    var promise = ProductRepository.getProductById(req.params.id);
    promise.then(function (product) {
        return res.json({success: true, data: product});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get product', error: err});
    });
};

exports.deleteProduct = function (req, res) {
    var promise = ProductRepository.deleteProduct(req.params.id);
    promise.then(function () {
        return res.json({success: true, msg: 'Product removed'});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to remove product', error: err});
    });
};

exports.getProductsByProductCodes = function(req, res){
    var productCodes = req.body.products;
    var promise = ProductRepository.getProductsByProductCodes(productCodes);
    promise.then(function (products) {
        return res.json({success: true, data: products});
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get batch products', error: err});
    });
};