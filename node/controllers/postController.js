var db = require('../db.js');

exports.list = function(callback) {

	db.post.find({}, function(err, psts) {

		if (err) {

			callback({error: 'Não foi possível localizar posts'});
		} else {

			callback({posts: psts});
		}
	});
}

exports.get = function(id, callback) {

	db.post.findById(id, function (err, pst) {

		if (err) {

			callback({error: 'Não foi possível localizar o post'});
		} else {

			callback({post: pst});
		}
	});
}

exports.delete = function(id, callback) {

	db.post.findById(id, function (err, pst) {

		if (err) {

			callback({error: 'Não foi possível localizar o post'});
		} else {

			pst.remove(function(err) {
				if(err) {

					callback(err);
				} else {

					callback({result: 'Post removido com sucesso!'});
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

			callback({error: 'Não foi possível salvar o post'});
		} else {

			callback({post: pst});
		}
	});

}

exports.update = function(id, title, body, tags, callback) {

	db.post.findById(id, function (err, post) {

		if (err) {

			callback({error: 'Não foi possível localizar o post'});
		}

		post.title = title;
		post.body = body;
		post.tags = tags;

		post.save(function (err, pst) {

			if(err) {

				callback({error: 'Não foi possível atualizar o post'});
			} else {

				callback({post: pst});
			}
		});
	});
}