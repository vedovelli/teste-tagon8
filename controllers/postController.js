var db = require('../db.js');

exports.list = function(callback) {

	db.post.find({}).sort('-post_date').exec(function(err, psts) {

		if (err) {

			callback({post: {errorMsg: 'Não foi possível localizar posts'}});
		} else {

			callback({posts: psts, meta: {total: psts.length}});
		}
	});
}

exports.get = function(id, callback) {

	db.post.findById(id, function (err, pst) {

		if (err) {

			callback({post: {errorMsg: 'Não foi possível localizar o post'}});
		} else {

			callback({post: pst});
		}
	});
}

exports.delete = function(id, callback) {

	db.post.findById(id, function (err, pst) {

		if (err) {

			callback({post: {errorMsg: 'Não foi possível localizar o post'}});
		} else {

			pst.remove(function(err) {
				if(err) {

					callback({post: {errorMsg: 'Não foi possível remover o post'}});
				} else {

					callback({post: pst});
				}
			});
		}
	});
}

exports.save = function (title, body, tags, callback) {

	new db.post({

		title: title,
		body: body,
		tags: tags,
		post_date: new Date()
	}).save(function(err, pst) {

		if(err) {

			callback({post: {errorMsg: 'Não foi possível salvar o post'}});
		} else {

			callback({post: pst});
		}
	});

}

exports.update = function(id, title, body, tags, callback) {

	db.post.findById(id, function (err, post) {

		if (err) {

			callback({post: {errorMsg: 'Não foi possível localizar o post'}});
		}

		post.title = title;
		post.body = body;
		post.tags = tags;
		post.post_date = new Date();

		post.save(function (err, pst) {

			if(err) {

				callback({post: {errorMsg: 'Não foi possível atualizar o post'}});
			} else {

				callback({post: pst});
			}
		});
	});
}