import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import About from './components/About'
import MovieDetail from './components/MovieDetail'

import { Routes , Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect } from 'react'

// 5941fb3

function App() {

  const [movies,setMovies] = useState([])

  // This function will search for all the movies including given keyword in theri name and 
  // store them in movies state
  const fetchMovies = (keyword) => {
    fetch(`https://www.omdbapi.com/?apikey=5941fb3&s=${keyword}`)
    .then( res =>  res.json())
    .then (data => setMovies(data.Search))
    .catch(err => alert("Something Went Wrong !"))
  }


  useEffect(() => {
    fetchMovies("harry")
  },
  [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home movies={movies} />} />
        <Route path='/about' element={ <About />} />
        <Route path='/movie-details' element={<MovieDetail />} />
      </Routes>
    </div>
    
  )
}

export default App
