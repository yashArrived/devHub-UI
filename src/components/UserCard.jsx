import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';

const UserCard = ({user}) => {
    
    const dispatch = useDispatch();
    const handleSendReq = async (status,toUserId)=> {
      try {
        const res = await axios.post(BASE_URL + "/request/send/" +status + "/" +toUserId , {} , {withCredentials : true} )

          dispatch(removeUserFromFeed(toUserId))


      } catch (err) {
        
      }
    }
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
      <button className="btn btn-error " onClick={()=>handleSendReq("ignored" , user._id)}>Ignore</button>
      <button className="btn btn-primary" onClick={()=>handleSendReq("interested" , user._id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard