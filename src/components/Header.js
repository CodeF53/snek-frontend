import lightModeIcon from "../assets/sun.svg"
import darkModeIcon from "../assets/moon.svg"
import { Link, useNavigate } from "react-router-dom";

function Header({isLightMode,setIsLightMode}) {
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

      {/* TODO: user login stuff, if they are logged in, show pfp and log out */}
      <Link to="/signup"><button>Sign Up</button></Link>
      <Link to="/login"><button>Log In</button></Link>
    </header>
  )
}

export default Header