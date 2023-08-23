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
  const [series,setSeries] = useState([])

  const [loading,setLoading] = useState(false)

  // This function will search for all the movies including given keyword in theri name and 
  // store them in movies state

  const fetchMovies = (keyword) => {

    setLoading(true)
    fetch(`https://www.omdbapi.com/?apikey=5941fb3&s=${keyword}`)
    .then( res =>  res.json())
    .then (data => 
      { setMovies(data.Search)
        setLoading(false)
      }
    )
    .catch(err => {alert("Something Went Wrong !"); setLoading(false)})

   
  }


  const fetchSeries = (keyword) => {
    setLoading(true)
    fetch(`https://www.omdbapi.com/?apikey=5941fb3&s=${keyword}&type=series`)
    .then( res =>  res.json())
    .then (data => {setSeries(data.Search); setLoading(false)})
    .catch(err => 
      {alert("Something Went Wrong !"); setLoading(false)})
  }

  useEffect(() => {
    fetchMovies("harry")
    fetchSeries("one")
  },
  [])


  console.log(movies)
  return (
    <div>
      <Navbar fetchSeries={fetchSeries} fetchMovies={fetchMovies}/>
      <Routes>
        <Route path='/' element={<Home loading={loading} series={series} movies={movies} />} />
        <Route path='/about' element={ <About />} />
        <Route path='/movie-details/:id' element={<MovieDetail />} />
      </Routes>
    </div>
    
  )
}

export default App
