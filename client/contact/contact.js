Template.contact.events({ 
    'click #contactBtn': function(event) {
		event.preventDefault();
		var from = 'thaddeus.a.ng@gmail.com';
		var to = $("#email-field").val();
		var name = $("#name-field").val();
		var subject = $("#subject-field").val() + " - " + name;
		var text =  $("#msg-field").val();

		Meteor.call('sendEmail',
          to,
          from,
          subject,
          text);     

		alert("Message is sent");
	}
});

