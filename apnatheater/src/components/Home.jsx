import React from 'react'
import MovieCard from './MovieCard'

export default function Home({movies}) {


  return (
    <div>
    {movies.map( (item,index) => <MovieCard image={item.Poster} title={item.Title} year={item.Year} />)}
    </div>
  )
}
