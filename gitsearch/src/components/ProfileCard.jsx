import React from 'react'

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
          <a target="_blank" href={repos_url}> View Repos </a>
        </div>
      </div>
    </div>
  )
}
