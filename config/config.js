module.exports = {
    secret: process.env.SECRET || 'notpublic',
    database: process.env.DATABASE || 'mongodb://localhost:27017/orderData'
};
