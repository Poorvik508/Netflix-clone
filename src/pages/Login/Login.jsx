import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from "../../firebase"
import netflix_spinner from "../../assets/netflix_spinner.gif"
const Login = () => {
  
  const [signState, setsignState] = useState("Sign In")
  const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const [password, setpassword] = useState("")
  const [loding,setloding]=useState(false)
  const user_auth = async (event) => {
    event.preventDefault()
    setloding(true);
    if (signState === "Sign In")
    {
      await login(email, password);
    }
    else {
      await signup(name, email, password);
    }
    setloding(false);
  }
  return (
    loding ?<div className="login-spinner">
        <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? (
            <input type="text" placeholder="Your Name" value={name} onChange={(e)=>{setname(e.target.value)}} />
          ) : (
            <></>
          )}

          <input type="email" placeholder="Emial" value={email} onChange={(e)=>{setemail(e.target.value)}} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
          <button onClick={user_auth} type="submit">{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?
              <span
                onClick={() => {
                  setsignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account?
              <span
                onClick={() => {
                  setsignState("Sign In");
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login
