import { useCallback, useEffect, useState } from "react"
import { cleanupGame, gameStep, initGame } from "./GameLogic"
import { getSnake, getApple, getScore } from "./GameLogic"

//TODO: adjust so it is completely dynamic
const GameScreenSize = "50rem"
const GameSize = 15
const remToPx = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
const gUnit = (num) => (remToPx(50)/GameSize)*num
const sgUnit = (snakePart) => `${gUnit(snakePart.x+0.5)},${gUnit(snakePart.y+0.5)}`


function Game() {
    const [update, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        initGame()
        return () => {
            cleanupGame()
        }
    }, [])

    useEffect(() => {
        const gameTimeoutID = setTimeout(()=>{ forceUpdate(); gameStep() }, 200)
        return () => {
            clearTimeout(gameTimeoutID)
        }
    }, [update, forceUpdate])

    let snake = getSnake()
    const apple = getApple()
    const score = getScore()

    let gameNode
    if (snake!==null){
        snake.unshift(snake[0])
        snake.push(snake[snake.length-1])

        let snakeBodyPaths = []
        for (let i = 0; i<snake.length-1; i++) {
            let a = snake[i]
            let b = snake[i+1]
            let width = gUnit((i/snake.length)/2+.5)+"px"
            // start at point A
            let path = `M${sgUnit(a)}`
            if (Math.abs(a.x-b.x) <= 1 && Math.abs(a.y-b.y) <= 1) {
                path += ` L${sgUnit(b)}` // if points are close enough together, draw a line between them
            } else {
                path += ` M${sgUnit(b)}` // if they are far apart (snake just wrapped around arena), dont
            }

            snakeBodyPaths.push((
                <path className="snake-segment" key={i} d={path} strokeWidth={width}/>
            ))
        }

        const snakeBody = (<svg className="snakevg">
            {snakeBodyPaths}
        </svg>)

        gameNode = (
            <div className="game" style={{width:GameScreenSize, height:GameScreenSize}}>
                <div className="snaketile" style={{width:gUnit(1), height:gUnit(1), top:gUnit(apple.y), left:gUnit(apple.x)}}>
                    <div className="apple" style={{fontSize:gUnit(1.25),marginTop:gUnit(-0.25),marginLeft:gUnit(-0.125)}}>
                        {Boolean(Math.round((apple.x+apple.y)%2))? "🍎":"🍏"}
                    </div>
                </div>
                <div className="snaketile snakehead"
                    style={{width:gUnit(1), height:gUnit(1), top:gUnit(snake[snake.length-1].y), left:gUnit(snake[snake.length-1].x)}}
                />
                {snakeBody}
            </div>
        )
    }
    return (
        <div className="panel" style={{width:"fit-content"}}>
            {gameNode}
        </div>
    )
}
export default Game