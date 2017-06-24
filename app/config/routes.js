var React = require('react');

var Router = require('react-router');
var Route = Router.Route;

var IndexRoute  = Router.IndexRoute;

var Main = require('../components/Main');
var Output = require('../components/Output');


module.exports = (

  <Route path='/' component={Main}> // Sets Parent

    <Route path='Output' component={Output} />

    <IndexRoute component={Output} />

  </Route>

);
