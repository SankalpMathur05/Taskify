import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpLayout.css'; 
import logo from '../../assets/images/login-register/logo.png';
import registerVideo from '../../assets/images/login-register/register-gif.mp4';
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input';

const SignUpLayout = ({ children }) => {
  return (
      <div className="signup-page">
        <nav className="navbar">
          <div className="logo-container">
            <Link to="/" className="logo-image"><img src={logo} alt="Taskify Logo"/></Link>
          </div>
      
        <div className="action-buttons">
          <Link to="/login" className="primary-btn">Log In</Link>
          </div>
        </nav>

      <div className="login-wrapper">
        <div className="login-container">
          <div className="welcome-texts">
            <div className="main-heading">Hey there,<br />let's get started!</div>
            <div className="sub-heading">Create your own workspace and start organizing</div>
          </div>
          <div className="grow mx-5">{children}</div> 
        </div>
        <div className="right">
          <video className="login-video" autoPlay muted loop playsInline>
            <source src={registerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
    </div>
    </div>
  );
};

export default SignUpLayout;
