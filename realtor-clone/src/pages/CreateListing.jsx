import React, { useState } from 'react'

function CreateListing() {

    const [formData , setFormData] = useState({
        type : 'sell',
        name : '',
        bedrooms : 1,
        bathrooms : 1,
        parking : false,
        furnished : false
    })
    const {type , name, bedrooms , bathrooms , parking , furnished} = formData;

    const onChange = () => {

    }
  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center font-bold mt-6'>Create a Listing</h1>
        <form>
            <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
            <div className="flex">
                <button id='type' value='sale' type='button' onChange={onChange} className = {`px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    type === 'sell' ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    Sell
                </button>
                <button id='type' value='sale' type='button' onChange={onChange} className = {`px-7 ml-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    type === 'rent' ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    Rent
                </button>
            </div>
            <p className='mt-6 font-semibold text-xl'>Name</p>
            <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' type="text" id='name' value={name} onChange={onChange} placeholder='Name' required maxLength='32' minLength='10'/>
            <div className="flex space-x-6">
            <div>
            <p className='mt-6 font-semibold text-xl'>Beds</p>
            <input className='w-full px-2 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:text-slate-600' type="number" id='bedrooms' value={bedrooms} min='1' max='50' required onChange={onchange}/>
            </div>
            <div>
            <p className='mt-6 font-semibold text-xl'>Baths</p>
            <input className='w-full px-2 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:text-slate-600' type="number" id='bathrooms' value={bathrooms} min='1' max='50' required onChange={onchange}/>
            </div>
            </div>

            <p className='text-lg mt-6 font-semibold'>Parking</p>
            <div className="flex">
                <button id='parking' value={true} type='button' onChange={onChange} className = {`px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    !parking ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    Yes
                </button>
                <button id='parking' value={false} type='button' onChange={onChange} className = {`px-7 ml-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    parking ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    no
                </button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Furnished</p>
            <div className="flex">
                <button id='furnished' value={true} type='button' onChange={onChange} className = {`px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    !furnished ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    yes
                </button>
                <button id='furnished' value={false} type='button' onChange={onChange} className = {`px-7 ml-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    type === 'rent' ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    no
                </button>
            </div>
        </form>
    </main>
  )
}

export default CreateListing