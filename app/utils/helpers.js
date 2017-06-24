var axios = require('axios');

var helpers = {

  getSaved: function(){

    return axios.get('/api/savedBio')
      .then(function(results){

        return results;
      })
  },

  postSaved: function(firstName, lastName, education){

    var newResume= {firstName: firstName, lastName: lastName, education: education};
    return axios.post('/api/savedBio', newResume)
      .then(function(results){
        return results._id;
      })

  }

}

module.exports = helpers;
