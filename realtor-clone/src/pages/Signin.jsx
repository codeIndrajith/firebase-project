import React, { useState } from 'react'
import {AiFillEyeInvisible , AiFillEye} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import OAuth from '../components/OAuth';
import { signInWithEmailAndPassword , getAuth } from 'firebase/auth';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const [showPassword , setShowPassword] = useState(false);
  const [formData , setFormData] = useState({
    email : "",
    password : "",
  });
  const {email , password} = formData;
  const getValue = (event) => {
    setFormData((previousValue) => ({
      ...previousValue,
      [event.target.id] : event.target.value,
    }))
  }

  const onSubmitFunction = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth , email , password);
      if(userCredential) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Error sign in");
    }
  }
 
  return (
    <section>
      <h1 className='text-3xl text-center mt-5 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-7xl lg:mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] md:mb-6'>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="sign in image" 
          className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmitFunction}>
            <label className='text-xl font-bold'> Email </label> <br />
           <input type="email" id = "email" value={email} onChange={getValue} placeholder='Enter Email' className='w-full text-xl rounded text-gray-700 border-gray-300 px-4 py-2 transition ease-in-out'/>
           <label className='text-xl font-bold'> Password </label> <br />
          <div className='relative'>
          <input type={showPassword ? "text" : "password"} id = "password" value={password} onChange={getValue} placeholder='Enter password' className='w-full text-xl rounded text-gray-700 border-gray-300 px-4 py-2 transition ease-in-out' />
           {showPassword ? <AiFillEyeInvisible className='absolute right-2 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((preState) => !preState)}/> : <AiFillEye className='absolute right-2 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((preState) => !preState)}/>}
          </div>
          <div className='flex justify-between text-sm sm:text-lg whitespace-nowrap'>
            <p>Don't have an account? <Link to="/sign-up" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>Register</Link>
            </p>
            <p>
              <Link to="/forgot-password" className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out'>Forgot Password</Link>
            </p>
          </div>
          <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 rounded text-sm font-medium mt-2 hover:bg-blue-700 transition duration-200 ease-in-out uppercase'>Sign In</button>
          <div className='flex items-center my-4 before:border-t before:flex-1 before:border-gray-500 after:border-t after:flex-1 after:border-gray-500'>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <OAuth />
          </form>
          
        </div>
      </div>
    </section>
  )

}

export default Signin