import React from 'react'
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
 <div className="card w-96 rounded-3xl border border-base-300/70 bg-base-100/85 shadow-2xl backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
  <figure className="px-8 pt-8">
    <img
      src={user.photoUrl}
      alt="User Picture"
      className="h-64 w-full rounded-2xl object-cover" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl">{user.firstName + " " + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</h2>
    <p className="text-base-content/70">{user.age && `${user.age} years old`}{user.age && user.gender && ' · '}{user.gender}</p>
   
    <p className="text-base-content/80">{user.about}</p>
    <br />
    <div className="card-actions flex gap-3">
      <button className="btn btn-error btn-outline rounded-full px-6" onClick={()=>handleSendReq("ignored" , user._id)}>Ignore</button>
      <button className="btn btn-primary rounded-full px-6" onClick={()=>handleSendReq("interested" , user._id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard