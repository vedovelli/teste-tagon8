var app = require('./app.js');
var validator = require('validator');
var accountController = require('./controllers/accountController.js');

/*Routes*/
app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('Test Tagon8 - webservice');
});

/*Routes for Account*/
app.get('/account', function(req, res) { //info

	res.json({ved:true});
});

app.post('/account', function(req, res) { //create

	var fullname = validator.escape(validator.trim(req.param('fullname')));
	var email = validator.escape(validator.trim(req.param('email')));
	var password = validator.escape(validator.trim(req.param('password')));

	if(validator.isEmail(email)) {

		accountController.save(fullname, email, password, function(account){

			res.json(account);
		});
	} else {

		res.json({error: 'Favor informar um e-mail válido'});
	}
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