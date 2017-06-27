import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const Dashboard = ({ secretData }) => (
  <div className="container">

    <Card>
    <CardTitle
      title="You're on your way to creating your very own website"
      subtitle="Please fill out form below:"
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}

    </Card>

    <TextField
      hintText="First Name"
    /><br />
    <TextField
      hintText="Last Name"
    /><br />
    <TextField
      hintText="Education"
    /><br />
    <div>
    <RaisedButton type="submit" label="Submit"/>
    </div>
  </div>

);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
