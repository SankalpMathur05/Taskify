import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/authLayout'
import { useNavigate } from 'react-router-dom'
import './loginForm.css'
import Input from '../../components/Inputs/Input'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'

const Login = () => {
  const [remember, setRemember] = useState(false); // Remove when login is implemented
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //Login API Call

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <AuthLayout> 
      <form className="form-section" onSubmit={handleLogin}>
        <div className="form-container">
          <div className="input-group">
            <Input
              className="input-field"
              type="email"
              name="email"
              placeholder="john@example.com"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              className="input-field"
              type="password"
              name="password"
              placeholder="Min 8 Characters"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          {/* <div className="options-row">
            <label className="remember-me">
              <input 
                type="checkbox" 
                name="remember" 
                className="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="remember-text">Remember me</span>
            </label>
            <div className="forgot-password">Forgot password?</div>
          </div> */}

          <button type="submit" className="login-button">Log In</button>

          <div className="signup-text">
            <span>Don't have an account? </span>
            <span className="signup-link">
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}
export default Login;