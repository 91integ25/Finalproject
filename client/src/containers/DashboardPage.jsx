import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import LoginPage from './LoginPage.jsx';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      secretData: '',
      firstName: '',
      lastName: '',
      education: ''
    };
    this.processForm = this.processForm.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {

    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response
        });
      }
    });
    xhr.send();
  }

  processForm(event) {


    //prevent default action. in this case, action is the form submission event
    event.preventDefault();

    //create a string for an HTTP body message
    const firstName = encodeURIComponent(event.target.firstName.value);
    const lastName = encodeURIComponent(event.target.lastName.value);
    const education = encodeURIComponent(event.target.education.value);
    const formData = `firstName=${firstName}&lastName=${lastName}&education=${education}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/bio');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {

      if (xhr.status === 200) {
        // success
        console.log('hello world')
        console.log(LoginPage)
        // change the component-container state
        this.setState({
          errors: {}
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        // make a redirect
        // this.context.router.replace('/user');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          
        });
      }
    });

    xhr.send(formData);
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <Dashboard
        secretData={this.state.secretData}
        onSubmit={this.processForm}

      />

    );
  }

}

export default DashboardPage;
