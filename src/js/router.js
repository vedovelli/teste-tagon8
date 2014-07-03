App.Router.map(function() {

	this.resource('posts', function() {

		this.route('new');
	});

	this.route('account');

	this.route('account.new', {path: '/account/new'});

	this.route('post', {path: '/post/:id'});

	this.route('login');
});

App.IndexRoute = Ember.Route.extend({

	/* Redireciona para a lista de posts pois não há conteúdo para a rota index */
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

		/* esconde o botão de novo post pois não faz sentido mante-lo quando ja estamos no form de criação de novo post*/
		this.controllerFor('posts').set('newPostButtonVisible', false);

		/* se a rota /#/posts/new for acessada diretamente, verifica se o usuário está logado*/
		if(!this.controllerFor('login').get('isLoggedIn')) {

			/* redirecionada para login caso não esteja logado  */
			this.transitionTo('login');
		}
	}
});

App.AccountRoute = Ember.Route.extend({

	activate: function() {

		/* se a rota /account for acessada diretamente, verifica se o usuário está logado*/
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

	/* esconde o botão de novo post pois não faz sentido mante-lo quando ja estamos no form de login*/
	activate: function() {

		this.controllerFor('login').set('hideLoginButton', true);
	},

	/* mostra o botão de login ao sair da tela de login */
	deactivate: function() {

		this.controllerFor('login').set('hideLoginButton', false);
	}
});