import React from 'react'

export default function MovieCard({image,title,year}) {
  return (
    <div>
         <img  src={image}/>
        <h3>{title}</h3>
        <p>Year: {year}</p>
      
    </div>
  )
}
