"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type':'application/json'},
    });
    if(response.ok){
      setUserCreated(true)
    }else{
      setError(true);
    }
    setCreatingUser(false)
  }
  return(
    <section className="mt-8">
      <h1 className="text-center text-primary text-3xl mb-4">
        Register
      </h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created. <br /> Now you can 
          <Link href={"/login"}> Login &raquo;</Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error occured <br /> Please try again.
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        {/* the fields will be disabled when a user is being created */}
        <input type="email" placeholder="email" 
               value={email} 
               disabled={creatingUser}
               onChange={event => setEmail(event.target.value)}/>
        <input type="password" placeholder="password" 
               value={password}
               disabled={creatingUser}
               onChange={event => setPassword(event.target.value)}/>
        <button type="submit" disabled={creatingUser}>Register</button>
        <div className="my-4 text-center text-gray-500">or login with provider</div>
        <button className="flex gap-4  justify-center">
          <Image src={"/google.png"} width={24} height={24}/>
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500">
          Existing account? <Link className="underline"href={'/login'}>Login here</Link>
        </div>
      </form>
    </section>
  )
}