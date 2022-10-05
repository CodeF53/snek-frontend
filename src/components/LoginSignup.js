import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginSignup({isLogin, userObject, setUserObject}) {
  const navigate =  useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorText, setErrorText] = useState("")

  // user is already logged in, shouldn't be here
  if (userObject !== null) { navigate("/") }

  function handleSubmit(event) {
    event.preventDefault()

    if (username.length===0) { setErrorText("Username must be filled"); return; }
    else if (password.length<6) { setErrorText("Password must be atleast 6 characters in length"); return; }
    else { setErrorText("") }

    fetch(`http://localhost:9292/${isLogin?"login":"signup"}`,{
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(r=>r.json()).then((data)=>{
      if (data["error"]) {
        setErrorText(data["error"])
      } else {
        // save user details
        setUserObject({ username: username, session_cookie: data["session_cookie"] })
        // send user back to home
        navigate("/")
      }
    })
  }

  let errorNode = errorText.length===0? null: (<span style={{color:"red"}}>{errorText}</span>)

  return (
    <div className="col">
      <form onSubmit={handleSubmit} className="centered panel col" id="log-form">
        <h1>{isLogin? "Log In": "Sign Up"}</h1>
        <input onChange={(e)=>{setUsername(e.target.value)}} value={username} placeholder="username" type="text"></input>
        <input onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder="password" type="password"></input>
        <button type="submit">{isLogin?"Log In":"Sign Up"}</button>
        {errorNode}
        <span>{isLogin? "New to snek?":"Already a snek?"} <Link to={isLogin? "/signup":"/login"}>{isLogin? "Sign Up":"Log In"}</Link></span>
      </form>
    </div>
  )
}
export default LoginSignup