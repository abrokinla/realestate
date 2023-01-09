import React, { useState } from "react";
import jwtDecode from 'jwt-decode';
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar"
import Footer from "../Footer"
import "../../styles/login.css";


const LoginForm = () => {
    const checkToken = () => {
        if (localStorage.getItem('idToken')) {
            const idToken = localStorage.getItem('idToken');
            const decodedToken = jwtDecode(idToken);
            const { user_role } = decodedToken.user_role;
            if (user_role === 'user') {
              window.location.href = '/user/dashboard';
            } else if (user_role === 'agent') {
              window.location.href = '/agent/dashboard';
            }
            return null;
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
          localStorage.setItem('idToken', response.data.token);
          checkToken();
        })
        .catch(error => {
          setError('Invalid email or password');
      });
    };

  
    return (
        <section id="main-container">
          <NavBar />
          <section id="main-form-container">
            <section id="beside-form">
              <h3>Here I am</h3>
            </section>
            <section id="form-container">              
              <h2>Sign in to Araoye Homes</h2>
                <form id="login-form">
                    {error && <p className="error">{error}</p>}                    
                    <label>
                        <strong>Email:</strong>
                        <input
                          type="email"
                          placeholder="Enter email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)} />
                    </label><br/>

                    <label>
                        <strong>Password:</strong>
                        <input
                          type="password"
                          placeholder="Enter password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)} />
                    </label><br/>
                    
                    <input id ="login-btn"type="submit" value="Login" onClick={handleSubmit} />                        
                 
                    <section>
                        <p>Do not have an account? sign-up <Link to="/user-form">here</Link></p>
                    </section>
                </form> 
              </section>
            </section>
            <Footer />
        </section>
    )
}
export default LoginForm;