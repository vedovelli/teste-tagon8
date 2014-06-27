window.App = Ember.Application.create();

App.ApplicationSerializer = DS.RESTSerializer.extend({
	primaryKey: '_id'
});

DS.RESTAdapter.reopen({
	host: 'http://tagon8.ved:4730'
});