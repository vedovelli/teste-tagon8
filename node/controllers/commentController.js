var db = require('../db.js');

exports.list = function(postid, callback) {

	db.comment.find({'postid': postid}, function(error, comments) {

		if (error) {
			callback({'comment': {error: 'Não foi possível listar os comentários'}});
		} else {
			callback({'comments': comments, meta: {total: comments.length}});
		}
	});
}

exports.get = function(id, callback) {

	db.comment.findById(id, function(error, comment) {

		if (error) {
			callback({'comment': {error: 'Não foi possível retornar o comentário'}});
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
			callback({'comment':{error: 'Não foi possível salvar o comentário'}});
		} else {
			callback({'comment': comment});
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
				callback({'comment': {error: 'Não foi possível salvar o comentário'}});
			} else {
				callback({'comment': cmt});
			}
		});
	});
}

exports.delete = function(id, callback) {

	db.comment.findById(id, function(err, comment) {

		comment.remove(function(err) {

			if(err) {
				callback({'comment': {errorMsg: 'Não foi possível remover o comentário'}});
			} else {
				callback({'comment': comment});
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
