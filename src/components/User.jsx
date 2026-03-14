import React from 'react'
import {Link} from "react-router-dom"

const User = ({user}) => {
  return (
    <div className="card rounded-3xl border border-base-300/70 bg-base-100/85 shadow-2xl backdrop-blur-xl transition-transform transform hover:-translate-y-2 duration-300">
      <figure className="px-8 pt-8">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary/70 ring-offset-base-200 ring-offset-2">
            <img src={user.photoUrl} alt="User" />
          </div>
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-xl">{user.firstName + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</h2>
        <p className="text-sm text-base-content/60">
          {user.age && `${user.age} years old`}
          {user.age && user.gender && ' · '}
          {user.gender}
        </p>
        <p className="my-4 text-base-content/80">{user.about}</p>
        <div className="card-actions">
          <Link to={`/chat/${user._id}`}>
            <button className="btn btn-primary rounded-full px-6">Chat</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default User