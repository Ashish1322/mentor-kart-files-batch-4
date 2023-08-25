import React, {useContext} from 'react'
import CountContext from '../CountContext'

export default function Decrement() {

  const {decrement} = useContext(CountContext)
  return (
    <button onClick={decrement}>-</button>
  )
}
