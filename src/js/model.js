
var a = DS.attr;

App.Post = DS.Model.extend({

	title: a('string'),
	body: a('string'),
	post_date: a('string'),
	tags: a('string')
});
