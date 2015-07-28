Template.header.rendered = function() {
    if(!this._rendered) {
    	Session.set('test',"test");
      this._rendered = true;
      console.log('Template onLoad');
      Meteor.call('clean');
    }
}

Template.header.events({
	'click #logout':function(){
		Meteor.logout(function(err){
			console.log(err);
		});
		Router.go('login');
	},
	'click #title':function(){
		Router.go('/');
	}
})