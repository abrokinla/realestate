import react, { useState } from "React";
import * as firebase from 'firebase/app';
import NavBar from "../NavBar";
import { Link } from 'react-router-dom'
import "../../styles/newuser.css";
// import firebase from 'firebase';

const NewUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [access_token, setAccess_token] = useState("");

  // Initialize Firebase
  firebase.initializeApp({
    "apiKey": "AIzaSyC1Fynp1Af2o2PPterFCWvyWWsdG1O51J4",
    "authDomain": "real-estate-e45dd.firebaseapp.com",
    "projectId": "real-estate-e45dd",
    "storageBucket": "real-estate-e45dd.appspot.com",
    "messagingSenderId": "799389364325",
    "appId": "1:799389364325:web:9fa1f13cabd5471e9ed68c",
    "measurementId": "G-0Z72D2ZCD6"
    
  });

  const googleButton = document.getElementById('google-sign-in-button');
  if(googleButton) {
    googleButton.addEventListener('click', () => {
        // Create a GoogleAuthProvider instance
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            setAccess_token(token);
            // The signed-in user info.
            const user = result.user;
            console.log(token, user);
        })
        .catch((error) => {
            console.error(error);
        });
    });}



  const handleSignUp = (event) => {
    // Prevent the default form submission
    event.preventDefault();
  
    // Get the values of the form inputs
    const email = email;
    const password = password;
    const access_token = access_token;
    const user_role = "user";
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
      signup_type: signup_type,
      access_token: access_token,
      user_role: user_role,
      email: email,
      password: password
    })
    .then(response => {
      // If the request is successful, store the ID token in local storage
      localStorage.setItem('id_token', response.data.id_token);
    })
    .catch(error => {
      // If there is an error, display the error message
      console.error(error.response.data.error);
    });
  }

  const checkPassword = (event) => {
    const form = document.getElementById('user_registration_form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent the form from being submitted

    if (password !== confirmPassword) {
        // display error message
        alert('Passwords do not match');
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
                        // value= {first_name}
                        placeholder="First Name"
                        />
                    </label><br />

                    <label>Last Name:<br />
                        <input
                        type="text"
                        name="last_name"
                        // value= {last_name}
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
                        // value= {tel}
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