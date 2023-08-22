import React from 'react'
import {useParams} from "react-router-dom"

export default function MovieDetail() {

  let {id} = useParams()

  return (
    <div className='detail'>MovieDetail {id} </div>
  )
}
