"use client"

import { useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../Components/Layout/UserTabs"

export default function ProfilePage(){
  const session = useSession();
  const [userName, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] =useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const {status} = session;

  useEffect(() => {
    if(status === 'authenticated') {
      setUsername(session.data.user.name);
      setImage(session.data?.user.image);
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          console.log(data);
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      })
    }
  },[status, session]);

  async function handleProfileInfoUpdate(event){
    event.preventDefault();
    const savingPromise = new Promise( async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          name: userName, 
          image,
          streetAddress,
          phone,
          postalCode, 
          city,
          country
        }),
      });
      if(response.ok) 
        resolve() 
      else 
        reject();
    });
    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error:'Error in saving profile.'
    })
  }

  async function handleFileChange(event){
    const files = event.target.files;
    if(files?.length === 1){
      const data = new FormData;
      data.set('file',files[0])
      
      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data
        });
        if(response.ok){
          const link = await response.json();
          setImage(link);
          resolve();
        } else{
          reject();
        }
      })
      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Profile Image saved!',
        error:'Error in saving profile image.'
      })
    }
  }

  if(status === "loading" || !profileFetched){
    return 'Loading.....'
  }

  if(status === "unauthenticated"){
    return redirect('/login');
  }
  return(
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin}></UserTabs>
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-2">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              {image && (
                <Image className="rounded-lg w-full h-full mb-1" src={image} width={250} height={250} alt="avatar"/>
              )}
              <label>
                <input type="file" className="hidden" onChange={handleFileChange}/>
                <span className="block border border-gray-300 rounded-lg p-2 mt-2 text-center cursor-pointer">Edit</span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and last name</label>
            <input type="text" value={userName} onChange={(event) => setUsername(event.target.value)} placeholder="First and last name"></input>
            <input type="email" disabled={true} value={session.data?.user.email}></input>
            <label>Phone number</label>
            <input type="tel" value={phone} onChange={(event)=>setPhone(event.target.value)} placeholder="Phone number"/>
            <label>Street Address</label>
            <input type="text" value={streetAddress} onChange={(event)=>setStreetAddress(event.target.value)} placeholder="Street Address"/>
            <div className="flex gap-4">
              <div>
                <label>Postal Code</label>
                <input type="text" value={postalCode} onChange={(event)=>setPostalCode(event.target.value)} placeholder="Postal Code"/>
              </div>
              <div>
                <label>City</label>
                <input type="text" value={city} onChange={(event)=>setCity(event.target.value)} placeholder="City"/>
              </div>
            </div>
            <label>Country</label>
            <input type="text" value={country} onChange={(event)=>setCountry(event.target.value)} placeholder="Country"/>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  )
}