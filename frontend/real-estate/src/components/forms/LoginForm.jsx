import React, { useState } from "react";
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Link } from "react-router-dom";
import axios from "axios";
import AuthNavBar from "../AuthNavBar";
import Footer from "../Footer";
import "../../styles/login.css";

// Check if token is valid
export const checkToken = () => {
  const idToken = Cookies.get('idToken'); // This already includes 'Bearer'
  if (idToken) {
    try {
      return fetch('http://localhost:5000/verify-token', {
        method: 'POST',
        headers: {
          'Authorization': idToken  // idToken contains 'Bearer '
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Token verification failed');
        }
        return response.json();
      })
      .then(data => {
        return true; // Token is valid
      })
      .catch(error => {
        console.error(error);
        Cookies.remove('idToken');  // Clear token if invalid
        return false;
      });
    } catch (error) {
      console.error(error);
      Cookies.remove('idToken');
      return false;
    }
  } else {
    return false;
  }
};


// Divert user based on role and token validity
export const divertDashboard = async () => {
  const isTokenValid = await checkToken();
  if (isTokenValid) {
    const idToken = Cookies.get('idToken');
    const decodedToken = jwtDecode(idToken);
    const user_role = decodedToken.user_role;
    const agent_name = decodedToken.agent_name;
    const user_id = decodedToken.agent_id;
    const isAdmin = decodedToken.is_admin;

    // Set custom claims in cookies for easy access
    Cookies.set("agentId", user_id);
    Cookies.set("agentName", agent_name);
    
    if (user_role === 'user') {
      window.location.href = '/';
    } else if (user_role === "agent" && isAdmin === true) {
      window.location.href = '/admin/dashboard';
    } else if (user_role === "agent" && isAdmin === false) {
      window.location.href = '/agent/dashboard';
    }
  } else {
    // Handle token failure
    return null;
  }
};

// Login form component
const LoginForm = () => {
  
  divertDashboard();  // Check token validity on load

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const user_email = email;
    const user_password = password;
  
    // Reset both error and success messages at the start
    setError('');
    setSuccess('');
  
    // Post login data to server
    axios.post('http://127.0.0.1:5000/api/v1/login', {         
      email: user_email,
      password: user_password 
    })
    .then(response => {
      // Save the token to a cookie
      Cookies.set('idToken', response.data.token);
  
      // Clear any existing error message
      setError('');
  
      setSuccess('Login successful! Redirecting to dashboard...');
      
      setTimeout(() => {
        divertDashboard();
      }, 2000);
    })
    .catch(error => {
      // Clear success message in case of error
      setSuccess('');
      
      // Check if the error is due to a server response or network issue
      if (error.response) {
        // Server responded with a status outside 200 range
        setError('Invalid email or password. Please try again.');
      } else if (error.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection.');
      } else {
        // Something else happened during the request setup
        setError('An unexpected error occurred. Please try again later.');
      }
    });
};

  

  return (
    <section id="main-container">
      <AuthNavBar />
      <section id="main-form-container">
        <section id="beside-form">
          <section id="s-m-container">
            <span id="linkedin"><i className="fab fa-linkedin" aria-hidden="true"></i></span>
            <span id="twitter"><i className="fab fa-twitter" aria-hidden="true"></i></span>
            <span id="facebook"><i className="fab fa-facebook" aria-hidden="true"></i></span>
          </section>
          <section  id="core-values">
            <h3>Your real estate plug!</h3>
            <article>You are welcome back to <em>Araoye Homes</em>. We would love to help you find your next home.</article>
          </section>
        </section>
        <section id="form-container"> 
        {error && <div className="error-message">{error}</div>}
          <h2>Sign in to Araoye Homes</h2>
          <form id="login-form">
            {error && <p className="error">{error}</p>}  
            <div className="input-field">                  
              <label>
                <strong>Email:</strong>
                <input
                  type="email"
                  placeholder="Enter email"
                  id="email-txt"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)} 
                />
              </label><br/>
            </div>
            <div className="input-field">
              <label>
                <strong>Password:</strong>
                <input
                  type="password"
                  placeholder="Enter password"
                  id="password-txt"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)} 
                />
              </label><br/>
            </div>
            <div className="action">
              <input id="login-btn" type="submit" value="Login" onClick={handleSubmit} />                      
            </div>
            <section>
              <p id="signup_link">Do not have an account? sign-up <Link to="/user-form">here</Link></p>
            </section>
          </form> 
        </section>
      </section>
      <section id="footer-container">
        <Footer />
      </section>
    </section>
  );
};

export default LoginForm;
