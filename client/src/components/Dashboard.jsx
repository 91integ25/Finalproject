import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const Dashboard = ({
  secretData,
  onSubmit,
  onChange,
  }) => (
  <div className="container">

    <Card>
    <CardTitle
      title="You're on your way to creating your very own website"
      subtitle="Please fill out form below:"
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}

    </Card>

    <form formMethod="post" action="/auth/bio" onSubmit={onSubmit} encType="multipart/form-data">
      <h2 className="card-heading">Form</h2>

      <div className="field-line">
        <TextField
          floatingLabelText="First Name"
          name="firstName"

        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="Last Name"
          name="lastName"

        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Education"
          name="education"

        />
      </div>

      <RaisedButton
         containerElement="label" // <-- Just add me!
         label="My Profile Pic">
         <input type="file" name="profilePic" onChange={onChange}/>
      </RaisedButton>

      <RaisedButton
         containerElement="label" // <-- Just add me!
         label="Resume">
         <input type="file" name="resume" onChange={onChange}/>
      </RaisedButton>

      <div className="button-line">
        <RaisedButton type="submit" label="Submit" primary />
      </div>

      <CardText>Already Submitted Form? <Link to={'/UserPage'}>Preview Website</Link>.</CardText>
    </form>

  </div>

);

// Dashboard.propTypes = {
//   secretData: PropTypes.string.isRequired,
//
// };

export default Dashboard;
