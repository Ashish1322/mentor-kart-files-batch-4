import React, {useContext} from 'react'
import ProfileCard from './ProfileCard'
import GitContext from '../GitContext'
import { useState } from 'react'
export default function Home() {

    const [queyr,setQuery] = useState("")
    const {fetchProfile,profiles} = useContext(GitContext)

    // avatar_url html_url repos_url login
  return (
    <div>
        <input onChange={e =>  setQuery(e.currentTarget.value)} className='input' type="text" placeholder="Search using email or gitgub id" />

        <button onClick={() => fetchProfile(queyr)}> Search Profile</button>

        {
          profiles.length == 0 ? <h1>No Results to show !</h1> : null
        }

        {
            profiles.map((item,index) => <ProfileCard 
                                            avatar_url={item.avatar_url}  
                                            html_url={item.html_url}
                                            repos_url={item.repos_url}
                                            login={item.login}
                                            key={index} />)
        }


    </div>
  )
}
