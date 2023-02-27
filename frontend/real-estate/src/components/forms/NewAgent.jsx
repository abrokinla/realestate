import React, { useState } from "react";
import axios from 'axios';
import Footer from '../Footer';
import AuthNavBar from "../AuthNavBar";
import "../../styles/newagent.css";
import { Link } from 'react-router-dom'
import "../../styles/newuser.css";

const NewAgent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [business_name, setBusiness_name] = useState("");
  const [business_web, setBusiness_web] = useState("");
  const [agent_call_number, setAgent_call_number] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tel, setTel] = useState("");
  const [access_token, setAccess_token] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();
    // Get the values of the form inputs
    const agent_email = email;
    const agent_password = password;
    const agent_first_name = first_name;
    const agent_last_name = last_name;
    const agent_tel = tel;
    const agent_business_name = business_name;
    const a_agent_call_number = agent_call_number;
    const agent_whatsapp = whatsapp;
    const agent_business_web = business_web;    
    const u_user_role = "agent";

    if(password == confirmPassword) {
      axios.post('http://localhost:5000/agents', {
        signup_type : "email",
        user_role  : u_user_role,
        email : agent_email,
        password: agent_password,
        first_name : agent_first_name,
        last_name : agent_last_name,
        tel : agent_tel,
        business_name : agent_business_name,
        agent_call_number : a_agent_call_number,
        whatsapp: agent_whatsapp,
        business_web : agent_business_web,
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
      <section id="agent-form-container">
        <AuthNavBar />
        <section id="main-a-f-contr">
          <section id="bsyd-frm">
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
          <section id="frm-containr">
             <h1>Sign Up As Agent</h1>
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
                    palceholder="Email Address"/>
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
                    palceholder="Password"/>
                </label> <br />
              </div>

              <div className="input-field">
                <label> Confirm Password: <br />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    name="confirmPassword"
                    palceholder="Confirm Password"/>
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
                    palceholder="Mobile Number"/>
                </label> <br />
              </div>

              <section id="form-group"              >
                <div className="input-field">
                  <label> Agent Call Number: <br />
                    <input
                      type="tel"
                      required
                      value={agent_call_number}
                      onChange={e => setAgent_call_number(e.target.value)}
                      name="agent_call_number"
                      palceholder="Agent Call Number"/>
                  </label> <br />
                </div>
                
                <div className="input-field">
                  <label> Whatsapp Number: <br />
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      name="whatsapp"
                      palceholder="Whatsapp Number"/>
                  </label> <br />
                </div>
              </section>

              <section id="form-group">
                <div className="input-field">
                  <label> Business Name: <br />
                    <input
                      type="text"
                      required
                      value={business_name}
                      onChange={e => setBusiness_name(e.target.value)}
                      name="business_name"
                      palceholder="Business Name"/>
                  </label> <br />
                </div>
                
                <div className="input-field">
                  <label> Business Web: <br />
                    <input
                      type="url"
                      required
                      value={business_web}
                      onChange={e => setBusiness_web(e.target.value)}
                      name="business_web"
                      palceholder="Business Website"/>
                  </label> <br />
                </div>
              </section>
              
              <div className="action">
                <input id= "register-button" type="submit" value="Register" onClick={handleSignup}/>
              </div>
              <p>Already have an account? Click <Link to="/login">here</Link> to login.</p>
              
            </form>
          </section>          
        </section>
        <Footer />
      </section>
    )
}
export default NewAgent;