import React from 'react'
import MovieCard from './MovieCard'

import Slider from 'react-slick'



export default function Home({movies,series,loading}) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,
    centerPadding: "60px",
  };


  return (
    <div className='main' >
    <h1 style={{color:"white",textAlign:"center"}}>Movies</h1>
    {
      loading == true ? <h1 style={{color:"white"}}>Please Wait we are fetching movies....</h1>
      : 
      <Slider {...settings}>
      {movies.map( (item,index) => <MovieCard imdbID={item.imdbID} image={item.Poster} title={item.Title} year={item.Year} />)}
      </Slider>
    }
   
   
    <h1 style={{color:"white",textAlign:"center"}}>Web Series</h1>

    {
      loading == true ? <h1 style={{color:"white"}}>Please Wait we are fetching Web Series....</h1>
      : 
      <Slider {...settings}>
      {series.map( (item,index) => <MovieCard  imdbID={item.imdbID} image={item.Poster} title={item.Title} year={item.Year} />)}
    </Slider>
    
    }
    


    </div>
  )
}
