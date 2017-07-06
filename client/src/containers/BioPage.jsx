import React, { PropTypes } from 'react';
import Bio from '../components/Bio.jsx';
import Auth from '../modules/Auth'

class BioPage extends React.Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            errors:{},
            userInfo:{}
        };
        
    }
    componentWillMount(){
        
        const xhr = new XMLHttpRequest();
        xhr.open("get","/public/biopage");
        xhr.setRequestHeader("Content-type",'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = "json";
        xhr.addEventListener('load', () =>{

            if(xhr.status === 200){
                this.setState({
                    userInfo: xhr.response
                });
            }
        });
        xhr.send();
    }
    render(){
        return(
            <Bio
            user={this.state.userInfo}/>
            )
    }


}
export default BioPage;