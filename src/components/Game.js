import { useCallback, useEffect, useState } from "react"
import { cleanupGame, gameStep, initGame } from "./GameLogic"
import { getSnake, getApple, getScore, getGameOver, setGameVars, getOldHead } from "./GameLogic"

//TODO: adjust so it is completely dynamic
const GameScreenSize = "50rem"
const GameSize = 15
const remToPx = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
const gUnit = (num) => (remToPx(50)/GameSize)*num
const sgUnit = (snakePart) => `${gUnit(snakePart.x+0.5)},${gUnit(snakePart.y+0.5)}`


function Game({userObject}) {
  const [update, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // hook for starting game and removing event listener when done
  useEffect(() => { initGame()
    return () => { cleanupGame() }
  }, [])
  // game clock
  useEffect(() => {
    const gameTimeoutID = setTimeout(()=>{ forceUpdate(); gameStep() }, 200)
    return () => { clearTimeout(gameTimeoutID) }
  }, [update, forceUpdate])

  // game renderer
  let snake = getSnake()
  const apple = getApple()
  const score = getScore()
  let gameNode
  if (snake!==null){
    // make svg paths connecting each segment of snake
    let snakeBodyPaths = []
    for (let i = 0; i<snake.length-1; i++) {
      let a = snake[i]
      let b = snake[i+1]
      // start at point A
      let path = `M${sgUnit(a)}`
      if (Math.abs(a.x-b.x) <= 1 && Math.abs(a.y-b.y) <= 1) {
        path += ` L${sgUnit(b)}` // if points are close enough together, draw a line between them
      } else {
        path += ` M${sgUnit(b)}` // if they are far apart (snake just wrapped around arena), dont
      }

      snakeBodyPaths.push((
        <path className="snake-segment" key={i} d={path} strokeWidth={gUnit((i/snake.length)/2+.5)+"px"}/>
      ))
    }

    const snakeBody = <svg className="snakevg"> {snakeBodyPaths} </svg>

    const head = snake[snake.length-1]
    const shouldHeadLerp = Math.abs(head.x-getOldHead().x) <= 1 && Math.abs(head.y-getOldHead().y) <= 1

    gameNode = <div className="game" style={{width:GameScreenSize, height:GameScreenSize}}>
      <div className="snaketile" style={{width:gUnit(1), height:gUnit(1), top:gUnit(apple.y), left:gUnit(apple.x)}}>
        <div className="apple" style={{fontSize:gUnit(1.25),marginTop:gUnit(-0.25),marginLeft:gUnit(-0.125)}}>
          {Boolean(Math.round((apple.x+apple.y)%2))? "🍎":"🍏"}
        </div>
      </div>
      <div className={`snaketile snakehead ${shouldHeadLerp?"snakeheadlerp":""}`}
        style={{width:gUnit(1), height:gUnit(1), top:gUnit(snake[snake.length-1].y), left:gUnit(snake[snake.length-1].x)}}
      />
      {snakeBody}
    </div>
  }

  let gameOverNode = ( <div></div> )
  if (getGameOver()) {
    gameOverNode = (
      <div style={{top:0,left:0,bottom:0,right:0, position:"absolute"}} className="col">
        <div id="game-over" className="panel col">
          <h1 className="centered">gam ova!</h1>
          <span><strong>score: </strong>{score}</span>

          <button onClick={setGameVars}>plai agan</button>
        </div>
      </div>
    )
  }

  return (
    <div className="col">
      <div className="panel centered" style={{width:"fit-content", position:"relative"}}>
        {gameNode}

        {gameOverNode}
      </div>
    </div>
  )
}
export default Game