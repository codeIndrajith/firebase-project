import React from 'react'
import { useLocation , useNavigate } from 'react-router'
function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathMathRoute = (route) => {
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
                <ul className=' cursor-pointer flex justify-between space-x-9'>
                    <li className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "border-b-red-500 text-black"}`} onClick={() => navigate("/")}>Home</li>
                    <li className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "border-b-red-500 text-black"}`} onClick={() => navigate("/offers")}>Offers</li>
                    <li className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/sign-in") && "border-b-red-500 text-black"}`} onClick={() => navigate("/sign-in")}>Sign In</li>
                </ul>
            </div>
        </header>
    </div>
  )
}

export default Header