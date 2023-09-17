import { getAuth, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import {collection, doc, getDocs, orderBy, query, updateDoc, where} from 'firebase/firestore';
import {db} from '../firebase'
import {FcHome} from 'react-icons/fc'
import ListingItems from '../components/ListingItems';

function Profile() {

  const [changeDetail , setChangeDetail] = useState(false);
  const [listings , setListings] = useState(null)
  const [loading , setLoading] = useState(true)
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

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
        [event.target.id] : event.target.value
    }))
  }

  const onsubmit = async () => {
    try {
      // update displayname in firebase auth
      await updateProfile(auth.currentUser , {
        displayName : name
      })
      // update the name for firestore 
      const docRef = doc(db , "users" , auth.currentUser.uid)
      await updateDoc(docRef , {
        name
      })
      toast.success("Updated successful")
    } catch (error) {
      toast.error("Couldn't update the profile")
    }
  }

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listingsData = [];
  
      querySnap.forEach((doc) => {
        listingsData.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listingsData);
      setLoading(false);
     
    };
  
    fetchUserListings();
  }, [auth.currentUser.uid]);
  


  return (
    <div>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>

              {/* Name input */}
            <input type="text" id="name" onChange={onChange} value={name} disabled = {!changeDetail} className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-blue-300 focus:bg-blue-100"}`}/>
            {/* Email input */}
            <input type="email" id="email" value={email} disabled className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'/>
          
            <div className='flex justify-between text-sm sm:text-lg whitespace-nowrap'>
              <p>Do you want to change your name ?
                <span onClick= {() => {
                  changeDetail && onsubmit(); 
                  setChangeDetail((prevState) => !prevState)
                }} className='text-red-700 hover:text-red-500 transition ease-in-out duration-200 cursor-pointer ml-2'>{changeDetail ? "Edited" : "Edit"}</span>
              </p>
              <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>Sign Out</p>
            </div>
          
          </form>
          <button type='submit' className='w-full bg-blue-600 shadow-md text-white font-medium py-2 px-4 hover:bg-blue-800 transition ease-in-out hover:shadow-lg duration-150 rounded mt-2'>
            <Link className='flex items-center justify-center text-xl' to="/create-listing">
            <FcHome className='mr-3 text-3xl bg-red-800 rounded-full p-1'/>
            Sell or Rent your Home
            </Link>
          </button>
        </div>
      </section>  

        <div className='max-w-6xl px-3 mt-6 mx-auto'>
        {!loading && listings.length > 0 && (
          <>
            <h1 className='text-2xl text-center font-semibold'>My Listings</h1>
            <ul>
              {listings.map((listing) => (
                <ListingItems 
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />               
              ))}
            </ul>
          </>
        )}        
      </div>

    </div>
  )
}

export default Profile