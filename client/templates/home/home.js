  // initialize session variables
Session.set('loadData',false);
Session.setDefault('loc', 0);

Template.home.helpers({
});

Template.home.events({
    'click #search': function (event) {
      // increment the counter when button is clicked
      event.preventDefault();
        if (Session.get('loadData') ==false){
          console.log('inside');   
        }
      console.log('clicked on search button');
      //Meteor.call('getLocalCrisis',Session.get('lat'), Session.get('long'));
    }
});

//end client
