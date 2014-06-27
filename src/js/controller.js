App.PostController = Ember.ObjectController.extend({

	actions: {

		save: function() {

			console.log(this.get('model'));
		}
	}
});