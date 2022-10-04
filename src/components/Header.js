import lightModeIcon from "../assets/sun.svg"
import darkModeIcon from "../assets/moon.svg"

function Header({isLightMode,setIsLightMode}) {
  return (
    <header className="row panel">
      <strong className="centered">snek</strong>

      <a className="centered" href="/"><button>plai</button></a>
      <a className="centered" href="/leaderboard"><button>bord</button></a>
      <a className="centered" href="/credits"><button>cred</button></a>
      <a className="centered" href="/help"><button>halp</button></a>

      <div className="spacer"/>

      <button className="centered" onClick={()=>{setIsLightMode(!isLightMode)}} title="Switch Theme">
        <img src={isLightMode? darkModeIcon : lightModeIcon} alt={isLightMode? "a moon" : "a sun"}></img>
      </button>

      {/* TODO: user login stuff, if they are logged in, show pfp and log out */}
      <a className="centered" href="/login"><button>login</button></a>
    </header>
  )
}

export default Header