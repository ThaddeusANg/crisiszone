smtp = {
    username: "dummy",   // eg: server@gentlenode.com
    password: 'dummy',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 25
  }

Meteor.startup(function(){
  console.log("srvr: "+smtp.username+" srvr pswd: "+smtp.password);

 process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

});


Meteor.methods({
  'setupEmail':function(gmailAcct, gmailPswd){
    smtp.username=gmailAcct;
    smtp.password=gmailPswd;
    console.log("Set up email URL");
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  },
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    //actual email sending method
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});