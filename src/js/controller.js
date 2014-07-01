App.PostsController = Ember.ArrayController.extend({

	sortProperties: ['post_date'],

  	sortAscending: false,

  	newPostButtonVisible: true,

	searchTerm: '',

	filteredContent: function() {

		var posts = this.get('content');
		var search = this.get('searchTerm').toLowerCase();

		if(search === '') {

			return posts;
		} else {

			return posts.filter(function(post) {
				return 	post.get('title').toLowerCase().indexOf(search) !== -1 ||
						post.get('tags').toLowerCase().indexOf(search) !== -1;
			});
		}
	}.property('content', 'searchTerm'),

	actions: {

		newPost: function() {

			this.set('newPostButtonVisible', false);

			this.transitionToRoute('posts.new');
		}
	}
});

App.PostsNewController = Ember.ObjectController.extend({

	needs: ['posts'],

	actions: {

		cancelFormPost: function() {

			this.get('controllers.posts').set('newPostButtonVisible', true);

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
						self.get('controllers.posts').set('newPostButtonVisible', true);
						self.transitionToRoute('posts');
					}, function() {

						//TODO error handler
					});
			}

		}
	}
});

App.PostController = Ember.ObjectController.extend({

	isEditing: false,

	actions: {

		editPost: function(params) {

			this.set('isEditing', true);
		},

		cancelFormPost: function() {

			this.set('isEditing', false);
		},

		savePost: function() {

			var self = this;

			if(title && body && tags) {

				this.get('model').save().then(function() {

					self.set('isEditing', false);
				}, function(error) {

					//TODO error handler
				});
			}
		},

		removePost: function(params) {

			var self = this;

			if(confirm('Tem certeza que deseja remover o post?')) {

				this.get('model').destroyRecord().then(function(response) {

					//TODO error handling

					self.transitionToRoute('posts');
				}, function() {

					//TODO error handler
				});

			}
		},

		removeComment: function(comment) {

			var self = this;

			if(confirm('Tem certeza que deseja remover o comentário?')) {

				comment.destroyRecord().then(function(response) {

					self.get('model').get('comments').then(function(comments) {

						comments.removeObject(comment);
					}, function() {

						//TODO error handler
					});
				}, function() {

					//TODO error handler
				});

			}
		},

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
			}, function() {

				//TODO error handler
			});
		}
	}
});