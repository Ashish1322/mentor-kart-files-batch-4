import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import GitContext from './GitContext'
import {Route,Routes} from "react-router-dom"

import ProfileDetails from './components/ProfileDetails'

function App() {

  const [profiles,setProfiles] = useState([])

  const fetchProfile = (query) => {

    fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(data => setProfiles(data.items))

  }

  console.log(profiles)

  return (
    <GitContext.Provider value={{fetchProfile,profiles}}>
      
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/details' element={<ProfileDetails />} />

    </Routes>
    </GitContext.Provider>
  )
}

export default App
