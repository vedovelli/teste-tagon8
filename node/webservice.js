var app = require('./app.js');
var Account;
var mongoose = require('mongoose').connect('mongodb://127.0.0.1/toro');
var db = mongoose.connection;

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

/*Routes*/

app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('Test Tagon8 - webservice');
});

/*Routes for Account*/
app.get('/account', function(req, res) { //info
	res.json({name: 'vedovelli'});
});

app.post('/account', function(req, res) { //create
	res.json({output: 'post account called. Param detected: ' + req.param('name')});
});

app.put('/account', function(req, res) { //update
	res.json({output: 'put account called. Param detected: ' + req.param('name')});
});

/*Routes for Post*/
app.get('/posts', function(req, res) { //post list

});

app.get('/post', function(req, res) { //post content

});

app.post('/post', function(req, res) { //create

});

app.put('/post', function(req, res) { //update

});

app.delete('/post', function(req, res) { //delete

});