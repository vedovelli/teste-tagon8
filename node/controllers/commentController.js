var db = require('../db.js');

exports.list = function(postid, callback) {

	db.comment.find({'postid': postid}, function(error, comments) {

		if (error) {
			callback({error: 'Não foi possível listar os comentários'});
		} else {
			callback(comments);
		}
	});
}

exports.get = function(id, callback) {

	db.comment.findById(id, function(error, comment) {

		if (error) {
			callback({error: 'Não foi possível retornar o comentário'});
		} else {
			callback(comment);
		}
	});
}

exports.save = function(postid, fullname, email, comment, callback) {

	new db.comment({

		postid: postid,
		fullname: fullname,
		email: email,
		comment: comment,
		comment_date: new Date()
	}).save(function(err, comment){

		if(err) {
			callback({error: 'Não foi possível salvar o comentário'});
		} else {
			callback(comment);
		}
	});
}

exports.update = function(id, fullname, email, comment, callback) {

	db.comment.findById(id, function(err, cmt) {

		cmt.fullname = fullname;
		cmt.email = email;
		cmt.comment = comment;

		cmt.save(function(err) {

			if(err) {
				callback({error: 'Não foi possível salvar o comentário'});
			} else {
				callback(cmt);
			}
		});
	});
}

exports.delete = function(id, callback) {

	db.comment.findById(id, function(err, comment) {

		comment.remove(function(err) {

			if(err) {
				callback({error: 'Não foi possível remover o comentário'});
			} else {
				callback({success: true});
			}
		});
	});
}

exports.deleteByPostId = function(postid) {

	db.comment.find({postid: postid}, function(err, comments) {

		comments.forEach(function(comment) {

			comment.remove();
		});
	});
}
