App.Router.map(function() {

	this.resource('posts', function() {

		this.route('new');
	});

	this.route('post', {path: '/post/:id'});

	this.route('login');
});

App.IndexRoute = Ember.Route.extend({

	beforeModel: function() {

		this.transitionTo('posts');
	}
});

App.PostsRoute = Ember.Route.extend({

	activate: function() {

		this.controllerFor('posts').send('resetUI');
	},

	model: function() {

		return this.store.find('post');
	}
});

App.PostsNewRoute = Ember.Route.extend({

	activate: function() {

		this.controllerFor('posts').set('newPostButtonVisible', false);

		if(!this.controllerFor('login').get('isLoggedIn')) {
			this.transitionTo('login');
		}
	}
});

App.PostRoute = Ember.Route.extend({

	model: function(params) {

		return this.store.find('post', params.id);
	}
});