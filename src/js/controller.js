App.PostsController = Ember.ArrayController.extend({

	sortProperties: ['post_date'],

  	sortAscending: false,

	needForm: false,

	post: function() {

	},

	actions: {

		newPost: function() {

			this.set('needForm', true);
		},

		cancelNewPost: function() {

			this.set('needForm', false);
		},

		savePost: function() {

			var self = this;

			var postObject = {
				title: this.get('title'),
				body: this.get('body'),
				tags: this.get('tags')
			};

			this.store.
				createRecord('post', postObject)
				.save()
				.then(function(response) {

					// TODO error handler

					self.get('model').pushObject(response);
					self.set('title', '');
					self.set('body', '');
					self.set('tags', '');
					self.set('needForm', false);
				});

		}
	}
});

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