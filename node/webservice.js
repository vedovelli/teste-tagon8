var app = require('./app.js');
var db = require('./db.js');
var validator = require('validator');

/*Routes*/
app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('Test Tagon8 - webservice');
});

/*Routes for Account*/
app.get('/account', function(req, res) { //info

});

app.post('/account', function(req, res) { //create

	var fullname = vaidator.escape(req.fullname);
	var email = vaidator.escape(req.email);
	var password = vaidator.escape(req.password);

	if(validator.isEmail(email)) {

		var account = new db.account({
			fullname: fullname,
			email: email,
			password: password
		});

		account.save(function(err, account) {

			if(err) {

				res.json({error: 'Não foi possível salvar a conta'});
			} else {

				res.json({account: account});
			}
		});
	} else {

		// return error handler
	};
});

app.put('/account', function(req, res) { //update

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

/*Routes for Post*/
app.get('/comments', function(req, res) { //comment list

});

app.post('/comment', function(req, res) { //create

});

app.put('/comment', function(req, res) { //update

});

app.delete('/comment', function(req, res) { //delete

});