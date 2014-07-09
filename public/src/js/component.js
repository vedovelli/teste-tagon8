App.HtmlEditorComponent = Ember.Component.extend({

	tagName: 'textarea',

	_init: function() {

		var el = this.$();

		el.attr('required', this.get('required'));
		el.html(this.get('value'));
		el.css('height', 400);
		tinymce.init({selector:'textarea#' + el.attr('id')});

	}.on('didInsertElement')
});