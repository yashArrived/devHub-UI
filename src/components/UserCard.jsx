import React, { useState } from 'react'

const UserCard = ({user}) => {
    // console.log(feed);
    // const [index , setIndex] = useState(0)
    
    // const {firstName , lastName , skills, photoUrl,age,gender,about} = user;
    // console.log(props);
    // const handleClick =()=>{
    //     setIndex(index+1)
    // }
  return (
 <div className="card bg-base-300 w-96 shadow-xl ">
  <figure className="px-10 pt-10">
    <img
      src={user.photoUrl}
      alt="User Picture"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{user.firstName + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</h2>
    <p>{user.age && user.age + " " + user.gender && user.gender} </p>
   
    <p>{user.about}</p>
    <br />
    <div className="card-actions flex">
      <button className="btn btn-error " >Ignore</button>
      <button className="btn btn-primary" >Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard