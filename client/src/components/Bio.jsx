import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Bio = ({ user }) =>(
    <div className = "container">
    <h1>{user.firstName} {user.lastName}'s BioPage</h1>
    <h2>{user.firstName} went to school at {user.education}</h2>
    <img src='{user.profilePic}'>
    </div>
    );

export default Bio;