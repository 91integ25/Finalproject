import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      secretData: '',
      user: {
        firstName: '',
        lastName: '',
        education: ''
      }
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
      if (xhr.status) {
        this.setState({
          secretData: xhr.response
        });
      }
    });
    xhr.send();
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const firstName = encodeURIComponent(this.state.user.firstName);
    const lastName = encodeURIComponent(this.state.user.lastName);
    const education = encodeURIComponent(this.state.user.education);
    const formData = `firstname=${firstName}&lastName=${lastName}&education=${education}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/user');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        // make a redirect
        this.context.router.replace('/user');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
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
        user={this.state.user}
      />

    );
  }

}

export default DashboardPage;
