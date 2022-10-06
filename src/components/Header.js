import lightModeIcon from "../assets/sun.svg"
import darkModeIcon from "../assets/moon.svg"
import { Link } from "react-router-dom";

function Header({isLightMode,setIsLightMode, userObject, setUserObject}) {
  let userarea = (
    <div className="userArea row">
      <Link to="/signup"><button>Sign Up</button></Link>
      <Link to="/login"><button>Log In</button></Link>
    </div>
  )

  if (userObject !== null) {
    userarea = (
      <div className="userArea row">
        <button onClick={()=>{setUserObject(null)}}>Sign Out</button>
      </div>
    )
  }

  return (
    <header className="row panel">
      <strong className="centered">snek</strong>

      <Link to="/"><button>plai</button></Link>
      <Link to="/leaderboard"><button>bord</button></Link>
      <Link to="/credits"><button>cred</button></Link>
      <Link to="/help"><button>halp</button></Link>

      <div className="spacer"/>

      <button onClick={()=>{setIsLightMode(!isLightMode)}} title="Switch Theme">
        <img src={isLightMode? darkModeIcon : lightModeIcon} alt={isLightMode? "a moon" : "a sun"}></img>
      </button>

      {userarea}
    </header>
  )
}

export default Header