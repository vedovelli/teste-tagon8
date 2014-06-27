Handlebars.registerHelper("log", function(context) {

	return console.log(context);
});


/* Formata a data padrão Javascript para o padrão 'um dia atrás' ou 'alguns segundos atrás'*/
Ember.Handlebars.helper('format-date', function(date){
	moment.lang('pt-BR')
	var markup ='';
	markup += ' <small>';
	markup += moment(date).calendar();
	markup += '</small>';
	return new Handlebars.SafeString( markup );
});