import React from 'react'
import {FcGoogle} from 'react-icons/fc'

export default function OAuth() {
  return (
    <div>
        <button className='flex justify-center items-center w-full bg-red-600 hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-300 ease-in-out rounded text-white uppercase font-semibold py-2 px-7 text-sm'><FcGoogle className='mr-3 text-2xl bg-white rounded-full'/>Continue With Google</button>
    </div>
  )
}
