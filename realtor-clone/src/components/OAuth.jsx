import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import {useNavigate} from 'react-router-dom';

function OAuth() {

  const navigate = useNavigate();
  const continueWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
       // Always prompt the user to select a Google account
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth , provider);
      const user = result.user;
      console.log(user)

      // check for the user 
      const docRef = doc(db , "users" , user.uid);
      const docSnap = await getDoc(docRef)

      // check he is available or not
      if(!docSnap.exists()) {
        await setDoc(docRef , {
          name : user.displayName,
          email : user.email,
          timestamp : serverTimestamp()
        });
      }
      navigate("/");

    } catch (error) {
      toast.error("Could not authorize with Google");
      console.log(error);
    }
  }
  return (
   
        <button onClick={continueWithGoogle} type = "button" className='flex items-center justify-center uppercase w-full bg-red-700 text-white px-7 py-3 rounded text-sm font-medium mt-2 hover:bg-red-800 transition duration-200 ease-in-out'>
           <FcGoogle className='text-2xl mr-3 bg-white rounded-full'/> Continue With Google 
        </button>
   
  )
}

export default OAuth