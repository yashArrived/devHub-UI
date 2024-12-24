import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

import AnimatedBackground from './AnimatedBackground';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      const allUsers = res.data.data;
      dispatch(addFeed(allUsers));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0) {
    return (
      <div className="relative flex justify-center items-center h-screen bg-gray-900 overflow-hidden">
        <AnimatedBackground />
        <div className="text-center p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-xl border border-gray-700 z-10">
          <h1 className="text-3xl font-bold text-green-400 mb-4">No new developers found</h1>
          {/* <p className="text-gray-400">Expand your search criteria or check back later</p> */}
        </div>
      </div>
    );
  }

  return (
    feed && (
      <div className=''>
      <div className="relative  align-middle m-auto min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-100">
            Connect with Fellow Developers
          </h1>
          <div className='flex'>
          <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-xl p-6 border flex:col justify-center items-center m-auto  border-gray-700">
            <div className="text-gray-400 mb-6 text-center">
              <p className="text-lg">Discover talented developers</p>
              {/* <p className="text-sm mt-2">Swipe right to connect, left to pass</p> */}
            </div>
            <UserCard user={feed[0]} />
          </div>
          </div>
        </div>
      </div>
      </div>
    )
  );
};

export default Feed;

