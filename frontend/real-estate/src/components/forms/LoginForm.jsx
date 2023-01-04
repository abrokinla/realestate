import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/login.css";


const LoginForm = () => {
    if (localStorage.getItem('idToken')) {
        window.location.href = '/user/dashboard';
        return null;
    };

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
        window.location.href = '/user/dashboard';
        
        // Redirect to dashboard
      })
      .catch(error => {
        setError('Invalid email or password');
      });
  };

  
    return (
        <>
            <form id="login-form">
                {error && <p className="error">{error}</p>}
                <h2>User Login</h2>
                <label>
                    Email:
                    <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                </label>

                <label>
                    Password:
                    <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                </label>

                <section>
                    <input type="submit" value="Login" onClick={handleSubmit} />
                    <button>Cancel</button>                    
                    
                </section>

                <section>
                    <p>New sign-up <Link to="/user-form">here</Link></p>
                </section>
            </form>
        </>
    )
}
export default LoginForm;