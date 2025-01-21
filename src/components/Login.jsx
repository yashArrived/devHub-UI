import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

        const[email , setEmailId] = useState("");
        const [password,setPassword] = useState("");
        const [errorMsg , setErrorMsg] = useState("")
        const [firstName , setFirstName] = useState("")
        const [lastName , setLastName] = useState("")
        const [isLogin , setIsLogin] = useState(false)
        const dispatch = useDispatch();
        const navigate = useNavigate();

const handleLogin = async() => {
try 
  {   const res = await   axios.post(BASE_URL+ "/login" , {
            email,
            password
        },
    {withCredentials:true}
    );
    dispatch(addUser(res.data));
    return navigate("/")
    

    }catch(err){
        setErrorMsg(err?.response?.data?.error || "Something went wrong")
        console.log(err);
        
    }
}
const handleSignup = async () =>{
  try{const res = await axios.post(BASE_URL + "/signUp" , {firstName,lastName,email,password}, {withCredentials:true})
    // console.log(res.data);

    
  dispatch(addUser(res.data.data));
  return navigate("/profile")

  }catch(err){
    setErrorMsg(err?.response?.data?.error || "Something went wrong")
    console.log(err);
    
  }

}
  return (
    <div className='flex justify-center mt-3  '>
<div className="card bg-neutral text-neutral-content w-96 h-full">
  <div className="card-body items-center text-center ">
    <h2 className='card-title text-white'> {isLogin ? "Login" : "SignUp"}</h2>
 

{/* firstname , lastName */}
 
{ !isLogin &&
  <>  <label className="input input-bordered mt-3  p-5 flex items-center text-center justify-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zM12 13c-3.31 0-6 2.69-6 6 0 .553.447 1 1 1h10c.553 0 1-.447 1-1 0-3.31-2.69-6-6-6zm-4 5c.293-1.206 1.516-2 3-2s2.707.794 3 2H8z" />
  </svg>
  <input
    type="text"
    className="grow  p-5 focus:p-7 focus:outline-none  w-full h-full rounded-md"
    placeholder="First Name"
    value={firstName}
    onChange={(e) =>  setFirstName(e.target.value) }
  />
</label>

<label className="input input-bordered flex items-center gap-2 p-5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zM12 13c-3.31 0-6 2.69-6 6 0 .553.447 1 1 1h10c.553 0 1-.447 1-1 0-3.31-2.69-6-6-6zm-4 5c.293-1.206 1.516-2 3-2s2.707.794 3 2H8z" />
  </svg>
  <input
    type="text"
    className="grow p-5 focus:p-7 focus:outline-none   w-full h-full rounded-md "
    placeholder="Last Name"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
  />
</label>
</>

}

{/* //Email  */}

<label className="input input-bordered flex items-center gap-2  p-5">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow  p-5 focus:p-7 w-full h-full rounded-md " placeholder="Email" value={email} onChange={(e)=>setEmailId(e.target.value)} />
</label>

{/* Password */}
<label className="input input-bordered flex items-center   p-5 gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
 <input type="password" className="grow  p-5 focus:p-7  w-full h-full rounded-md" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
</label>
<p className='text-red-500'>{errorMsg}</p>
    <div className="card-actions justify-end mt-2">
      <button className="btn btn-primary" onClick={ isLogin ? handleLogin : handleSignup}>{ isLogin ? "Login" : "SignUp"}</button>
      
    </div>
    <div className='mt-3'>
  {isLogin ? (
    <>
      New User? <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(false)}>Signup</span>
    </>
  ) : (
    <>
      Existing User? <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(true)}>Login</span>
    </>
  )}
</div>
  </div>
</div>

    </div>
  )
}

export default Login