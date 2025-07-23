import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';

import { addRequests, removeRequests } from '../utils/requestSlice';

const Connections = () => {
const dispatch = useDispatch();
const requests = useSelector((store)=>store.requests);


const fetchRequests = async() => {


    try {
        const res = await axios.get(BASE_URL + "/user/requests/recieved",{withCredentials:true});
           dispatch(addRequests(res.data.data));
           
           
            console.log(res.data.data);
            
            
    } catch (error) {
        console.log(error);
        
    }
}
const reqReview = async(status,_id)=>{
      const res = axios.post(BASE_URL + "/request/review/"+status + "/" + _id , {},{withCredentials:true});
        dispatch(removeRequests(_id));
}
useEffect(()=>{
  fetchRequests()
},[])
if(!requests) return;
if(requests.length === 0 ) {
  return  (
    <div className='flex justify-center items-center text-center' style={{minHeight: 'calc(100vh - 200px)'}}>
      <div className='bg-base-200 p-10 rounded-xl shadow-lg'>
        <h2 className='text-3xl font-bold mb-2'>No Connection Requests</h2>
        <p className='text-base-content opacity-60'>When someone sends you a request, it will appear here.</p>
      </div>
    </div>
  )
}
  return (
    <div className='container mx-auto p-4 md:p-8'>
      <h1 className='text-3xl font-bold text-center mb-12'>Connection Requests</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {requests.map((req)=>{
            return (
              <div key={req._id} className="card bg-base-300 shadow-2xl transition-transform transform hover:-translate-y-2 duration-300">
                <figure className="px-10 pt-10">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={req.fromUserId.photoUrl} alt="User" />
                    </div>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{req.fromUserId.firstName + " " + req.fromUserId.lastName.charAt(0).toUpperCase() + req.fromUserId.lastName.slice(1)}</h2>
                  <p className="text-sm text-base-content/60">
                    {req.fromUserId.age && `${req.fromUserId.age} years old`}
                    {req.fromUserId.age && req.fromUserId.gender && ' · '}
                    {req.fromUserId.gender}
                  </p>
                  <p className="my-4 text-base-content/80">{req.fromUserId.about}</p>
                  <div className="card-actions">
                    <button className="btn btn-error btn-outline" onClick={()=>reqReview("rejected" , req._id)} >Reject</button>
                    <button className="btn btn-primary" onClick={()=>reqReview("accepted" , req._id)}>Accept</button>
                  </div>
                </div>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default Connections