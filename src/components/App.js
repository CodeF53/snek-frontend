import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import Credits from './Credits';
import Game from './Game';
import Header from './Header';
import Help from './Help';
import Leaderboard from './Leaderboard';
import Login from './Login';

function App() {
  const [isLightMode, setIsLightMode] = useState(JSON.parse(localStorage.getItem("isLightMode")))

  return (
    <div className={`App ${isLightMode?"light":"dark"}`}>
      <div className="Page">
        <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode}/>
        <Router><Routes>

          <Route path="/" element={ <Game/> }/>
          <Route path="/leaderboard" element={ <Leaderboard/> }/>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/credits" element={ <Credits/> }/>
          <Route path="/help" element={ <Help/> }/>

        </Routes></Router>
      </div>
    </div>
  );
}

export default App;
