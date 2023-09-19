import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getAuth} from 'firebase/auth';
import {v4 as uuidv4} from 'uuid';
import {addDoc, collection, doc, getDoc, serverTimestamp, updateDoc} from 'firebase/firestore';
import {db} from '../firebase.js'
import { useNavigate, useParams } from 'react-router-dom';


function EditListing() {

    const navigate = useNavigate();
    const auth = getAuth();
    const [geoLocationEnabled , setGeoLocationEnabled] = useState(true)
    const [loading , setLoading] = useState(false);
    const [listing , setListing] = useState(null)
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
        discountedPrice : 0,
        latitude : 0,
        longitude : 0,
        images : {}
    })
    const {type , name, images, bedrooms , bathrooms , parking , furnished, address , description , offer , regularPrice , discountedPrice , latitude , longitude} = formData;

    useEffect(() => {
        if(listing && listing.userRef !== auth.currentUser.uid) {
            toast.error("You can't edit this listing")
            navigate('/')
        }
    },[auth.currentUser.uid , listing , navigate])

    const params = useParams();
    useEffect(() => {
        setLoading(true)
        const fetchListing = async () => {
            const docRef = doc(db , "listings" , params.listingId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()) {
                setListing(docSnap.data())
                setFormData({...docSnap.data()})
                setLoading(false)
            }else {
               navigate('/')
                toast.error("Listing doesn't exist")
            }

        }
        fetchListing();       
    },[navigate , params.listingId])

    
    const onChangeFunction = (event) => {
        let boolean = null;
        if(event.target.value === 'true') {
            boolean = true;
        }
        if(event.target.value === 'false') {
            boolean = false;
        }

        // Files 
        if(event.target.files) {
            setFormData((prevState) => ({
                ...prevState, 
               images : event.target.files,
            }))
        }

        // Text/Boolean / Number
        if(!event.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [event.target.id] : boolean ?? event.target.value,
            }))
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
       setLoading(true);
       if(+discountedPrice >= +regularPrice) {
        setLoading(false);
        toast.error("Discounted price need to be less than to Regular Price")
        return;
    }
        if(images.length > 6) {
            setLoading(false);
            toast.error("Allow to upload only 6 images");
            return;
        }

        let geolocation = {};
        let location
        if (geoLocationEnabled) {
            try {
            //   const apiKey = import.meta.env.VITE_REACT_APP_GEOCODE_API_KEY;
              const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_REACT_APP_GEOCODE_API_KEY}`);
              const data = await res.json();
              
           
                // Process the geocoding results
                console.log(data);
                geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
                geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

                location = data.status === "ZERO_RESULTS" && undefined;

                if (location === undefined) {
                    setLoading(false);
                    toast.error('Enter a valid address');
                    return;
                  }
                  
              
            } catch (error) {
              console.log(error);
            }
          }
          else {
            geolocation.lat = latitude;
            geolocation.lng = longitude;
          }

          const storeImage = async (image) => {
            return new Promise((resolve , reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    reject(error)
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                    });
                }
                );

                            })
}
          
          const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
            ).catch((error) => {
                setLoading(false)
                toast.error("Image not uploaded")
                return;
            }
        ) 
           const formDataCopy = {
            ...formData,
            imgUrls,
            geolocation,
            timestamp : serverTimestamp(),
            userRef : auth.currentUser.uid,
           };
           delete formDataCopy.images;

           if(!formDataCopy.offer) {
            delete formDataCopy.discountedPrice;
           }   
           delete formDataCopy.latitude;
           delete formDataCopy.longitude;   
           const docRef = doc(db , "listings" , params.listingId)    
           
           try {
            await updateDoc(docRef , formDataCopy);
            setLoading(false);
            toast.success("Listings Updated");
            navigate(`/category/${formDataCopy.type}/${docRef.id}`)
          } catch (error) {
            console.error("Firestore Error:", error);
            setLoading(false);
            toast.error("Failed to create listing");
          }
         
           
    }

    

    if(loading) {
        return <Spinner />;
    }
  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center font-bold mt-6'>Edit Listing</h1>
        <form onSubmit={onSubmitHandler}>
            <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
            <div className="flex">
                <button id='type' value='rent' type='button' onClick={onChangeFunction} className = {`px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    type === 'sell' ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    Sell
                </button>
                <button id='type' value='sell' type='button' onClick={onChangeFunction} className = {`px-7 ml-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    type === 'rent' ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    Rent
                </button>
            </div>
            <p className='mt-6 font-semibold text-xl'>Name</p>
            <input className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' type="text" id='name' value={name} onChange={onChangeFunction} placeholder='Name' required maxLength='32' minLength='10'/>
            <div className="flex space-x-6">
            <div>
            <p className='mt-6 font-semibold text-xl'>Beds</p>
            <input className='w-full px-2 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:text-slate-600' type="number" id='bedrooms' value={bedrooms} min='1' max='50' required onChange={onChangeFunction}/>
            </div>
            <div>
            <p className='mt-6 font-semibold text-xl'>Baths</p>
            <input className='w-full px-2 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:text-slate-600' type="number" id='bathrooms' value={bathrooms} min='1' max='50' required onChange={onChangeFunction}/>
            </div>
            </div>

            <p className='text-lg mt-6 font-semibold'>Parking</p>
            <div className="flex">
                <button id='parking' value={true} type='button' onClick={onChangeFunction} className = {`px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    !parking ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    Yes
                </button>
                <button id='parking' value={false} type='button' onClick={onChangeFunction} className = {`px-7 ml-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    parking ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    no
                </button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Furnished</p>
            <div className="flex">
                <button id='furnished' value={true} type='button' onClick={onChangeFunction} className = {`px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    !furnished ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    yes
                </button>
                <button id='furnished' value={false} type='button' onClick={onChangeFunction} className = {`px-7 ml-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    furnished ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    no
                </button>
            </div>
            {!geoLocationEnabled && (
                <div className="flex space-x-6 mt-6">
                    <div className="">
                        <p className='text-lg font-semibold'>Latitude</p>
                        <input type="number" id='latitude' min='-90' max='90' value={latitude} onChange={onChangeFunction} required className='w-full mr-2 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                    </div>
                    <div className="">
                        <p className='text-lg font-semibold'>longitude</p>
                        <input type="number" id='longitude' min='-180' max='180' value={longitude} onChange={onChangeFunction} required className='w-full mr-2 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                    </div>
                </div>                
            )}
            <p className='mt-6 font-semibold text-xl'>Address</p>
            <textarea className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' type="text" id='address' value={address} onChange={onChangeFunction} placeholder='Address' required ></textarea>
            <p className='mt-6 font-semibold text-xl'>Description</p>
            <textarea className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' type="text" id='description' value={description} onChange={onChangeFunction} placeholder='Description' required ></textarea>
            
            <p className='text-lg font-semibold'>Offer</p>
            <div className="flex">
                <button id='offer' value={true} type='button' onClick={onChangeFunction} className = {`px-7 mr-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    !offer ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    yes
                </button>
                <button id='offer' value={false} type='button' onClick={onChangeFunction} className = {`px-7 ml-3 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-100 ease-in-out w-full ${
                    offer ? "bg-white" : "bg-slate-600 text-white"
                }`}>
                    no
                </button>
            </div>
            <div className="flex items-center">
            <div className="mt-3">
                <p className='text-xl font-semibold'>Regular Price</p>
                <div className="flex justify-center items-center space-x-6">
                    <input type="number" id='regularPrice' value={regularPrice} max='400000000' min='50' onChange={onChangeFunction} required className='w-full mr-2 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
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
                        <input type="number" id='discountedPrice' value={discountedPrice} max='400000000' min='50' onChange={onChangeFunction} required={offer} className='w-full mr-2 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center' />
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
                <input className='w-full mt-3 mb-5 px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:bg-slate-600' type="file" id="images" onChange={onChangeFunction} accept='.jpg, .png, .jpeg' multiple required />
            </div>
            <button type='submit' className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Edit List</button>
        </form>
    </main>
  )
}

export default EditListing