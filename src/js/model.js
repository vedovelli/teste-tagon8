
var a = DS.attr;

App.Post = DS.Model.extend({

	title: a('string'),
	body: a('string'),
	post_date: a('date'),
	tags: a('array')
});

App.Brand = DS.Model.extend({

	name: a('string'),
	removed: a('boolean', {defaultValue: false})
});