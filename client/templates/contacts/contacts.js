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