var express = require('express');
var app = express();
var Account;
var mongoose = require('mongoose').connect('mongodb://127.0.0.1/toro');
var db = mongoose.connection;

app.listen(4730);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){

	/*Models*/
	var accountSchema = mongoose.Schema({
	    fullname: String,
	    username: String,
	    password: String
	});

	Account = mongoose.model('Account', accountSchema);
});

/*Main route*/
app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('Test Tagon8 - webservice');
});
