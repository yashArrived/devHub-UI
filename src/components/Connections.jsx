import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import User from './User';
import { Link } from 'react-router-dom';

const Connections = () => {
const dispatch = useDispatch();
const connections = useSelector((store)=>store.connections)
const fetchConnections = async() => {


    try {
        const res = await axios.get(BASE_URL + "/user/connections",{withCredentials:true});
           dispatch(addConnections(res.data.data));
           
            console.log(connections);
            
            
    } catch (error) {
        console.log(error);
        
    }
}

useEffect(()=>{
fetchConnections()
},[])
if(!connections) return;
if(connections.length === 0 ) {
  return  (
    <div className='flex justify-center items-center text-center' style={{minHeight: 'calc(100vh - 200px)'}}>
      <div className='bg-base-200 p-10 rounded-xl shadow-lg'>
        <h2 className='text-3xl font-bold mb-2'>No Connections Yet</h2>
        <p className='text-base-content opacity-60'>
          Don't be an introvert! Make some connections right away: 
          <Link to="/" className='link text-cyan-300 ml-2'>Explore</Link>
        </p>
      </div>
    </div>
  )
}
  return (
    <div className='container mx-auto p-4 md:p-8'>
      <h1 className='text-3xl font-bold text-center mb-12'>Your Connections</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {connections.map((connection) => (
          <div key={connection._id}>
            <User user={connection} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Connections