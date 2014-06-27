window.App = Ember.Application.create();

DS.RESTAdapter.reopen({
	host: 'http://tagon8.ved:4730'
});