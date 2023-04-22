import React, { useState } from "react";
import jwtDecode from 'jwt-decode';
import { Link } from "react-router-dom";
import axios from "axios";
import AuthNavBar from "../AuthNavBar"
import Footer from "../Footer"
import "../../styles/login.css";


const LoginForm = () => {
  const checkToken = () => {
    if (localStorage.getItem('idToken')) {
      const idToken = localStorage.getItem('idToken');
      console.log(idToken);
      try {        
        fetch('http://localhost:5000/verify-token', {
          method: 'POST',
          headers: {
            'Authorization': idToken
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Token verification failed');
          }
          return response.json();
        })
        .then(data => {
          const decodedToken = jwtDecode(idToken);
          const user_role = decodedToken.user_role;
          const user_id = decodedToken.agent_id;
          const isAdmin = decodedToken.is_admin;
          
          localStorage.setItem("agentId", user_id)
          if (user_role === 'user') {
            window.location.href = '/';
          } else if (user_role === "agent"  && isAdmin === true){
            window.location.href = '/admin/dashboard';
          } else if (user_role === "agent"  && isAdmin === false) {
            window.location.href = '/agent/dashboard';
          }
          return null;
        })
        .catch(error => {
          console.error(error);
          localStorage.removeItem('idToken');
          // handle error
        });
      } catch (error) {
        console.error(error);
        localStorage.removeItem('idToken');
        // handle error
      }
    }
  }


    checkToken();   

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] = useState('')

    const handleSubmit = (event) => {
      event.preventDefault();
      const user_email=email
      const user_password = password      
      axios.post('http://127.0.0.1:5000/login', {         
          email: user_email,
          password: user_password 
          })
        .then(response => {
          // Save the idToken to localStorage
          alert('login successful');
          localStorage.setItem('idToken', response.data.token);
          // localStorage.setItem('user', response.data.user);
          checkToken();
        })
        .catch(error => {
          setError('Invalid email or password');
      });
    };

    
    return (
        <section id="main-container">
          <AuthNavBar />
          <section id="main-form-container">
            <section id="beside-form">
              <section id="s-m-container">
                <span id="linkedin">                        
                    <i className="fab fa-linkedin" aria-hidden="true"></i>
                </span>
                <span id="twitter">                        
                    <i className="fab fa-twitter" aria-hidden="true"></i>
                </span>
                <span id="facebook">                        
                    <i className="fab fa-facebook" aria-hidden="true"></i>
                </span>
              </section>
              <section  id="core-values">
                <h3>Your real estate plug!</h3>
                <article>
                  You are welcome back to <em>Araoye Homes</em>. We would love to help you find your next home.
                </article>
              </section>
            </section>
            <section id="form-container">              
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
                            onChange={e => setEmail(e.target.value)} />
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
                            onChange={e => setPassword(e.target.value)} />
                      </label><br/>
                    </div>
                    <div className="action">
                      {/* <input id ="login-btn"type="submit" value="Register" onClick={goToRegisterUser} /> */}
                      <input id ="login-btn"type="submit" value="Login" onClick={handleSubmit} />                      
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
    )
}
export default LoginForm;