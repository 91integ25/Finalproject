var React = require('react');
var Router = require('react-router');

var Query = require('./form/Query');


var helpers = require('../utils/helpers');

var Output = React.createClass({

  getInitialState: function() {
    return {
      firstName: "",
      lastName: "",
      education: ""
    }
  },

  // componentDidUpdate: function(preProps, preState)  {
  //
  //
  //   if (this.state.firstName != "" && (preState.firstName != this.state.firstName || preState.lastName != this.state.lastName || preState.education != this.state.education))
  //   {
  //     helpers.runQuery(this.state.firstName, this.state.lastName, this.state.education)
  //
  //     .then(function(data)  {
  //       if (data != this.state.results)
  //       {
  //         this.setState({
  //           results: data
  //         })
  //       }
  //
  //     }.bind(this))
  //   }
  // },

  setQuery: function(newQuery, newfirstName, newlastName){

    this.setState({
      firstName: newQuery,
      lastName: newfirstName,
      education: newlastName
    })
  },

  render: function(){

    return(

      <div className="main-container">

        <Query updateSearch={this.setQuery} />

      </div>

    )
  }
});

module.exports = Output;
