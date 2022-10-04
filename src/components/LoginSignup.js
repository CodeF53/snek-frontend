import { Link, useNavigate } from "react-router-dom";

function LoginSignup({isLogin}) {
  const navigate =  useNavigate()

  return (
    <div className="col">
      <forum className="centered panel col" id="log-form">
        <h1>{isLogin? "Log In": "Sign Up"}</h1>
        <input placeholder="username" type="text"></input>
        <input placeholder="password" type="password"></input>
        <button type="submit">{isLogin?"Log In":"Sign Up"}</button>
        <span>{isLogin? "New to snek?":"Already a snek?"} <Link to={isLogin? "/signup":"/login"}>{isLogin? "Sign Up":"Log In"}</Link></span>
      </forum>
    </div>
  )
}
export default LoginSignup