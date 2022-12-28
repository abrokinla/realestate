import React, { useState } from "react";
import "../styles/login.css";

const LoginForm = () => {
    return (
        <>
            <form id="login-form">
                <h2>User Login</h2>
                <label for="email">
                    Email:
                    <input
                    type="email"
                    placeholder="Enter email"
                    name="email"></input>
                </label>

                <label for="password">
                    Password:
                    <input
                    type="password"
                    placeholder="Enter password"
                    name="pword"></input>
                </label>
                <section>
                    <button>Login</button>
                    <button>Cancel</button>                    
                </section>
            </form>
        </>
    )
}
export default LoginForm;