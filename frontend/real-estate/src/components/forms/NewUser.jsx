import React, { useState } from "react";
import axios from 'axios';
import AuthNavBar from "../AuthNavBar";
import Footer from "../Footer";
import { Link } from 'react-router-dom'
import "../../styles/newuser.css";

const NewUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [tel, setTel] = useState("");
  const [access_token, setAccess_token] = useState("");

  const handleSignup = (event) => {
        // Prevent default form submission
    event.preventDefault();
    // Get the values of the form inputs
    const user_email = email;
    const user_password = password;
    const user_first_name = first_name;
    const user_last_name = last_name;
    const user_tel = tel;
    // const user_access_token = access_token;
    const u_user_role = "user";

    if(password == confirmPassword) {
      axios.post('http://localhost:5000/users', {
        signup_type : "email",
        user_role  : u_user_role,
        email : user_email,
        password: user_password,
        first_name : user_first_name,
        last_name : user_last_name,
        tel : user_tel,
      })
      .then(response => {
        // If the request is successful, store the ID token in local storage
        localStorage.setItem('id_token', response.data.id_token);
        window.location.href = '/login'
      })
      .catch(error => {
        // If there is an error, display the error message
        console.error(error.response.data.error);
      });
    } else {
      alert("Password mismatch");
      event.preventDefault();
      return;
    }    
  }

    return (
      <section id="user-form-container">
        <AuthNavBar />          
        <section id="main-f-contr">
          <section id ="beside-frm">
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
          <section id="form-contr">
            <h1>Sign Up As User</h1>
              <form>
                <section id="form-group">
                  <div className="input-field">
                    <label> First Name: <br />
                      <input
                        type="text"
                        required
                        value={first_name}
                        onChange={e => setFirst_name(e.target.value)}
                        name="first_name"
                        placeholder="First Name"/>
                    </label> <br />
                  </div>

                  <div className="input-field">                
                    <label> Last Name: <br />
                      <input
                        id="in-text"
                        type="text"
                        required
                        value={last_name}
                        onChange={e => setLast_name(e.target.value)}
                        name="last_name"
                        placeholder="Last Name"/>
                    </label> <br />
                  </div>
                </section>

                <div className="input-field">
                  <label> Email Address: <br />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      name="email"
                      placeholder="Email Address"/>
                  </label> <br />        
                </div> 
                
                <div className="input-field">
                  <label> Password: <br />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      name="pword"
                      placeholder="Password"/>
                  </label> <br />   
                </div>      

                <div className="input-field">
                  <label> Confirm Password: <br />
                    <input 
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      name="confirmPassword"
                      placeholder="Confirm Password"/>
                  </label> <br />
                </div>

                <div className="input-field">
                  <label> Mobile Number: <br />
                    <input
                      type="text"
                      required
                      value={tel}
                      onChange={e => setTel(e.target.value)}
                      name="tel"
                      placeholder="Mobile Number"/>
                  </label> <br />
                </div>

                <div className="action">
                  <input id="register-btn"type="submit" value="Register" onClick={handleSignup}/>
                </div>

                <p>Already have an account? Click <Link to="/login">here</Link> to login.</p>
                
              </form>       
            </section>
          </section>
          <Footer />
      </section>
    )
}
export default NewUser;