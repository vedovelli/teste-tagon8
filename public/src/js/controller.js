App.ApplicationController = Ember.ObjectController.extend({

	/* adiciona como dependencia o LoginController */
	needs: ['login'],

	actions: {

		doLogout: function() {

			/* dispara ação de logou no LoginController */
			this.get('controllers.login').send('loginActions', 'logout');
		},

		goLogin: function() {

			this.transitionToRoute('login');
		},

		showAccount: function() {

			/* verifica se o usuário está logado antes de mostrar a tela de visualização da conta */
			if(this.get('controllers.login.isLoggedIn')) {

				this.transitionToRoute('account');
			} else {

				this.transitionToRoute('login');
			}
		}
	}
});

App.AccountController = Ember.ObjectController.extend({

	/* Adiciona como dependência o LoginController */
	needs: ['login'],

	password1: '',

	password2: '',

	actions: {

		changePassword: function() {

			var p1 = this.get('password1');
			var p2 = this.get('password2');
			var self = this;

			if(p1 !== p2) {

				alert('Senhas não são iguais');
			} else {

				this.store.find('account', this.get('controllers.login.loggedUser._id')).then(function(account) {

					account.set('password', p1).save().then(function(response) {

						if(response.get('errorMsg')) {
							alert(response.get('errorMsg'));
							return false;
						}

						self.set('password1', '');
						self.set('password2', '');
						alert('Senha alterada com sucesso');
					});
				});
			}
		}
	}
});

App.AccountNewController = Ember.ObjectController.extend({

	/* Adiciona como dependência o LoginController */
	needs: ['login'],

	fullname: '',

	email: '',

	password: '',

	actions: {

		resetUI: function() {

			this.set('fullname', '');
			this.set('email', '');
			this.set('password', '');
		},

		accountCreate: function() {

			var
				fullname = this.get('fullname'),
				email = this.get('email'),
				password = this.get('password'),
				self = this;

			if(fullname && email && password) {

				this.store
					.createRecord('account', {
						'fullname': fullname,
						'email': email,
						'password': password
					})
					.save()
					.then(function(response) {

						if(response.get('errorMsg')) {
							alert(response.get('errorMsg'));
							return false;
						}

						alert('Conta criada com sucesso');
						self.get('controllers.login').set('email', email);
						self.send('resetUI');
						self.transitionToRoute('login');
					}, function() {

						alert('Problema ao criar a conta. Tente novamente');
					});
			}

		},

		cancel: function() {

			this.send('resetUI');
			this.transitionToRoute('login');
		}
	}
});

App.LoginController = Ember.ObjectController.extend({

	/* Adiciona PostsController e PostController como dependências */
	needs: ['posts', 'post'],

	isLoggedIn: false,

	loggedUser: {},

	hideLoginButton: false,

	email: 'vedovelli@gmail.com',

	password: '123',

	actions: {

		resetUI: function() {

			this.set('email', '');
			this.set('password', '');
		},


		createAccount: function() {

			this.transitionToRoute('account.new');
		},

		loginActions: function(action) {

			var url;
			var doReset;
			var userStateAfterAction;
			var adapter = DS.RESTAdapter.create();
			var self = this;

			if(action == 'login') {

				/* adapter.host pega a URL do webservice, definida em /src/js/app.js */
				url = adapter.host + '/login/' + this.get('email') +'/'+ this.get('password');
				userStateAfterAction = true;
				doReset = function() {};
			} else {
				url = adapter.host + '/logout';
				userStateAfterAction = false;
				doReset = function() {
					self.get('controllers.posts').send('resetUI');
					self.get('controllers.post').send('resetUI');
					self.send('resetUI');
				};
			}

			Ember.$.getJSON(url, function(data) {

				if(data.account.errorMsg) {

					alert(data.account.errorMsg);
				} else {
					doReset();
					self.set('loggedUser', data.account);
					self.set('isLoggedIn', userStateAfterAction);
					self.transitionToRoute('posts');
				}
			});
		},
	}
});

