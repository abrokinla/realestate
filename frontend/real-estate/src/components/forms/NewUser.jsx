import react, { useState } from "React";
import axios from 'axios';
import NavBar from "../NavBar";
import { Link } from 'react-router-dom'
import "../../styles/newuser.css";
// import firebase from 'firebase';

const NewUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [tel, setTel] = useState("");
  const [access_token, setAccess_token] = useState("");

 

  const handleSignUp = (event) => {
    // Prevent the default form submission
    event.preventDefault();
  
    // Get the values of the form inputs
    const user_email = email;
    const user_password = password;
    const user_first_name = first_name;
    const user_last_name = last_name;
    const user_tel = tel;
    const user_access_token = access_token;
    const u_user_role = "user";
    
    let signup_type;
  
    if (access_token) {
      // If the access token is present, the user is signing up with Google
      signup_type = "google";
    } else {
      // If the access token is not present, the user is signing up with email and password
      signup_type = "email";
    }
  
    // Send a POST request to the server with the signup type, access token (if present), and user role
    axios.post('/users', {
      signup_type: "email",
      access_token:user_access_token,
      user_role:u_user_role,
      email:user_email,
      password:user_password,
      first_name:user_first_name,
      last_name:user_last_name,
      tel:user_tel
    })
    .then(response => {
      // If the request is successful, store the ID token in local storage
      localStorage.setItem('id_token', response.data.id_token);
      console.log("sign-up sucessful")
      window.location.href = '/login'
    })
    .catch(error => {
      // If there is an error, display the error message
      console.error(error.response.data.error);
    });
  }

  const checkPassword = (event) => {
    const form = document.getElementById('user_registration_form');
    form.addEventListener('submit', (event) => {
      event.stopPropagation();  // prevent the form from being submitted

    if (password !== confirmPassword) {
        // display error message
        alert('Passwords do not match');
        return;
    } else {
        // submit the form
        form.submit();
    }
    });
  }
  
    return (
      <>
        <NavBar />
          <section className="user-form">            
              <section id="form-container">
                <h1>Register New User</h1>
                    
                <form id="user_registration_form" onSubmit={event => {
                        checkPassword(event);
                        handleSignUp(event);
                        }}>
                    <input type="hidden" id="access_token" name="access_token" value={access_token} />
                    <input type="hidden" id="user_role" name="user_role" value="user" />                    
                                       
                    <label>First Name:<br />
                        <input
                        type="text"
                        name="first_name"
                        value= {first_name}
                        onChange={e => setFirst_name(e.target.value)}
                        placeholder="First Name"
                        />
                    </label><br />

                    <label>Last Name:<br />
                        <input
                        type="text"
                        name="last_name"
                        value= {last_name}
                         onChange={e => setLast_name(e.target.value)}
                        placeholder="Last Name"
                        />
                    </label><br />

                    <label>Email:<br />
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value= {email}
                        placeholder="Enter Email Address"
                        required
                        onChange={e => setEmail(e.target.value)}
                        />
                    </label><br />

                    <label>Password:<br />
                        <input
                        type="password"
                        id="password"
                        name="pword"
                        value= {password}
                        required
                        onChange={e => setPassword(e.target.value)}
                        />
                    </label><br />

                    <label>Verify Password:<br />
                        <input
                        type="password"
                        name="pword"
                        value= {confirmPassword}
                        required
                        onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </label><br />

                    <label>Mobile Number:<br />
                        <input
                        type="tel"
                        name="tel"
                        value= {tel}
                        onChange={e => setTel(e.target.value)}
                        />
                    </label><br />

                    <button type='submit'>Register</button>
                    <button type='submit' id="google-sign-in-button">Register with Google</button>
                </form>
                <span>
                    Already have an account?  
                    <Link to='/login'>login</Link>
                </span>
              </section>
          </section>
        </>
    )
}
export default NewUser;