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
      console.log('called search');
    
      try {
        //svar response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k&lat='+lat+'&lon='+lon+'&radius=5');
        var response = HTTP.get('http://api.sigimera.org/v1/crises.json?auth_token=EtcYxoBYskcMo-cVeC8k&lat=-10.9949&lon=162.5624&radius=50');
        var obj = JSON.stringify(response);
        if(!obj){
          console.log('no detected crises');
          var response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k&lat=-10.9949&lon=162.5624&radius=50');
          var obj = JSON.stringify(response);
        }else{
        //sconsole.log("Content"+response);
        //CrisisCollection.insert(obj);
      }
      console.log("String JSON:::::"+obj);
      var json=JSON.parse(obj);
      console.log(json.data[0].dc_title);
      } catch(error) {
        console.log(error);
      }
    }
  });