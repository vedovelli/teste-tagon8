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

	model: function() {

		return this.store.find('post');
	}
});

App.PostRoute = Ember.Route.extend({

	model: function(params) {

		return this.store.find('post', params.id);
	}
});