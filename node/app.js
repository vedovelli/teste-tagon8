var express = require('express');

var app = module.exports = express();

var cookieParser = require('cookie-parser');

var cookieSession = require('cookie-session');

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
app.use(cookieParser('$rt6&98.'));
app.use(cookieSession({
  secret: '$rt6&98.'
}));
app.use(allowCORS);

app.use(bodyParser.urlencoded({

	extended: true
}));