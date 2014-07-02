App.Router.map(function() {

	this.resource('posts', function() {

		this.route('new');
	});

	this.resource('account', function() {

		this.route('new');
	});

	this.route('post', {path: '/post/:id'});

	this.route('login');
});

App.IndexRoute = Ember.Route.extend({

	/* não há rota /#/ */
	beforeModel: function() {

		this.transitionTo('posts');
	}
});

App.PostsRoute = Ember.Route.extend({

	activate: function() {

		/* reseta a interface para seu estado inicial sempre que a rota for acessada */
		this.controllerFor('posts').send('resetUI');
	},

	model: function() {

		return this.store.find('post');
	}
});

App.PostsNewRoute = Ember.Route.extend({

	activate: function() {

		this.controllerFor('posts').set('newPostButtonVisible', false);

		/* se a rota /#/posts/new for acessada diretamente, verifica se o usuário está logado*/
		if(!this.controllerFor('login').get('isLoggedIn')) {

			/* redirecionada para login caso não esteja logado  */
			this.transitionTo('login');
		}
	}
});

App.PostRoute = Ember.Route.extend({

	model: function(params) {

		return this.store.find('post', params.id);
	}
});

App.LoginRoute = Ember.Route.extend({

	activate: function() {

		this.controllerFor('login').set('hideLoginButton', true);
	},

	deactivate: function() {

		this.controllerFor('login').set('hideLoginButton', false);
	}
});