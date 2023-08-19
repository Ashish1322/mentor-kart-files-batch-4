import { useState , useEffect} from 'react'

import Cell from './components/Cell'

import './App.css'

function App() {

  const[board,setBoard] = useState(['-','-','-','-','-','-','-','-','-'])
  const [turn, setTurn] = useState("X")
  const [won,setWon] = useState("")
  
  useEffect(() => {
     // flip turn
     flipTurn()
     // after flipping turn check if anyone is winning the game or not
     let xwins = checkWins("X")
     let owins = checkWins("O")
     if(xwins)
     {
       setWon("X")
       return;
     }
 
     if(owins)
     {
       setWon("O")
       return
     }
 
     // check for draws
     let count = 0
     for(let i = 0 ; i < board.length ; i++)
     {
       if(board[i] == '-')
         {
           count += 1
         }
     }
     if(count==0)
     {
       setWon("Draw")
       return
     }

  },
  [board])


  const flipTurn = () => {
    if(turn == "X")
      setTurn("O")
    else
      setTurn("X")
  }

  const changeBoard = (index) => {
    
    if(won != "")
      return

    if(board[index] != '-')
    {
      alert("Don't Cheat")
      return
    }

    var temp = [...board]
    temp[index] = turn
    setBoard(temp)

  }


  function checkWins(player)
  {
      // 1st row
      if(board[0] == player && board[1] == player && board[2]==player)
      {
          return true
      }
      // 2nd row
      if(board[3] == player && board[4] == player && board[5]==player)
      {
          return true
      }
      // 3rd row
      if(board[6] == player && board[7] == player && board[8]==player)
      {
          return true
      }
      // 1 col
      if(board[0] == player && board[3] == player && board[6]==player)
      {
          return true
      }
      // 2col
      if(board[1] == player && board[4] == player && board[7]==player)
      {
          return true
      }
      // 3 col
      if(board[2] == player && board[5] == player && board[8]==player)
      {
          return true
      }
      // 1 diag
      if(board[0] == player && board[4] == player && board[8]==player)
      {
          return true
      }
      
      // 2 diag
      if(board[2] == player && board[4] == player && board[6]==player)
      {
          return true
      }

      return false

  }

  function reset()
  {
    setBoard(['-','-','-','-','-','-','-','-','-'])
    setTurn("X")
    setWon("")
  }

  return (
   <div className='board'>
 
      {
        won == "Draw" ? <h3>Game is Draw</h3> :  <h3> winner is : {won} </h3>
      }
    
      {
        won != "" ?  <button onClick={reset}>Reset</button> : null
      }
     

      <div className="row">
        <Cell text={board[0]} index = {0}  changeBoard={changeBoard} />
        <Cell text={board[1]} index = {1} changeBoard={changeBoard} />
        <Cell text={board[2]} index= {2} changeBoard={changeBoard} />
      </div>
      <div className="row">
      <Cell text={board[3]} index = {3}  changeBoard={changeBoard} />
      <Cell text={board[4]} index = {4}  changeBoard={changeBoard} />
      <Cell text={board[5]} index = {5}  changeBoard={changeBoard} />
      </div>
      <div className="row">
      <Cell text={board[6]} index = {6}  changeBoard={changeBoard} />
      <Cell text={board[7]} index = {7}  changeBoard={changeBoard} />
      <Cell text={board[8]} index = {8}  changeBoard={changeBoard} />
      </div>
   </div>
  )
}

export default App
