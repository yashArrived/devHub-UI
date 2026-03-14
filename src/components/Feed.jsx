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
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200">
        <AnimatedBackground />
        <div className="z-10 mx-4 max-w-xl rounded-3xl border border-base-300/70 bg-base-100/80 p-10 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="mb-3 text-3xl font-bold text-primary">No new developers found</h1>
          <p className="text-base-content/70">You are all caught up for now. Check back in a while.</p>
        </div>
      </div>
    );
  }

  return (
    feed && (
      <div className=''>
      <div className="relative m-auto min-h-screen overflow-hidden bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
        <AnimatedBackground />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h1 className="mb-2 text-center text-4xl font-bold text-base-content md:text-5xl">
            Connect with Fellow Developers
          </h1>
          <p className="mb-8 text-center text-base-content/70">Discover talented developers and grow your network.</p>
          <div className='flex'>
          <div className="m-auto rounded-3xl border border-base-300/70 bg-base-100/80 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 text-center text-base-content/70">
              <p className="text-lg font-medium">Swipe less, connect smarter</p>
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

