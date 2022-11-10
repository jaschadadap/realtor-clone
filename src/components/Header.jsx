import React, { useState } from 'react'
import realtorLogo from '../img/realtor-logo.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'

export default function Header() {
    const [pageState, setPageState] = useState("Sign In")
    const location = useLocation()
    const navigate =  useNavigate()
    const auth = getAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPageState("Profile")
            } else {
                setPageState("Sign In")
            }
        })
    }, [auth])

    const matchPath = (linkRoute) => {
        if (linkRoute === location.pathname) {
            return true
        }
    }

  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div>
               <img src={realtorLogo} alt="realtor-logo" className='h-5 cursor-pointer' onClick={() => navigate('/')} />
            </div>
            <div>
                <ul className='flex space-x-10'>
                    <li onClick={() => navigate('/')} className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${matchPath('/') && "text-black border-b-red-500"}`}>Home</li>
                    <li onClick={() => navigate('/offers')}  className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${matchPath('/offers') && "text-black border-b-red-500"}`}>Offers</li>
                    <li onClick={() => navigate('/sign-in')}  className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(matchPath('/sign-in') || matchPath('/profile')) && "text-black border-b-red-500"}`}>
                        {pageState}
                    </li>
                </ul>
            </div>
        </header>
    </div>
  )
}
