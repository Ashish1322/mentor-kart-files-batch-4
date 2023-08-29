import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
export default function ProfileDetails() {

  const {gitid} = useParams()

  const [repos,setRepos] = useState([])

  const fetchDetails = () => {
    fetch(`https://api.github.com/users/${gitid}/repos`)
    .then(res => res.json())
    .then(data => setRepos(data))
  }

  useEffect(() => {
    fetchDetails()
  },
  [])

  console.log(repos)

  return (
    <div>
      <h3>Showing the Repos of {gitid}</h3>


     { repos.length == 0 ? <p>No Repos Found !</p> : null}
      <div style={{display:"flex","gap":"10px",justifyContent:"center",
      "flexWrap":"wrap"}}>
      {
        repos.map( (item,index) =>   <div style={{border:"1px solid black",padding:"20px"}}>
                                      <p><b>{item.full_name}</b></p>
                                      <p> <span>{item.created_at}</span> <span>{item.language}</span> </p>
                                      <a target="_blank"  href={item.html_url}>Git Hub</a>
                                    </div>
      )
      }
      </div>
     
    </div>
  )
}
