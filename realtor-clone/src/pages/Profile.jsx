import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [formData , setFormData] = useState({
    name : auth.currentUser.displayName,
    email : auth.currentUser.email
  })

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  }
  const {name , email } = formData;

  return (
    <div>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>

              {/* Name input */}
            <input type="text" id="name" value={name} disabled className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'/>
            {/* Email input */}
            <input type="email" id="email" value={email} disabled className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'/>
          
            <div className='flex justify-between text-sm sm:text-lg whitespace-nowrap'>
              <p>Do you want to change your name ?
                <span className='text-red-700 hover:text-red-500 transition ease-in-out duration-200 cursor-pointer ml-2'>Edit</span>
              </p>
              <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>Sign Out</p>
            </div>
          
          </form>
        </div>
      </section>
    </div>
  )
}

export default Profile