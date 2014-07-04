Handlebars.registerHelper("log", function(context) {

	return console.log(context);
});


/* Formata a data padrão Javascript para o padrão 'um dia atrás' ou 'alguns segundos atrás'*/
Ember.Handlebars.helper('format-date', function(date){

	moment.lang('pt-BR');
	return new Handlebars.SafeString(moment(date).calendar());
});
