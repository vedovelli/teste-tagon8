App.Router.map(function() {

	this.route('posts');
});

App.PostsRoute = Ember.Route.extend({

	model: function() {

		return this.store.find('post');
	}
});