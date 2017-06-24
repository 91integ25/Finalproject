var React = require('react');

var Query = React.createClass({

  getInitialState: function(){
    return {
      firstName: "",
      lastName: "",
      education: "",
    }
  },


  handleChange: function(event) {

      var newState = {};
      newState[event.target.id] = event.target.value;
      this.setState(newState);
  },


  handleSubmit: function(){

    this.props.updateSearch(this.state.firstName, this.state.lastName, this.state.education);
    return false;
  },


  render: function(){

    return(
      <div className = "container">
        <div className ="main-container">


          <div className="row">
            <div className="col-lg-12">

              <div className="panel panel-primary">
                <div className="panel-heading">

                  <h3 className="panel-title"><strong><i className="fa fa-pencil" aria-hidden="true"></i>  Bio Form</strong></h3>
                </div>
                <div className="panel-body">

                  <form>
                    <div className="form-group">
                      <h4 className=""><strong>First Name</strong></h4>
                      <input type="text" value={this.state.value} className="form-control " id="firstName" onChange= {this.handleChange} required/>

                      <h4 className=""><strong>Last Name</strong></h4>
                      <input value={this.state.value} className="form-control " id="lastName" onChange= {this.handleChange} required/>

                      <h4 className=""><strong>Education</strong></h4>
                      <input value={this.state.value} className="form-control " id="education" onChange= {this.handleChange} required/>

                    </div>

                    <div className="pull-right">
                      <button type="button" className="btn btn-primary" onClick={this.handleSubmit}><h4>Submit</h4></button>
                    </div>
                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    )
  }

});

module.exports = Query;
