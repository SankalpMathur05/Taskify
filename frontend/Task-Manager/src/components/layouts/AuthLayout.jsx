import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; 
import logo from '../../assets/images/login-register/logo.png';
import loginVideo from '../../assets/images/login-register/login-gif.mp4';
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input';

const AuthLayout = ({ children }) => {
  const [remember, setRemember] = useState(false); // Remove when login is implemented
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();
  };
  return (
      <div className="login-page">
        <nav className="navbar">
          <div className="logo-container">
            <Link to="/" className="logo-image"><img src={logo} alt="Taskify Logo"/></Link>
          </div>
      
        <div className="action-buttons">
          <Link to="/signup" className="primary-btn">Sign up</Link>
          </div>
        </nav>

      <div className="login-wrapper">
        <div className="login-container">
          <div className="welcome-texts">
            <div className="main-heading">Holla,<br /> Welcome Back</div>
            <div className="sub-heading">Glad to see you again — let’s get things done!</div>
          </div>
          <div className="grow mx-5">{children}</div> {/* INCLUDE NOW OR LATER */}
        </div>
        <div className="right">
          <video className="login-video" autoPlay muted loop playsInline>
            <source src={loginVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
    </div>
    </div>
  );
};

export default AuthLayout;
