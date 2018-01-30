module.exports = {
    secret: process.env.SECRET || 'notpublic',
    database: 'mongodb://localhost:27017/orderData'
};
