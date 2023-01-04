import react, { useState } from "React";
import axios from 'axios';
import NavBar from "../NavBar";
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
      axios.post('/users', {
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
      <section id="form-container">
        <form>
          <label> First Name: <br />
            <input
              type="text"
              required
              value={first_name}
              onChange={e => setFirst_name(e.target.value)}
              name="first_name"
              placeholder="First Name"/>
          </label> <br />
          
          <label> Last Name: <br />
            <input
              type="text"
              required
              value={last_name}
              onChange={e => setLast_name(e.target.value)}
              name="last_name"
              placeholder="Last Name"/>
          </label> <br />

          <label> Email Address: <br />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              name="email"
              palceholder="Email Address"/>
          </label> <br />          

          <label> Password: <br />
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              name="pword"
              palceholder="Password"/>
          </label> <br />          

          <label> Confirm Password: <br />
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              palceholder="Confirm Password"/>
          </label> <br />

          <label> Mobile Number: <br />
            <input
              type="text"
              required
              value={tel}
              onChange={e => setTel(e.target.value)}
              name="tel"
              palceholder="Mobile Number"/>
          </label> <br />

         <input type="submit" value="Register" onClick={handleSignup}/>
         <p>Already have an account? Click <Link to="/login">here</Link> to login.</p>
          
        </form>

      </section>
    )
}
export default NewUser;