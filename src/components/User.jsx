import React from 'react'
import {Link} from "react-router-dom"

const User = ({user}) => {
  return (
    <div className="card bg-base-300 shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
      <figure className="px-10 pt-10">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.photoUrl} alt="User" />
          </div>
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{user.firstName + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</h2>
        <p className="text-sm text-base-content/60">
          {user.age && `${user.age} years old`}
          {user.age && user.gender && ' · '}
          {user.gender}
        </p>
        <p className="my-4 text-base-content/80">{user.about}</p>
        <div className="card-actions">
          <Link to={`/chat/${user._id}`}>
            <button className="btn btn-primary">Chat</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default User