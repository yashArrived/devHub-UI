import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import User from './User';

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
if(connections.length === 0 ) return <h1>You do not have any connections</h1>
  return (
    <>
    <div className=' justify-center my-10 text-center'>
        <h1 className='text-2xl text-bold '>Connections</h1>
      
        
        {connections.map((connection,index)=>{
            
            return <div className='flex'>
                <User user={connection}/>
            </div>
        })}
    </div>
    <div>
        
        </div>
 
    </>
  )
}

export default Connections