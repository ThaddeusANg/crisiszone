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
		console.log('Clicked logout button');
		Meteor.logout(function(err){
			console.log(err);
		});
		Router.go('search');
		console.log(Meteor.user());
	}
})