const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const app = express();
var router = express.Router();
const Order = require('./models/orderData');
const Products = require('./models/productData');
const orderDataRoutes = require('./routes/orderDataRoutes');
const productDataRoutes = require('./routes/productDataRoutes');
const jsonwebtoken = require("jsonwebtoken");
const cors = require('cors');

//Port number
const port = process.env.PORT || 6602;

mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
    console.log('Connected to database' + config.database);
});

mongoose.connection.on('error', function (err) {
    console.log('Database error: ' + err);
});

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secret, function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

orderDataRoutes(app);
productDataRoutes(app);

//index route
router.get('/', function (req, res) {
    res.json({message: 'Invalid Endpoint'});
});

//start server
app.listen(port, function () {
    console.log('Server started on port ' + port);
});



