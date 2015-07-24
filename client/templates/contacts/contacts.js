
Template.contacts.helpers({
    selected: function () {
      return Session.equals("selectedContact", this._id) ? "selected" : '';
    }
  });

  Template.contacts.events({
    'click': function () {
      Session.set("selectedContact", this._id);
    }
  });


Template.contacts.rendered = function() {
  	console.log('contacts rendered');
    if(!this._rendered) {
    	// Session.set('contEmail',template.find('#contEmail'));
    	// Session.set('contPhone',template.find('#contPhone'));
    	// console.log("Session email and phone: "+Session.get('contEmail')+Session.get('contPhone'));
    }
}