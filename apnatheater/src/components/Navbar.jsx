import React , {useState} from 'react'
import {Link} from "react-router-dom"
export default function Navbar({fetchMovies,fetchSeries}) {

  const [keyword,setKeyword] = useState("")

  return (
    <nav className='nav'>
        <h3>ApnaTheater</h3>

          <div className='nav-right'>
          <Link className='link' to="/">Home</Link>
          <Link className='link' to="/about">About</Link>
          <input onChange={e => setKeyword(e.currentTarget.value) } type="text" placeholder='Search a Movie' />
          <button onClick={() => {
            fetchMovies(keyword)
            fetchSeries(keyword)
          }}> Search </button>
          </div>
    </nav>
  )
}
