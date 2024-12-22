import React from 'react'

const User = ({user}) => {
  return (
    <div className="card bg-base-300 w-1/3 shadow-xl m-2 mx-4 hover:bg-base-200">
        <div>
    <figure className="px-8 pt-8">
      <img
        src={user.photoUrl}
        alt="User Picture"
        className="rounded-full h-32" />
    </figure>
    </div>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{user.firstName + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</h2>
      <p>{user.age && user.age + " " + user.gender && user.gender} </p>
     
      <p>{user.about}</p>
      
      {/* <div className="card-actions flex">
        <button className="btn btn-error " >Ignore</button>
        <button className="btn btn-primary" >Interested</button>
      </div> */}
    </div>
  </div>
  )
}

export default User