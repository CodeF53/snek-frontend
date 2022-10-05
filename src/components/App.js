import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Credits from './Credits';
import Game from './Game';
import Header from './Header';
import Help from './Help';
import Leaderboard from './Leaderboard';
import LoginSignup from './LoginSignup';

function App() {
  const [isLightMode, setIsLightMode] = useState(JSON.parse(localStorage.getItem("isLightMode")))
  useEffect(() => { localStorage.setItem("isLightMode", JSON.stringify(isLightMode));
  }, [isLightMode]);
  const [userObject, setUserObject] = useState(JSON.parse(localStorage.getItem("userObject")))
  useEffect(() => { localStorage.setItem("userObject", JSON.stringify(userObject));
  }, [userObject]);

  return (
  <div className={`App ${isLightMode?"light":"dark"}`}>
    <div className="Page">
    <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode} userObject={userObject} setUserObject={setUserObject}/>
    <Routes>

      <Route path="/" element={ <Game userObject={userObject}/> }/>
      <Route path="/leaderboard" element={ <Leaderboard userObject={userObject}/> }/>
      <Route path="/credits" element={ <Credits/> }/>
      <Route path="/help" element={ <Help/> }/>

      <Route path="/login" element={ <LoginSignup isLogin={true} userObject={userObject} setUserObject={setUserObject}/> }/>
      <Route path="/signup" element={ <LoginSignup isLogin={false} userObject={userObject} setUserObject={setUserObject}/> }/>

    </Routes>
    </div>
  </div>
  );
}

export default App;
