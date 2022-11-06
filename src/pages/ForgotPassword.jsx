import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

export default function ForgotPassword() {

  const [formData, setFormData] = useState({
    email: ""
  });

  const {email} = formData;
  

  function onChange(e){
    setFormData((prevData) => ({
      ...prevData, [e.target.id]: e.target.value
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset password')
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
      <div className='flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" alt="keys" className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] ml-20'>
          <form onSubmit={handleSubmit}>
            {/* email address input */}
            <div className='mb-6'><input placeholder='Email Address' type="email" id="email" value={email} onChange={onChange} 
            className='w-full px-4 py-2 border-gray-300 rounded transition ease-in-out' /></div>
            {/* forget password and sign up */}
            <div className='flex justify-between pb-3 whitespace-nowrap text-sm transition duration-200 ease-in-out ml-1'>
              <p>
                <Link to='/sign-in' className='text-red-600 hover:text-red-700'> Sign in instead</Link>
              </p>
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white rounded py-2 text-sm font-semibold uppercase shadow-md hover:bg-blue-700 transition ease-in-out duration-300 hover:shadow-lg active:bg-blue-800'>Send reset password</button>
          </form>
          {/* sign in button */}
          
          <div className='flex items-center my-4 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300'>
            <p className='font-semibold'>OR</p>
          </div>
          <OAuth />
        </div>
      </div>
    </section>

  )
}
