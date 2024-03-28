"use client"

import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage(){
  const session = useSession();
  const userImage = session.data?.user.image;
  const [userName, setUsername] = useState('')
  const {status} = session;

  useEffect(() => {
    if(status === 'authenticated') {
      setUsername(session.data.user.name);
    }
  },[status, session]);

  async function handleProfileInfoUpdate(event){
    event.preventDefault();
    const response = await fetch("/api/profile", {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name: userName}),
    })
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
        <div className="flex gap-2 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <Image className="rounded-lg w-full h-full mb-1s" src={userImage} width={250} height={250} alt="avatar"/>
              <button type="button">Edit</button>
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