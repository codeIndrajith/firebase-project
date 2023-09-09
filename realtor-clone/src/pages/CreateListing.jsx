import React, { useState } from 'react'

function CreateListing() {

    const [formData , setFormData] = useState({
        type : 'rent',
        name : '',
        bedrooms : 1,
        bathrooms : 1,
        parking : false,
        furnished : false,
        address : '',
        description : '',
        offer : true,
        regularPrice : 0,
        discountedPrice : 0
    })
    const {type , name, bedrooms , bathrooms , parking , furnished, address , description , offer , regularPrice , discountedPrice} = formData;

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
            <p className='mt-6 font-semibold text-xl'>Address</p>
            <textarea className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' type="text" id='address' value={address} onChange={onChange} placeholder='Address' required ></textarea>
            <p className='mt-6 font-semibold text-xl'>Description</p>
            <textarea className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' type="text" id='description' value={description} onChange={onChange} placeholder='Description' required ></textarea>
            
            <p className='text-lg font-semibold'>Offer</p>
            <div className="flex">
                <button id='type' value={true} type='button' onChange={onChange} className = {`px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    !offer ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    yes
                </button>
                <button id='offer' value={false} type='button' onChange={onChange} className = {`px-7 ml-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    offer ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    no
                </button>
            </div>
            <div className="flex items-center">
            <div className="mt-3">
                <p className='text-xl font-semibold'>Regular Price</p>
                <div className="flex justify-center items-center space-x-6">
                    <input type="number" id='regularPrice' value={regularPrice} max='400000000' min='50' onChange={onChange} required className='w-full mr-2 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                    {type === 'rent' && (
                   <div className="">
                    <p className='text-md w-full font-semibold ml-2 whitespace-nowrap'>$ / Month</p>
                   </div> 
                )}
                </div>
            </div>
            </div>

            {offer && (
                <div className="flex items-center">
                <div className="mt-3">
                    <p className='text-xl font-semibold'>Discounted Price</p>
                    <div className="flex justify-center items-center space-x-6">
                        <input type="number" id='discountedPrice' value={discountedPrice} max='400000000' min='50' onChange={onChange} required={offer} className='w-full mr-2 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
                        {type === 'rent' && (
                       <div className="">
                        <p className='text-md w-full font-semibold ml-2 whitespace-nowrap'>$ / Month</p>
                       </div> 
                    )}
                    </div>
                </div>
                </div>
            )}

            <div className="">
                <p className='text-lg font-semibold'>Images</p>
                <p className='text-gray-700 text-sm'>The first image will be the cover (max 6)</p>
                <input className='w-full mt-3 mb-5 px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:bg-slate-600' type="file" id="images" onChange={onChange} accept='.jpg, .png, .jpeg' multiple required />
            </div>
            <button type='sumbit' className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Create List</button>
        </form>
    </main>
  )
}

export default CreateListing