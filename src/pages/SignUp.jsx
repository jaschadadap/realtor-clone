import React from 'react'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import OAuth from '../components/OAuth';
import { db } from "../firebase"
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function SignUp() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const {email, password, name} = formData;
  

  function onChange(e){
    setFormData((prevData) => ({
      ...prevData, [e.target.id]: e.target.value
    }))
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()

      // signs up user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser, {displayName: name})
      const user = userCredential.user

      // saves user data to firestore database
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      toast.success('You are signed up!')
      navigate('/')
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }


  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" alt="keys" className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] ml-20'>
          <form onSubmit={handleSubmit}>
            {/* full name input */}
            <div className='mb-6'><input placeholder='Full name' type="text" id="name" value={name} onChange={onChange} 
            className='w-full px-4 py-2 border-gray-300 rounded transition ease-in-out' /></div>
            {/* email address input */}
            <div className='mb-6'><input placeholder='Email Address' type="email" id="email" value={email} onChange={onChange} 
            className='w-full px-4 py-2 border-gray-300 rounded transition ease-in-out' /></div>
            {/* password input */}
            <div className='relative'>
              <input placeholder='Password' type={showPassword ? "text" : "password"} id="password" value={password} onChange={onChange} 
              className='w-full px-4 py-2 border-gray-300 rounded transition ease-in-out' />
              {showPassword ? <AiFillEyeInvisible className='absolute top-3 right-3 text-xl cursor-pointer' onClick={() => setShowPassword(prevState => prevState ? false : true)}/> 
              : <AiFillEye className='absolute top-3 right-3 text-xl cursor-pointer' onClick={() => setShowPassword(prevState => prevState ? false : true)}/>}
            </div>
            {/* forget password and sign up */}
            <div className='flex justify-between py-6 whitespace-nowrap text-sm transition duration-200 ease-in-out ml-1'>
              <p>Have an account?
                <Link to='/sign-in' className='text-red-600 hover:text-red-700'> Sign in!</Link>
              </p>
              <p>
                <Link to='/forgot-password' className='text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password</Link>
              </p>
            </div>
            {/* sign in button */}
            <button type='submit' className='w-full bg-blue-600 text-white rounded py-2 text-sm font-semibold uppercase shadow-md hover:bg-blue-700 transition ease-in-out duration-300 hover:shadow-lg active:bg-blue-800'>Sign up</button>
          </form>
          
          <div className='flex items-center my-4 before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300'>
            <p className='font-semibold'>OR</p>
          </div>
          <OAuth />
        </div>
      </div>
    </section>

  )
}
