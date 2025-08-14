import SignUpLayout from '../../components/layouts/SignUpLayout'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUpForm.css'
import Input from '../../components/Inputs/Input'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/userContext'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = '';

    if (!fullName) {
      setError("Please enter a valid full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    //SignUp API Call
    try {

      //Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
      }

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
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
    <SignUpLayout>
      <form className="form-section" onSubmit={handleSignUp}>
        <div className="form-container">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="input-group">
            <Input
              className="input-field"
              type="fullName"
              name="fullName"
              placeholder="John Doe"
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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
            <Input
              className="input-field"
              type="text"
              name="Admin Invite Token"
              placeholder="6 Digit Code"
              label="Admin Invite Token"
              value={adminInviteToken}
              onChange={(e) => setAdminInviteToken(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="signUp-button">Sign Up</button>

          <div className="login-text">
            <span>Already have an account? </span>
            <span className="login-link">
              <Link to="/login">Log In</Link>
            </span>
          </div>
        </div>
      </form>
    </SignUpLayout>
  )
}

export default SignUp;