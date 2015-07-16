  // Meteor.startup(function () {
  //   // code to run on server at startup
  //       console.log('called search');
    
  //   try {
  //     var response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k');
  //     console.log("Content"+response);
  //     CrisisCollection.insert(response);
  //   } catch(error) {
  //     console.log(error);
  //   }
  //   /*  _.each(names, function (name) {
  //       Players.insert({name: name,score: Math.floor(Random.fraction() * 10) * 5});
  //         });
  // */
  //   });

  Meteor.methods({
    getLocalCrisis: function(lat, lon){
      console.log('test');
        console.log('called search');
    
      try {
        var response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k&lat,lon,radius='+lat+','+lon+', 5');
        console.log('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k&lat='+lat+'&lon='+lon+'&radius=5');
        console.log("Content"+response.);
        CrisisCollection.insert(response);
      } catch(error) {
        console.log(error);
      }
    }
  });