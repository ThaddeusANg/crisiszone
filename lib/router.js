var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
    	console.log(Meteor.userId());
      if (!Meteor.userId()) {
        this.render('login');
        return pause();
      }else{
      	this.next();
      }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['home', 'search']
});

Router.configure({
	'layoutTemplate': "layout"
});

Router.route('/search', {
	name: 'search'});

Router.route('/home', {
	name: 'home'
});

Router.route('/footer', {
	name: 'footer'
});

Router.route('/map',{
	name: 'map'
});

Router.route('/registration',{
	name: 'registration'
});

Router.route('/login',{
	name: 'login'
})

Router.route('/report',{
	name:'report'
})