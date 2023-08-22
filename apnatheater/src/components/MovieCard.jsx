import React from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard({image,title,year,imdbID}) {
  return (
    <Link to={`/movie-details/${imdbID}`}>
      <div className='card'>
          
          <img  src={image}/>
          <h3>{title}</h3>
          <p> {year}</p>
        
      </div>
    </Link>
  )
}
