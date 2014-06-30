App.Router.map(function() {

	this.route('posts');
	this.route('post', {path: '/post/:id'});
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