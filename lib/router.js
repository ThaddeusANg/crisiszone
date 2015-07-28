var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.userId()) {
        this.render('login');
        return pause();
      }else{
      	this.next();
      }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['home', 'search', 'report']
});

Router.configure({
	'layoutTemplate': "layout"
});

Router.route('/', {
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