
  Meteor.methods({
    getLocalCrisis: function(lat, lon){
      console.log('called search');
    
      try {
        //svar response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k&lat='+lat+'&lon='+lon+'&radius=5');
        var response = HTTP.get('http://api.sigimera.org/v1/crises.json?auth_token=EtcYxoBYskcMo-cVeC8k&lat=-10.9949&lon=162.5624&radius=50');
        var obj = JSON.stringify(response);
        if(!obj){
          console.log('no detected crises');
          response = HTTP.get('http://api.sigimera.org/v1/crises?auth_token=EtcYxoBYskcMo-cVeC8k&lat=-10.9949&lon=162.5624&radius=50');
          Session.set('lat',-10.9949);
          Session.set('long', 162.5624);
          var obj = JSON.stringify(response);
        }else{
        //sconsole.log("Content"+response);
        //CrisisCollection.insert(obj);
      }
      console.log("String JSON:::::"+obj);
      var json=JSON.parse(obj);
      console.log(response.data[0].dc_title);
      } catch(error) {
        console.log(error);
      }
    }
  });