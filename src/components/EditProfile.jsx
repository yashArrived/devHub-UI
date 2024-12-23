import React, { useState,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({user}) => {
  // const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState(user.firstName  || "" );
  const [lastName, setLastName] = useState(user.lastName || ""  );
  const [age, setAge] = useState(user.age || "" );
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "" );
  const [gender, setGender] = useState(user.gender || "" );
  const [about, setAbout] = useState(user.about || ""  );
  const [errMsg, setErrMsg] = useState('');
  const [showToast , setShowtoast] = useState(false)

  const dispatch = useDispatch();

  // Initialize state when user data is available


  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        { firstName, lastName, age, photoUrl, gender, about },
        { withCredentials: true }
      );
        dispatch(addUser(res?.data?.data))
      console.log(res.data);
        setShowtoast(true);
        setTimeout(()=>{
          setShowtoast(false)
        },3000)
    } catch (err) {
      console.log(err);
      setErrMsg('An error occurred while saving the profile.');
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <>
    { showToast && <div className="toast toast-top toast-start mt-20">
 
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>}
    <div className="w-full min-h-screen flex justify-center items-center my-10 ">
      <div className="card bg-base-300 p-10 w-96">
        <p className=' flex font-bold align-middle items-center justify-center mb-5 text-xl'>Edit Profile</p>
        <label className="form-control">
          <div className="label">
            <span className="label-text text-lg">First Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text  text-lg">Last Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text text-lg">Age</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-lg"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text text-lg">Gender</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-lg"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text text-lg">Photo URL</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs text-lg"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-texttext-lg ">About</span>
          </div>
         
          <textarea className="textarea textarea-bordered text-lg" placeholder="Bio" 
          value={about}
          onChange={(e) => setAbout(e.target.value)}></textarea>
        </label>

        <div className="card-actions flex justify-center mt-5">
          <button className="btn btn-primary" onClick={handleSaveProfile}>
            Save Profile
          </button>
        </div>

        {errMsg && <p className="text-red-500 mt-4">{errMsg}</p>}
      </div>
      <div className='  card mx-7 align-middle flex items-center h-full  '>
      <UserCard user={{firstName,lastName,age,gender,photoUrl,about}}/>
      </div>
    </div>
    </>
  );
};

export default EditProfile;
