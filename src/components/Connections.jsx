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
if(connections.length === 0 ) {return  (<div className='flex justify-center mt-10 text-center items-center'>
    <h1 className='w-1/3 bg-base-300 p-5 rounded-md  hover:bg-base-200'>You do not have any connection. Don't be an introvert, Make some connections right away :  <Link to="/" className='link text-cyan-300'>Explore?</Link></h1>
    </div>)}
  return (
    <>
    <div className='flex items-center justify-center'>
    <div className=" flex-col items-center justify-center my-10 text-center  object-contain w-full ">
      <h1 className="text-2xl font-bold">Connections</h1>
  
      {/* Flex container for all User cards */}
      <div className=" flex justify-center gap-4 mt-4 items-center center ">
        {connections.map((connection, index) => (
          <div key={index} className="w-max">
            <User user={connection} />
          </div>
        ))}
      </div>
    </div>
    </div>
  </>
  
  
  )
}

export default Connections