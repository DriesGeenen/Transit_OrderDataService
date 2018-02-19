'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model('ProductData');

exports.getAllProducts = function () {
    return Product.find({}).select();
};

exports.getProductById = function (id) {
    return Product.findById(id).select();
};

exports.addProduct = function (newProduct) {
    return newProduct.save();
};

exports.updateProduct = function (id, product) {
    return Product.update({_id: id}, product);
};

exports.deleteProduct = function (id) {
    return Product.remove({_id: id});
};

exports.getProductsByProductCodes = function(productCodes){
    return Product.find({productCode: productCodes});
};
