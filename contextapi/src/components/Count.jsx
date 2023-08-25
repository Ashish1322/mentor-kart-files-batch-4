import React, {useContext} from 'react'
import Increment from './Increment'
import Decrement from './Decrement'
import CountContext from '../CountContext'

export default function Count() {

    const {count} = useContext(CountContext)

  return (
    <div>
        <h1>Count is {count}</h1>
        <Increment />
        <Decrement />
    </div>
  )
}
