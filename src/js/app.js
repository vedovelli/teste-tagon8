window.App = Ember.Application.create();

/* Necessário para que a troca de cookies entre client e server aconteça de forma correta */
$.ajaxSetup({
	crossDomain: true,
	xhrFields: {
		withCredentials: true
	}
});

App.ApplicationSerializer = DS.RESTSerializer.extend({

	/* para atender à nomenclatura para chave primária do MongoDB */
	primaryKey: '_id'
});

DS.RESTAdapter.reopen({

	host: 'http://tagon8.ved:4730'
});
