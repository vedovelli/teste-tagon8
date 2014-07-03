/*
26/06/2014 14:50:34
v.1.0
*/

var app = require('./app.js'); // Inicia a aplicação e seta os middlewares
var db = require('./db.js'); // Configuração de banco de dados e schemas
var validator = require('validator'); // provê segurança para dados enviados pela interface, normalização e validação de dados
var accountController = require('./controllers/accountController.js');
var postController = require('./controllers/postController.js');
var commentController = require('./controllers/commentController.js');


/*Routes*/
app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('Test Tagon8 - webservice');
});

/*Routes for Login*/
app.get('/login/:email/:password', function(req, res) {

	var email = validator.escape(validator.trim(req.param('email')));
	var password = validator.escape(validator.trim(req.param('password')));

	accountController.login(email, password, req, function(account) {

		res.json(account);
	});
});

app.get('/logout', function(req, res) {

	req.session = null;
	res.json({account: {result: true}});
});

/*Routes for Account*/
app.get('/accounts/:id', function(req, res) { //info

	var id = validator.escape(validator.trim(req.param('id')));

	accountController.get(id, function(account){

		res.json(account);
	});
});

app.post('/accounts', function(req, res) { //create

	var account = req.param('account');

	var fullname = validator.escape(validator.trim(account.fullname));
	var email = validator.escape(validator.trim(account.email));
	var password = validator.escape(validator.trim(account.password));

	if(validator.isEmail(email)) {

		accountController.save(fullname, email, password, function(account){

			res.json(account);
		});
	} else {

		res.json({account: {errorMsg: 'Favor informar um e-mail válido'}});
	}
});

app.put('/accounts/:id', function(req, res) { //update

	var account = req.param('account');

	var password = validator.escape(validator.trim(account.password)); // Apenas troca de senha é permitida
	var id = validator.escape(validator.trim(req.params.id));

	if(password) {

		accountController.update(id, password, function(account){

			res.json(account);
		});
	}
});

/*Routes for Post*/
app.get('/posts', function(req, res) { //post list

	postController.list(function(posts) {

		res.json(posts);
	});
});

app.get('/posts/:id', function(req, res) { //post content

	var id = validator.escape(validator.trim(req.param('id')));

	postController.get(id, function(post){

		res.json(post);
	});
});

app.post('/posts', function(req, res) { //create

	if(!req.session.user) {

		res.send(401, { error: 'Necessário estar autenticado' });
		return false;
	}

	var post = req.param('post');

	var title = validator.escape(validator.trim(post.title));
	var body = validator.escape(validator.trim(post.body));

	var tags = validator.escape(validator.trim(post.tags));
	tags = tags.replace(new RegExp(' ', 'g'), ''); // remove spaces between tags
	var tagsArray = tags.split(',');

	postController.save(title, body, tagsArray, function(post){

		res.json(post);
	});
});

app.put('/posts/:id', function(req, res) { //update

	if(!req.session.user) {

		res.send(401, { error: 'Necessário estar autenticado' });
		return false;
	}

	var post = req.param('post');

	var id = validator.escape(validator.trim(req.params.id));
	var title = validator.escape(validator.trim(post.title));
	var body = validator.escape(validator.trim(post.body));

	var tags = validator.escape(validator.trim(post.tags));
	tags = tags.replace(new RegExp(' ', 'g'), ''); // remove spaces between tags
	var tagsArray = tags.split(',');

	postController.update(id, title, body, tagsArray, function(post){

		res.json(post);
	});
});

app.delete('/posts/:id', function(req, res) { //delete

	if(!req.session.user) {

		res.send(401, { error: 'Necessário estar autenticado' });
		return false;
	}

	var id = validator.escape(validator.trim(req.param('id')));

	commentController.deleteByPostId(id);

	postController.delete(id, function(post){

		res.json(post);
	});
});

/*Routes for Comments*/
app.get('/comments/:postid', function(req, res) {

	var postid = validator.escape(validator.trim(req.param('postid')));

	commentController.list(postid, function(comments) {

		res.json(comments);
	});
});

app.get('/comments/:id', function(req, res) {

	var id = validator.escape(validator.trim(req.param('id')));

	commentController.get(id, function(comment) {

		res.json(comment);
	});

});

app.post('/comments', function(req, res) { //create

	var comment = req.param('comment');

	var postid = validator.escape(validator.trim(comment.postid));
	var fullname = validator.escape(validator.trim(comment.fullname));
	var email = validator.escape(validator.trim(comment.email));
	var comment = validator.escape(validator.trim(comment.comment));

	if(validator.isEmail(email)) {

		commentController.save(postid, fullname, email, comment, function(comment) {

			res.json(comment);
		});
	} else {

		res.json({'comment': {errorMsg: 'Favor informar um e-mail válido'}});
	}
});

app.put('/comments', function(req, res) { //update

	var id = validator.escape(validator.trim(req.param('id')));
	var fullname = validator.escape(validator.trim(req.param('fullname')));
	var email = validator.escape(validator.trim(req.param('email')));
	var comment = validator.escape(validator.trim(req.param('comment')));

	if(validator.isEmail(email)) {

		commentController.update(id, fullname, email, comment, function(comment) {

			res.json(comment);
		});
	} else {

		res.json({'comment': {errorMsg: 'Favor informar um e-mail válido'}});
	}
});

app.delete('/comments/:id', function(req, res) { //delete

	var id = validator.escape(validator.trim(req.params.id));

	commentController.delete(id, function(feedback) {

		res.json(feedback);
	});
});