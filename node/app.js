var express = require('express');

var app = module.exports = express();

var cookieParser = require('cookie-parser');

var cookieSession = require('cookie-session');

var bodyParser = require('body-parser');

/*app setup and startup*/
app.listen(4730);

app.use(bodyParser.json());
app.use(cookieParser('$rt6&98.'));
app.use(cookieSession({
  secret: '$rt6&98.'
}));

app.use(bodyParser.urlencoded({

	extended: true
}));

/*CORS*/
app.all('*', function(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});