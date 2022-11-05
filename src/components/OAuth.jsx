import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {

const navigate = useNavigate()

const onGoogleClick = async () => {
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    // check for the user in the database
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    if(!docSnap.exists()){
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp()
      })
    }
    // redirect user to home page
    navigate('/')
  } catch (error) {
    toast.error("Couldn't log in with Google")
    console.log(error)
  }
}

  return (
    <div>
        <button type='button' onClick={onGoogleClick} className='flex justify-center items-center w-full bg-red-600 hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-300 ease-in-out rounded text-white uppercase font-semibold py-2 px-7 text-sm'><FcGoogle className='mr-3 text-2xl bg-white rounded-full'/>Continue With Google</button>
    </div>
  )
}
