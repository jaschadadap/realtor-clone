import React from 'react'
import { useState } from 'react'

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        description: '',
        offer: true,
        regularPrice: 50,
        discountedPrice: 25
    })
    const { type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice } = formData
    const onChange = () => {

    }


  return (
    <main className='max-w-md px-2 mx-auto '>
        <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
        <form>
            <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
            <div className='flex'>
                <button type='button' id='type' value='sale' onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full mr-1 ${ type === 'rent' ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>Sell</button>
                <button type='button' id='type' value='sale' onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full ${ type === 'sale' ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>Rent</button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Name</p>
            <input type="text" id='name' value={name} onChange={onChange} placeholder='Name' maxLength='32' minLength='10' className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' required/> 
            <div className='flex space-x-6 justify-start mb-6'>
                <div>
                    <p className='text-lg mt-6 font-semibold'>Beds</p>
                    <input type="number" id='bedrooms' value={bedrooms} onChange={onChange} className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' min='1' max='2' required/>
                </div>
                <div>
                    <p className='text-lg mt-6 font-semibold'>Baths</p>
                    <input type="number" id='bathrooms' value={bathrooms} onChange={onChange} className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' min='1' max='2' required/>
                </div>
            </div>
            <p className='text-lg mt-6 font-semibold'>Parking Spot</p>
            <div className='flex'>
                <button type='button' id='parking' value={false} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full mr-1 ${ parking === false ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>Yes</button>
                <button type='button' id='parking' value={true} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full ${ parking === true ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>No</button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Furnished</p>
            <div className='flex'>
                <button type='button' id='type' value={true} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full mr-1 ${ furnished === false ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>Yes</button>
                <button type='button' id='type' value={false} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full ${ furnished === true ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>No</button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Address</p>
            <input type="text" id='address' value={address} onChange={onChange} placeholder='Address' minLength='10' className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' required/> 
            <p className='text-lg mt-6 font-semibold'>Description</p>
            <input type="textarea" id='description' value={description} onChange={onChange} placeholder='Description' minLength='10' className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' required/>
            <p className='text-lg mt-6 font-semibold'>Offer</p>
            <div className='flex'>
                <button type='button' id='parking' value={false} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full mr-1 ${ offer === false ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>Yes</button>
                <button type='button' id='parking' value={true} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full ${ offer === true ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>No</button>
            </div> 
            <div className='flex w-full'>
                <div className='w-full'>
                    <p className='text-lg mt-6 font-semibold'>Regular Price</p>
                    <input type="number" id='regularPrice' value={regularPrice} onChange={onChange} className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' min='50' max='100000000' required/>
                </div>                
                {type === 'rent' && (
                    <div className='flex items-end mb-2 ml-2'>
                        <p className='w-full whitespace-nowrap'>$ / month</p>
                    </div>
                )}
            </div>
            {offer === true && <div className='flex w-full'>
                <div className='w-full'>
                    <p className='text-lg mt-6 font-semibold'>Discounted Price</p>
                    <input type="number" id='discountedPrice' value={discountedPrice} onChange={onChange} className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' min='50' max='100000000' required={offer}/>
                </div>                
            </div>}
            <div>
                <p className='text-lg mt-6 font-semibold'>Images</p>
                <p className='text-gray-600'>The first image will be the cover (max 6)</p>
                <input type="file" id='images' onChange={onChange} accept='.jpg, .png, .jpeg' className='mt-1'/>
            </div>
            <button type='submit' className='w-full mb-6 px-7 py-3 bg-blue-600 text-white shadow-md font-medium rounded mt-6 text-sm uppercase hover:shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:bg-blue-800 focus:shadow-lg'>Create Listing</button>
        </form>
    </main>
  )
}
