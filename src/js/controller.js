App.PostsController = Ember.ArrayController.extend({

	sortProperties: ['post_date'],

  	sortAscending: false,

	actions: {

		newPost: function() {

			this.transitionToRoute('posts.new');
		}

	}
});

App.PostsNewController = Ember.ObjectController.extend({

	needs: ['posts'],

	actions: {

		cancelNewPost: function() {

			this.transitionToRoute('posts');
		},

		savePost: function() {

			var
				title = this.get('title'),
				body = this.get('body'),
				tags = this.get('tags'),
				self = this;

			if(title && body && tags) {

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
						// BUG pushObject adicionando duas vezes
						self.get('controllers.posts').get('model').pushObject(response);
						self.set('title', '');
						self.set('body', '');
						self.set('tags', '');
						self.transitionToRoute('posts');
					});
			} else {

				alert('Todos os campos são de preenchimento obrigatório');
			}

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