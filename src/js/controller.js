App.PostController = Ember.ObjectController.extend({

	actions: {

		saveComment: function() {

			var self = this;
			var postid = this.get('model').get('id');

			var commentObj = {

				'postid': postid,
				fullname: this.get('fullname'),
				email: this.get('email'),
				comment: this.get('comment')
			};

			this.store.createRecord('comment', commentObj)
					  .save()
					  .then(function(comment) {

				if(comment.error) {

					// TODO error handler
				} else {

					self.set('fullname', '');
					self.set('email', '');
					self.set('comment', '');

					self.get('model').get('comments').then(function(comments) {

						comments.pushObject(comment);
					});

					// TODO alertar o usuario do sucesso na insercao do comentario
				}
			});
		}
	}
});