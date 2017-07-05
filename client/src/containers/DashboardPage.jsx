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

  processForm(e) {


    //prevent default action. in this case, action is the form submission event
    e.preventDefault();


    let file = e.target.profilePic.files[0];

    const formData = new FormData();
    formData.append('firstName', e.target.firstName.value);
    formData.append('lastName', e.target.lastName.value);
    formData.append('education', e.target.education.value);
    formData.append('file', file);
    
    fetch('/auth/bio',{
      method: 'post',
      headers: {
      // 'Content-Type': 'multipart/form-data',
      'Authorization': `bearer ${Auth.getToken()}`
      },
      body: formData
    }).then((response) => {
        console.log('fetch worked: ', response)

        // var tempArr = [];
        //   for(var pair of formData.entries()) {
        //     tempArr.push(pair[1]);
        //   }
      }).catch(err => {
        console.log('error in fetch: ',err)
      })

    // for(var pair of formData.entries()) {

    //     console.log(pair[0]+ ', '+ pair[1]); 

    // }
    
    //create a string for an HTTP body message
    // const firstName = encodeURIComponent(event.target.firstName.value);
    // const lastName = encodeURIComponent(event.target.lastName.value);
    // const education = encodeURIComponent(event.target.education.value);
    // const formData = `firstName=${firstName}&lastName=${lastName}&education=${education}`;

    // create an AJAX request
    // const xhr = new XMLHttpRequest();
    // xhr.open('post', '/auth/bio', true);
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {

    //   if (xhr.status === 200) {
    //     // success
    //     console.log('hello world')

    //     // change the component-container state
    //     this.setState({
    //       errors: {}
    //     });

    //     // set a message
    //     localStorage.setItem('successMessage', xhr.response.message);

    //     // make a redirect
    //     // this.context.router.replace('/user');
    //   } else {
    //     // failure

    //     const errors = xhr.response.errors ? xhr.response.errors : {};
    //     errors.summary = xhr.response.message;

    //     this.setState({
          
    //     });
    //   }
    // });

    // xhr.send(formData);
  }
  /**
   * Render the component.
   */
  render() {
    return (

      <Dashboard
        secretData={this.state.secretData}
        onSubmit={this.processForm}
        onChange={this.handleImageChange}
      />
    );
  }

}

export default DashboardPage;
