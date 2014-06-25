var db = require('../db.js');

exports.save = function (fullname, email, password, callback) {

	new db.account({

		fullname: fullname,
		email: email,
		password: password
	}).save(function(err, acc) {

		if(err) {

			callback({error: 'Não foi possível salvar a conta'});
		} else {

			callback({account: acc});
		}
	});

}

