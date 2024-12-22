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
  return  (<div className='flex justify-center mt-10 text-center items-center'>
  <h1 className='w-1/3 bg-base-300 p-5 rounded-md  hover:bg-base-200'>You do not have any requests</h1>
  </div>)
}
  return (
    <>
    <div className=' justify-center my-10 text-center'>
        <h1 className='text-2xl text-bold '>Connection Requests</h1>
      
        
        {requests.map((req,index)=>{
            
            return (<div className='flex  mt-5 m-3'>
                 <div className="card bg-base-300 w-1/3 shadow-xl m-2 mx-4 hover:bg-base-200">
        <div>
    <figure className="px-8 pt-8">
      <img
        src={req.fromUserId.photoUrl}
        alt="User Picture"
        className="rounded-full h-32" />
    </figure>
    </div>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{req.fromUserId.firstName + " " + req.fromUserId.lastName.charAt(0).toUpperCase() + req.fromUserId.lastName.slice(1)}</h2>
      <p>{req.fromUserId.age && req.fromUserId.age + " " + req.fromUserId.gender && user.gender} </p>
     
      <p>{req.fromUserId.about}</p>
      
      <div className="card-actions flex">
        <button className="btn btn-error " onClick={()=>reqReview("rejected" , req._id)} >Reject</button>
        <button className="btn btn-primary" onClick={()=>reqReview("accepted" , req._id)}>Accept</button>
      </div>
    </div>
  </div>
                
            </div>)
        })}
    </div>
    <div>
        
        </div>
 
    </>
  )
}

export default Connections