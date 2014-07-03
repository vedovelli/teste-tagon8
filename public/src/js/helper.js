Handlebars.registerHelper("log", function(context) {

	return console.log(context);
});


/* Formata a data padrão Javascript para o padrão 'um dia atrás' ou 'alguns segundos atrás'*/
Ember.Handlebars.helper('format-date', function(date){

	moment.lang('pt-BR');
	return new Handlebars.SafeString(moment(date).calendar());
});

/* devolve as tags HTML para o conteúdo encoded provido pelo MongoDB */
Ember.Handlebars.helper('decode-html', function(content) {

	var e = document.createElement('div');
	e.innerHTML = content;
	return new Handlebars.SafeString(e.childNodes[0].nodeValue);
});