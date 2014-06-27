
var a = DS.attr;

App.Post = DS.Model.extend({

	title: a('string'),
	body: a('string'),
	post_date: a('string'),
	tags: a('string'),
	comments: DS.hasMany('comment', {async: true})
});

App.Comment = DS.Model.extend({

	postid: a('string'),
	fullname: a('string'),
	email: a('string'),
	comment: a('string'),
	comment_date: a('string'),
	post: DS.belongsTo('post')
});
