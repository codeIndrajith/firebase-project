import React from 'react'
import {FcGoogle} from 'react-icons/fc'
function OAuth() {
  return (
   
        <button className='flex items-center justify-center uppercase w-full bg-red-700 text-white px-7 py-3 rounded text-sm font-medium mt-2 hover:bg-red-800 transition duration-200 ease-in-out'>
           <FcGoogle className='text-2xl mr-3 bg-white rounded-full'/> Continue With Google 
        </button>
   
  )
}

export default OAuth