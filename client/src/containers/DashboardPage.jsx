import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
var FormData = require('form-data');



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
      education: '',
      file: {}
    };
    this.processForm = this.processForm.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
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
    uploadImage(imageFile) {
      return new Promise((resolve, reject) => {
        let imageFormData = new FormData();

        imageFormData.append('imageFile', imageFile.target.files[0]);
        
        var xhr = new XMLHttpRequest();
        
        xhr.open('post', '/auth/upload', true);
        
        xhr.onload = function () {
          if (this.status == 200) {
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        };
        
        xhr.send(imageFormData);

      });
    }

    handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
      });
    }
    
    reader.readAsDataURL(file);


  }

  processForm(event) {


    //prevent default action. in this case, action is the form submission event
    event.preventDefault();

     //create a string for an HTTP body message
    const firstName = encodeURIComponent(event.target.firstName.value);
    const lastName = encodeURIComponent(event.target.lastName.value);
    const education = encodeURIComponent(event.target.education.value);
    const formData = `firstName=${firstName}&lastName=${lastName}&education=${education}`;

    //create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/bio', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {

      if (xhr.status === 200) {
        // success
        console.log('hello world')

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
    this.context.router.replace('/BioPage');
  }
  /**
   * Render the component.
   */
  render() {
    return (

      <Dashboard
        secretData={this.state.secretData}
        onSubmit={this.processForm}
        onChange={this.uploadImage}
      />
    );
  }

}

DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DashboardPage;
