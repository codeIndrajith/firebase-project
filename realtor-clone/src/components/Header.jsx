import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const [pageName , setPageName] = useState("Sign In");
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(()=> {
        onAuthStateChanged(auth , (user) => {
            if(user) {
                setPageName("Profile");
            }else {
                setPageName("Sign In")
            }
        })
    },[auth])
    const pathMatchRoute = (route) => {
       if(route === location.pathname) {
        return true;
       }
    }

  return (
    <div className='bg-white border-2 shadow-sm sticky top-0 z-50'>
        <header className='flex justify-between items-center px-3 max-w-7xl mx-auto'>
            <div>
                <img className='h-5 cursor-pointer' src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="realtor logo" onClick={() => navigate("/")} />
            </div>
            <div>
                <ul className='cursor-pointer flex justify-between space-x-9'>
                    <li className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/') && "text-blue-900 border-b-red-800"}`} onClick={() => navigate("/")}>Home</li>
                    <li className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/offers') && "text-blue-900 border-b-red-800"}`} onClick={() => navigate("/offers")}>Offers</li>
                    <li className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchRoute('/sign-in') || pathMatchRoute('/profile')) && "text-blue-900 border-b-red-800"}`} onClick={() => navigate("/profile")}>{pageName}</li>
                </ul>
            </div>
        </header>
    </div>
  )
}

export default Header