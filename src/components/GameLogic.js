// Math Functions
const rand = (max) => parseInt(Math.random() * max); // random int between 0 and max
const mod = (num, val) => ((num % val) + val) % val; // modulus operator, what % should be.

// Game Constants
const GameSize = 15

// similar to useState => item, setItem, but getItem, setItem
// const gameVarFunc = (varName)=>[()=>{JSON.parse(sessionStorage.getItem(varName))}, (value)=>{sessionStorage.setItem(varName, JSON.stringify(value))}]
function gameVarFunc(varName) {
  function getItem() {
    try {
      return JSON.parse(sessionStorage.getItem(varName))
    } catch (error) {
      console.log(sessionStorage.getItem(varName))
    }
  }
  function setItem(value) {
    return sessionStorage.setItem(varName, JSON.stringify(value))
  }
  return [getItem, setItem]
}

// Game Vars
const [getFacing, setFacing] = gameVarFunc("snake-facing")
const [getOldHead, setOldHead] = gameVarFunc("snake-old-head")
const [getSnake, setSnake] = gameVarFunc("snake-snake")
const [getApple, setApple] = gameVarFunc("snake-apple")
const [getScore, setScore] = gameVarFunc("snake-score")
const [getGameOver, setGameOver] = gameVarFunc(true)
function setGameVars() {
  setFacing("")
  setSnake([{x:parseInt(GameSize/2), y:parseInt(GameSize/2)}])
  setApple({x:rand(GameSize), y:rand(GameSize)})
  setGameOver(false)
  setScore(0)
}
export {getSnake, getApple, getScore, getGameOver, setGameVars, getOldHead}

// change snake facing direction from keypress
// dont let snake instantly die by turning back on itself 180 degrees
function handleGameInput({code}) {
  const facing = getFacing()
  switch(code) {
    case "KeyW":
    case "ArrowUp":
      if (facing !== "down")
        setFacing("up")
      break;
    case "KeyA":
    case "ArrowLeft":
      if (facing !== "right")
        setFacing("left")
      break;
    case "KeyD":
    case "ArrowRight":
      if (facing !== "left")
        setFacing("right")
      break;
    case "KeyS":
    case "ArrowDown":
      if (facing !== "up")
        setFacing("down")
      break;
    default: break; // linter gets mad without default case
  }
}

// adds input event listener and game vars
export function initGame() {
  // set game variables to initial state
  setGameVars()
  // start snake input listening
  document.addEventListener("keydown", handleGameInput)
}
// removes input event listener
export function cleanupGame() {
  document.removeEventListener("keydown", handleGameInput)
}

export function gameStep() {
  let facing = getFacing()
  let snake = getSnake()
  let apple = getApple()
  let score = getScore()

  if (facing !== "" && !getGameOver()) {
    let oldHead = snake[snake.length-1]
    setOldHead(oldHead)
    snake[snake.length-1]["facing"] = facing
    switch (facing) {
      case "up":
        snake = [...snake, {x:mod(oldHead.x,  GameSize), y:mod(oldHead.y-1,GameSize)}]
        break;
      case "left":
        snake = [...snake, {x:mod(oldHead.x-1,GameSize), y:mod(oldHead.y,  GameSize)}]
        break;
      case "right":
        snake = [...snake, {x:mod(oldHead.x+1,GameSize), y:mod(oldHead.y,  GameSize)}]
        break;
      case "down":
        snake = [...snake, {x:mod(oldHead.x,  GameSize), y:mod(oldHead.y+1,GameSize)}]
        break;
      default: break; // linter gets mad without default case
    }
    const headPos = snake[snake.length-1]

    // check if successfully ate apple
    if (headPos.x === apple.x && headPos.y === apple.y) {
      score = score+1
      // put apple in new position
      // make sure the apple isn't overlapping snake
      let invalidApplePos = true;
      let newApplePos;
      while (invalidApplePos) {
        invalidApplePos = false
        newApplePos = {x:rand(GameSize), y:rand(GameSize)}
        // make sure snake isn't overlapping apple
        for (let i = 0; i < snake.length; i++) {
          if (snake[i].x === newApplePos.x && snake[i].y === newApplePos.y) {
            invalidApplePos = true
          }
        }
      }
      apple = newApplePos
    } else {
      // if didnt eat apple, keep length the same.
      snake = snake.slice(1)
    }
    // check for overlaps
    for (let i = 0; i < snake.length-1; i++) {
      if (headPos.x === snake[i].x && headPos.y === snake[i].y) {
        // die
        setFacing("")
        setGameOver(true)
      }
    }
  }
  setSnake(snake)
  setApple(apple)
  setScore(score)
}