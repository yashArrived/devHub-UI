import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
const dispatch = useDispatch()
const feed = useSelector((store) => store.feed);


  const getFeed =async() => {
    if(feed) return;

    try {const res = await axios.get(BASE_URL + "/user/feed", {withCredentials : true});

    const allUsers = res.data.data;
    dispatch(addFeed(allUsers))}
    catch (error) {
      console.log(err);
      
    }
    
    
  }
  useEffect(()=>{
      getFeed()
  },[])
console.log(feed);

  return (
  feed &&  <div className='flex items-center justify-center my-10'>
      <UserCard user={feed} />
    </div>
  )
}

export default Feed