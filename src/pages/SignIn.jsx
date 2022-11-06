import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

export default function SignIn() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formData;

  function onChange(e){
    setFormData((prevData) => ({
      ...prevData, [e.target.id]: e.target.value
    }))
  }

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("submitted")
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        navigate('/')
        console.log(userCredential.user)
      }
    } catch (error) {
      toast.error("Sign in not successful")
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" alt="keys" className='w-full rounded-2xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] ml-20'>
          <form onSubmit={handleSubmit}>
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
              <p>Don't have an account?
                <Link to='/sign-up' className='text-red-600 hover:text-red-700'> Register now!</Link>
              </p>
              <p>
                <Link to='/forgot-password' className='text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password</Link>
              </p>
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white rounded py-2 text-sm font-semibold uppercase shadow-md hover:bg-blue-700 transition ease-in-out duration-300 hover:shadow-lg active:bg-blue-800'>Sign in</button>
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
