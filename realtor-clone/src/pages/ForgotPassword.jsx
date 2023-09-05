import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import OAuth from '../components/OAuth';
import {toast} from 'react-toastify'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {
  const [email , setEmail] = useState("");
  const getValue = (event) => {
    setEmail(event.target.value);
  }

  const onSubmitFunction = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth , email);
      toast.success("Email was sent")
    } catch (error) {
      toast.error("Couldn't send Reset Password")
    }
  }

 
  return (
    <section>
      <h1 className='text-3xl text-center mt-5 font-bold'>Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-7xl lg:mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] md:mb-6'>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="sign in image" 
          className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmitFunction}>
          <label className='text-xl font-bold'> Email </label> <br />
           <input type="email" id = "email" value={email} onChange={getValue} placeholder='Enter Email' className='w-full text-xl rounded text-gray-700 border-gray-300 px-4 py-2 transition ease-in-out'/>
          
          <div className='flex justify-between text-sm sm:text-lg whitespace-nowrap'>
            <p>Don't have an account? <Link to="/sign-up" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out'>Register</Link>
            </p>
            <p>
              <Link to="/sign-in" className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out'>Sign In Instead</Link>
            </p>
          </div>
          <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 rounded text-sm font-medium mt-2 hover:bg-blue-700 transition duration-200 ease-in-out uppercase'>Send Reset Password</button>
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

export default ForgotPassword;