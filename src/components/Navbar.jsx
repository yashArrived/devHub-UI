import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';


const Navbar = () => {
    const user = useSelector(store => store.user)
    // console.log(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    // const [photoUrl,setPhotoUrl] = useState(user.photoUrl  || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" )

const handleLogOut = async() =>{

        try {
             await axios.post(BASE_URL + "/logout" , {} , {
                withCredentials:true
            });
            dispatch(removeUser());
            return navigate("/login")
        } catch (err) {
            console.log(err);
            
        }
}

  return (
    <div className="navbar bg-base-300 ">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl"> 👩‍💻 Devhub</Link>
    </div>
    { user && <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
            {location.pathname !== "/" && <li><Link to="/">Explore</Link></li>}
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
        </ul>
      <p>Welcome , {user?.firstName?.charAt(0).toUpperCase()+user?.firstName?.slice(1).toLowerCase()} </p>
      <div className="dropdown dropdown-end mx-4">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src= {user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              {/* <span className="badge">New</span> */}
            </Link>
          </li>
          <li><Link onClick={handleLogOut}>Logout</Link></li>
        </ul>
      </div>
    </div>}
  </div> 
  )
}

export default Navbar