App.PostsController = Ember.ArrayController.extend({

	/* Adiciona o LoginController como dependência */
	needs: ['login'],

	sortProperties: ['post_date'],

  	sortAscending: false,

  	newPostButtonVisible: true,

	searchTerm: '',

	postList: function() {

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

		resetUI: function() {

			this.set('newPostButtonVisible', true);
		},

		newPost: function() {

			if(this.get('controllers.login.isLoggedIn')) {

				this.set('newPostButtonVisible', false);
				this.transitionToRoute('posts.new');
			} else {

				this.transitionToRoute('login');
			}
		}
	}
});

App.PostsNewController = Ember.ObjectController.extend({

	/* Adiciona como dependências PostsController e LoginController */
	needs: ['posts', 'login'],

	actions: {

		resetUI: function() {

			this.set('title', '');
			this.set('body', '');
			this.set('tags', '');
			this.get('controllers.posts').set('newPostButtonVisible', true);
		},

		cancelFormPost: function() {

			this.get('controllers.posts').send('resetUI');

			this.transitionToRoute('posts');
		},

		savePost: function() {

			/* verifica se o usuário está logado */
			if(this.get('controllers.login.isLoggedIn')) {

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

							if(response.get('errorMsg')) {
								alert(response.get('errorMsg'));
								return false;
							}

							// BUG pushObject acionado duas vezes
							self.get('controllers.posts').get('model').pushObject(response);
							self.send('resetUI');
							self.transitionToRoute('posts');
						}, function(error) {

							alert(error.responseJSON.error);
						});
				}
			} else {

				this.transitionToRoute('login');
			}

		}
	}
});

App.PostController = Ember.ObjectController.extend({

	/* Adiciona como dependência LoginController */
	needs: ['login'],

	isEditing: false,

	fullname: '',

	email: '',

	comment: '',

	actions: {

		resetUI: function() {

			this.set('isEditing', false);
			this.set('fullname', '');
			this.set('email', '');
			this.set('comment', '');
		},

		editPost: function(params) {

			/* Verifica se o usuário está logado */
			if(this.get('controllers.login.isLoggedIn')) {

				this.set('isEditing', true);
			} else {

				this.transitionToRoute('login');
			}

		},

		cancelFormPost: function() {

			this.send('resetUI');
		},

		savePost: function() {

			/* Verifica se o usuário está logado */
			if(this.get('controllers.login.isLoggedIn')) {

				var self = this;

				this.get('model').save().then(function(response) {

					if(response.get('errorMsg')) {
						alert(response.get('errorMsg'));
						return false;
					}

					self.send('resetUI');
				});
			} else {

				this.transitionToRoute('login');
			}

		},

		removePost: function(params) {

			/* Verifica se o usuário está logado */
			if(this.get('controllers.login.isLoggedIn')) {

				var self = this;

				if(confirm('Tem certeza que deseja remover o post?')) {

					this.get('model').destroyRecord().then(function(response) {

						if(response.get('errorMsg')) {
							alert(response.get('errorMsg'));
							return false;
						}

						self.transitionToRoute('posts');
					});

				}
			} else {

				this.transitionToRoute('login');
			}

		},

		removeComment: function(comment) {

			var self = this;

			if(confirm('Tem certeza que deseja remover o comentário?')) {

				comment.destroyRecord().then(function(response) {

					if(response.get('errorMsg')) {
						alert(response.get('errorMsg'));
						return false;
					}

					self.get('model').get('comments').then(function(comments) {

						comments.removeObject(comment);
					});
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

				if(comment.get('errorMsg')) {
					alert(comment.get('errorMsg'));
					return false;
				}

				self.send('resetUI');

				self.get('model').get('comments').then(function(comments) {

					comments.pushObject(comment);

					/* fullname vive no escopo da action e é uma referência ao ID do campo do formulário */
					Ember.$(fullname).focus();
				});
			});
		}
	}
});