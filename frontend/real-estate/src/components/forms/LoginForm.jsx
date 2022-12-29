import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/login.css";


const LoginForm = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] = useState('')

    const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/login', { email, password })
      .then(response => {
        window.location.href = '/user/dashboard';
        
        // Redirect to dashboard
      })
      .catch(error => {
        setError('Invalid email or password');
      });
  };

  
    return (
        <>
            <form onSubmit={handleSubmit} id="login-form">
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
                    <button type="submit">Login</button>
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