import React from 'react'
import {Link} from 'react-router-dom'
export default function ProfileCard({  avatar_url, html_url ,repos_url , login}) {
  return (
    <div className='flex'>
      <div>
        <img src={avatar_url} />
      </div>
      <div>
        <div>
          <h3>{login}</h3>
          <a target="_blank" href={html_url}>View Profile</a>
          <Link to={`/details/${login}`}> View Repos </Link>
        </div>
      </div>
    </div>
  )
}
