var app = require('./app.js');
var db = require('./db.js');
var validator = require('validator');
var accountController = require('./controllers/accountController.js');
var postController = require('./controllers/postController.js');
var _ = require('underscore');


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
	}
});

/*Routes for Post*/
app.get('/posts', function(req, res) { //post list

	postController.list(function(posts) {

		res.json(posts);
	});
});

app.get('/post/:id', function(req, res) { //post content

	var id = validator.escape(validator.trim(req.param('id')));

	postController.get(id, function(post){

		res.json(post);
	});
});

app.post('/post', function(req, res) { //create

	var title = validator.escape(validator.trim(req.param('title')));
	var body = validator.escape(validator.trim(req.param('body')));

	var tags = validator.escape(validator.trim(req.param('tags')));
	tags = tags.replace(new RegExp(' ', 'g'), ''); // remove spaces between tags
	var tagsArray = tags.split(',');

	postController.save(title, body, tagsArray, function(post){

		res.json(post);
	});
});

app.put('/post', function(req, res) { //update

	var id = validator.escape(validator.trim(req.param('id')));
	var title = validator.escape(validator.trim(req.param('title')));
	var body = validator.escape(validator.trim(req.param('body')));

	var tags = validator.escape(validator.trim(req.param('tags')));
	tags = tags.replace(new RegExp(' ', 'g'), ''); // remove spaces between tags
	var tagsArray = tags.split(',');

	postController.update(id, title, body, tagsArray, function(post){

		res.json(post);
	});

});

app.delete('/post', function(req, res) { //delete

	var id = validator.escape(validator.trim(req.param('id')));
	postController.delete(id, function(post){

		res.json(post);
	});
});

/*Routes for Comments*/
app.post('/comment', function(req, res) { //create

	var ObjectId = db.mongoose.Types.ObjectId;
	var postid = validator.escape(validator.trim(req.param('postid')));
	var fullname = validator.escape(validator.trim(req.param('fullname')));
	var email = validator.escape(validator.trim(req.param('email')));
	var comment = validator.escape(validator.trim(req.param('comment')));
	var commentid = new ObjectId;

	db.post.findById(postid, function(err, post) {

		post.comments.unshift({
			id: commentid,
			fullname: fullname,
			email: email,
			comment: comment
		});

		post.save(function(err) {

			if(err) {
				res.json({error: 'Não foi possível salvar o comentário'});
			} else {
				res.json(post);
			}
		});
	});
});

app.put('/comment', function(req, res) { //create

	var postid = validator.escape(validator.trim(req.param('postid')));
	var commentid = validator.escape(validator.trim(req.param('commentid')));
	var fullname = validator.escape(validator.trim(req.param('fullname')));
	var email = validator.escape(validator.trim(req.param('email')));
	var comment = validator.escape(validator.trim(req.param('comment')));

	db.post.findById(postid, function(err, post) {

		var comment = _.filter(post.comments, function(item) {

			return item.id == commentid;
		})[0]; // _.filter returns an array

		res.json(comment);

		// post.comments = filtered;

		// post.save(function(err) {

		// 	if(err) {
		// 		res.json({error: 'Não foi possível remover o comentário'});
		// 	} else {
		// 		res.json(post);
		// 	}
		// });
	});
});

app.delete('/comment', function(req, res) { //delete

	var postid = validator.escape(validator.trim(req.param('postid')));
	var commentid = validator.escape(validator.trim(req.param('commentid')));

	db.post.findById(postid, function(err, post) {

		var filtered = _.filter(post.comments, function(item) {

			return item.id != commentid;
		});

		post.comments = filtered;

		post.save(function(err) {

			if(err) {
				res.json({error: 'Não foi possível remover o comentário'});
			} else {
				res.json(post);
			}
		});
	});

});