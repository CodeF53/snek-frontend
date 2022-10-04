import { useState } from 'react';
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

  return (
  <div className={`App ${isLightMode?"light":"dark"}`}>
    <div className="Page">
    <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode}/>
    <Routes>

      <Route path="/" element={ <Game/> }/>
      <Route path="/leaderboard" element={ <Leaderboard/> }/>
      <Route path="/credits" element={ <Credits/> }/>
      <Route path="/help" element={ <Help/> }/>

      <Route path="/login" element={ <LoginSignup isLogin={true}/> }/>
      <Route path="/signup" element={ <LoginSignup isLogin={false}/> }/>

    </Routes>
    </div>
  </div>
  );
}

export default App;
