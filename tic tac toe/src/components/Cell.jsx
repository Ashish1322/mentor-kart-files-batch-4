import React from 'react'

export default function Cell({text,index,changeBoard}) {

  let temp = "cell"

  if(text == "X")
  {
    temp = "cell x"
  }
  else if (text == "O")
  {
    temp = "cell o"
  }
  
  return (
    <div onClick={() => changeBoard(index)} className={temp} >
      {text}
    </div>
  )
}
