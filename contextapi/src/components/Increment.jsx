import React, {useContext} from 'react'
import CountContext from '../CountContext'
export default function Increment() {

  const {increment} = useContext(CountContext)
  
  return (
    <button onClick={increment}>+</button>
  )
}
