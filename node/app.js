var express = require('express');

var app = module.exports = express();

var bodyParser = require('body-parser');

/*app setup and startup*/
app.listen(4730);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({

	extended: true
}));