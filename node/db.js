var Account, Post;
var mongoose = require('mongoose').connect('mongodb://127.0.0.1/tagon8');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){

	/*Models*/
	var accountSchema = mongoose.Schema({
		fullname: String,
		email: String,
		password: String
	});

	var postSchema = mongoose.Schema({
		title: String,
		body: String,
		post_date: Date,
		tags: Array,
		comments: Array
	});

	Account = mongoose.model('Account', accountSchema);
	Post = mongoose.model('Post', postSchema);

	exports.db = db;
	exports.account = Account;
	exports.post = Post;
	exports.mongoose = mongoose;
});