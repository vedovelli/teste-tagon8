var db = require('../db.js');

exports.login = function(email, password, req, callback) {

	db.account.findOne({'email': email}, function(err, account) {

		if(err) {

			callback({account: {errorMsg: 'Problema ao localizar a conta'}});
		} else if(!account) {

			callback({account: {errorMsg: 'Conta não encontrada'}});
		} else {

			if(account.password == password) {
				req.session.user = account;
				callback({'account': account});
			} else {

				callback({account: {errorMsg: 'Senha não confere'}});
			}
		}
	});
}

exports.get = function(id, callback) {

	db.account.findById(id, function (err, acc) {

		if (err) {

			callback({account: {errorMsg: 'Não foi possível localizar a conta'}});
		} else {

			callback({account: acc});
		}
	});
}

exports.save = function (fullname, email, password, callback) {

	new db.account({

		fullname: fullname,
		email: email,
		password: password,
		created: new Date()
	}).save(function(err, acc) {

		if(err) {

			callback({account: {errorMsg: 'Não foi possível salvar a conta'}});
		} else {

			callback({account: acc});
		}
	});

}

exports.update = function(id, password, callback) {

	db.account.findById(id, function (err, account) {

		if (err) {

			callback({account: {errorMsg: 'Não foi possível localizar a conta'}});
		}

		account.password = password;

		account.save(function (err, acc) {

			if(err) {

				callback({account: {errorMsg: 'Não foi possível atualizar a conta'}});
			} else {

				callback({account: acc});
			}
		});
	});
}