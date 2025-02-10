import React from 'react'
import {Link} from "react-router-dom"

const User = ({user}) => {
  return (
    <div className="card bg-base-300 w-[250px] h-5/6  shadow-xl m-2 mx-4 hover:bg-base-200 ">
        <div>
    <figure className="px-8 pt-8">
      <img
        src={user.photoUrl}
        alt="User Picture"
        className="rounded-full h-32 w-full" />
    </figure>
    </div>
    <div className="flex-col card-body items-center text-center w-full">
      <h2 className="card-title">{user.firstName + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</h2>
      <p className='w-full'>{user.age && user.age + " " + user.gender && user.gender} </p>
     
      <p>{user.about}</p>
      <div>
        <Link to={`/chat/${user._id}`}> 
        <button className="bg-purple-500 text-white p-2 px-5 rounded-lg hover:bg-violet-600">Chat</button>
        </Link>
        </div>
      {/* <div className="card-actions flex">
        <button className="btn btn-error " >Ignore</button>
        <button className="btn btn-primary" >Interested</button>
      </div> */}
    </div>
  </div>
  )
}

export default User