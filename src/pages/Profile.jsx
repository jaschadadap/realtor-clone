import { getAuth } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {email, name} = formData
  const navigate = useNavigate()
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }
  
  
  return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center flex-col items-center'>
      <h1 className='text-3xl text-center mt-6 font-bold' >My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
          {/* name input */}
          <input type="text" id='name' disabled value={name} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'/>
          {/* email input */}
          <input type="email" id='email' disabled value={email} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mt-2'/>
          {/* divider with message */}
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-base'>
            <p className='flex items-center'>Do you want to change your name?
              <span className='text-red-600 hover:text-red-800 transition duration-300 ease-in-out ml-1 cursor-pointer'> Edit</span>
            </p>
            <p onClick={()=>onLogout()} className='text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out ml-1 cursor-pointer'>Sign Out</p>
          </div>
        </form>
      </div>
      </section>
    </>
  )
}
