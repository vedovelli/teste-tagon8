var express = require('express');

var app = module.exports = express();

var session = require('express-session');

var bodyParser = require('body-parser');

var allowCORS = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

/*app setup and startup*/
app.listen(4730);

app.use(bodyParser.json());

app.use(allowCORS);

app.use(session({secret: 'vedovelli'}));

app.use(bodyParser.urlencoded({

	extended: true
}));