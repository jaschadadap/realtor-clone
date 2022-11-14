import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { getStorage, ref,uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {db} from '../firebase'
import { useNavigate } from 'react-router-dom'


export default function CreateListing() {
    const navigate = useNavigate()
    const auth = getAuth()
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)
    const [loading, setLoading] = useState(false)
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
        discountedPrice: 25,
        latitude: 0,
        longitude: 0,
        images: {}
    })
    const { images, type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice, latitude, longitude } = formData
    const onChange = (e) => {
        let boolean = null;
        if(e.target.value === 'true') {
            boolean = true
        }
        if(e.target.value ==='false'){
            boolean = false
        }
        if(e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }
        if(!e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }))
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(discountedPrice >= regularPrice){
            setLoading(false)
            toast.error('The discounted price must be lower than the regular price.')
            return
        }
        if(images.length > 6){
            setLoading(false)
            toast.error('Maximum of 6 images is allowed.')
            return
        }
        let geoLocation = {}
        let location 
        if(geolocationEnabled){
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`)
            const data = await response.json()
            geoLocation.lat = data.results[0]?.geometry.location.lat ?? 0
            geoLocation.lng = data.results[0]?.geometry.location.lng ?? 0

            location = data.status === "ZERO_RESULTS" && undefined

            if(location === undefined){
                toast.error("Please enter a correct address")
                return
            } else {
                geoLocation.lat = latitude
            }
        }
        async function storeImage(image) {
            return new Promise((resolve, reject) => {
              const storage = getStorage();
              const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
              const storageRef = ref(storage, filename);
              const uploadTask = uploadBytesResumable(storageRef, image);
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  reject(error);
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                  });
                }
              );
            });
            
          }
          const imgUrl = await Promise.all(
            [...images].map((image) => storeImage(image))
          ).catch((error) => {
            setLoading(false);
            toast.error("Images not uploaded");
            return;
          });
        
        const formDataCopy = {
            ...formData,
            imgUrl,
            geoLocation,
            timestamp: serverTimestamp()
        };
        delete formDataCopy.images;
        !formDataCopy.offer && delete formDataCopy.discountedPrice;
        delete formDataCopy.latitude;
        delete formDataCopy.longitude;
        const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
        setLoading(false)
        toast.success('Listing created')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }



    if (loading) {
        return <Spinner />
    }


  return (
    <main className='max-w-md px-2 mx-auto '>
        <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
        <form onSubmit={onSubmit}>
            <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
            <div className='flex'>
                <button type='button' id='type' value='sale' onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full mr-1 ${ type === 'rent' ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>Sell</button>
                <button type='button' id='type' value='rent' onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full ${ type === 'sale' ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>Rent</button>
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
                <button type='button' id='parking' value={true} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full mr-1 ${ parking === false ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>Yes</button>
                <button type='button' id='parking' value={false} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full ${ parking === true ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>No</button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Furnished</p>
            <div className='flex'>
                <button type='button' id='furnished' value={true} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full mr-1 ${ furnished === false ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>Yes</button>
                <button type='button' id='furnished' value={false} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full ${ furnished === true ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>No</button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Address</p>
            <input type="text" id='address' value={address} onChange={onChange} placeholder='Address' minLength='10' className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' required/> 
            {!geolocationEnabled && (
                <div className='flex space-x-1'>
                    <div>
                        <p className='text-md font-semibold'>Latitude</p>
                        <input type="number" id='latitude' value={latitude} onChange={onChange} className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' required/>
                    </div>
                    <div>
                        <p className='text-md font-semibold'>Longitude</p>
                        <input type="number" id='longitude' value={longitude} onChange={onChange} className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' required/>
                    </div>
                </div>
            )}
            <p className='text-lg mt-6 font-semibold'>Description</p>
            <input type="textarea" id='description' value={description} onChange={onChange} placeholder='Description' minLength='10' className='w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-300 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600' required/>
            <p className='text-lg mt-6 font-semibold'>Offer</p>
            <div className='flex'>
                <button type='button' id='offer' value={true} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full mr-1 ${ offer === false ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>Yes</button>
                <button type='button' id='offer' value={false} onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounder hover:shadow-lg focus:shadow-lg active:shadow-lg transition ease-in-out duration-300 w-full ${ offer === true ? 'bg-white text-black' : 'bg-slate-600 text-white'} `}>No</button>
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
