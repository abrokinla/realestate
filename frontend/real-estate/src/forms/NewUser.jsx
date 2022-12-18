import react, { useState } from "React";
import {auth} from '../services/firebase'
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {useAuthValue} from './AuthContext'

const NewUser = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {setTimeActive} = useAuthValue()

    const validatePassword = () => {
        let isValid = true
        if (pword !== '' && confirmPassword !== ''){
          if (pword !== confirmPassword) {
            isValid = false
            setError('Passwords does not match')
          }
        }
        return isValid
      }

      const register = e => {
        e.preventDefault()
        setError('')
        if(validatePassword()) {
          // Create a new user with email and password using firebase
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              sendEmailVerification(auth.currentUser)   
              .then(() => {
                setTimeActive(true)
                navigate('/verify-email')
              }).catch((err) => alert(err.message))
            })
            .catch(err => setError(err.message))
        }
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }

    return (
        <>
            <h1>Register New User</h1>
                {error && <section className='auth__error'>{error}
            </section>}

            <form onSubmit={register} name="User_registration_form">
                <label>First Name:
                    <input
                    type="text"
                    name="first_name"
                    value= {first_name}
                    placeholder="First Name"
                    />
                </label>

                <label>Last Name:
                    <input
                    type="text"
                    name="last_name"
                    value= {last_name}
                    placeholder="Last Name"
                    />
                </label>

                <label>Email:
                    <input
                    type="email"
                    name="email"
                    value= {email}
                    placeholder="Enter Email Address"
                    required
                    onChange={e => setEmail(e.target.value)}
                    />
                </label>

                <label>Password:
                    <input
                    type="password"
                    name="pword"
                    value= {pword}
                    required
                    onChange={e => setPassword(e.target.value)}
                    />
                </label>

                <label>Verify Password:
                    <input
                    type="password"
                    name="pword"
                    value= {confirmPassword}
                    required
                    onChange={e => setConfirmPassword(e.target.value)}
                    />
                </label>

                <label>Mobile Number:
                    <input
                    type="tel"
                    name="tel"
                    value= {tel}
                    />
                </label>

                 <button type='submit'>Register</button>
            </form>
            <span>
                Already have an account?  
                <Link to='/login'>login</Link>
            </span>
        </>
    )
}
export default NewUser;