var Account, Post, Comment;
var mongoose = require('mongoose').connect('mongodb://127.0.0.1/tagon8');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){

	/*Schemas*/
	var accountSchema = mongoose.Schema({
		fullname: String,
		email: String,
		password: String,
		created: Date
	});

	var postSchema = mongoose.Schema({
		title: String,
		body: String,
		post_date: Date,
		tags: Array
	}, {
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	});

	var commentSchema = mongoose.Schema({
		postid: String,
		fullname: String,
		email: String,
		comment: String,
		comment_date: Date
	});

	/*Virtuals*/
	postSchema.virtual('links').get(function () {
		return {'comments': '/comments/' + this._id};
	});

	/*Models*/
	Account = mongoose.model('Account', accountSchema);
	Post = mongoose.model('Post', postSchema);
	Comment = mongoose.model('Comment', commentSchema);

	exports.db = db;
	exports.account = Account;
	exports.post = Post;
	exports.comment = Comment;
	exports.mongoose = mongoose;
});