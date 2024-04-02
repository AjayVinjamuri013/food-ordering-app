"use client"

import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import InfoBox from "../Components/Layout/InfoBox";
import SuccessBox from "../Components/Layout/SuccessBox";

export default function ProfilePage(){
  const session = useSession();
  const [userName, setUsername] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState('');
  const {status} = session;

  useEffect(() => {
    if(status === 'authenticated') {
      setUsername(session.data.user.name);
      setImage(session.data?.user.image);
    }
  },[status, session]);

  async function handleProfileInfoUpdate(event){
    event.preventDefault();
    setProfileSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name: userName, image}),
    });
    if(response.ok){
      setProfileSaved(true);
    }
    setIsSaving(false);
  }

  async function handleFileChange(event){
    const files = event.target.files;
    setIsUploading(true);
    if(files?.length === 1){
      const data = new FormData;
      data.set('file',files[0])
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      const link = await response.json();
      console.log(link);
      setImage(link);
      setIsUploading(false);
    }
  }

  if(status === "loading"){
    return 'Loading.....'
  }

  if(status === "unauthenticated"){
    return redirect('/login');
  }
  return(
    <section className="mt-8">
      <h1 className="text-center text-primary text-3xl mb-4">
        Profile
      </h1>
      <div className="max-w-md mx-auto">
        {profileSaved && (
          <SuccessBox> Profile saved!</SuccessBox>
        )}
        {isSaving && (
          <InfoBox>Saving...</InfoBox>
        )}
        {isUploading && (
          <InfoBox> Uploading Image...</InfoBox>
        )}
        <div className="flex gap-2 items-center">
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
            <input type="text" value={userName} onChange={(event) => setUsername(event.target.value)} placeholder="First and last name"></input>
            <input type="email" disabled={true} value={session.data?.user.email}></input>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  )
}