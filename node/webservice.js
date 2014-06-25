var app = require('./app.js');
var validator = require('validator');
var accountController = require('./controllers/accountController.js');

/*Routes*/
app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('Test Tagon8 - webservice');
});

/*Routes for Account*/
app.get('/account/:id', function(req, res) { //info

	var id = validator.escape(validator.trim(req.param('id')));

	accountController.get(id, function(account){

		res.json(account);
	});
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

	var password = validator.escape(validator.trim(req.param('password')));
	var id = validator.escape(validator.trim(req.param('id')));

	if(password) {

		accountController.update(id, password, function(account){

			res.json(account);
		});
	} else {

		res.json({error: 'Favor informar um e-mail válido'});
	}
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