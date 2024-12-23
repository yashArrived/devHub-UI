import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
;const dispatch = useDispatch();
const feed = useSelector((store) => store.feed);


  const getFeed =async() => {
    if(feed) return;

    try {const res = await axios.get(BASE_URL + "/user/feed", {withCredentials : true});

    const allUsers = res.data.data;
    dispatch(addFeed(allUsers))}
    catch (error) {
      console.log(error);
      
    }
    
    
  }
  useEffect(()=>{
      getFeed()
  },[])

  if(!feed) return;
  if(feed.length <= 0 ){
    {return  (<div className='flex justify-center mt-10 text-center items-center'>
      <h1 className='w-1/3 bg-base-300 p-5 rounded-md  hover:bg-base-200'>No new users found</h1>
      </div>)}
  }

  return (
  feed &&  <div className='flex items-center justify-center my-10'>
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed