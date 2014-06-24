var Account;
var mongoose = require('mongoose').connect('mongodb://127.0.0.1/tagon8');
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

	module.exports.db = db;
	module.exports.account = Account;
});