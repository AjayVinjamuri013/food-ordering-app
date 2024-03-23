"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="mt-4">
      <h1 className="text-center text-primary text-3xl mb-4">
        Login
      </h1>
      <form className="block max-w-xs mx-auto">
        <input type="email" placeholder="email" 
               value={email} 
               disabled={false}
               onChange={event => setEmail(event.target.value)}/>
        <input type="password" placeholder="password" 
               value={password}
               disabled={false}
               onChange={event => setPassword(event.target.value)}/>
        <div className="my-4 text-center text-gray-500">or login with provider</div>
        <button className="flex gap-4  justify-center">
          <Image src={"/google.png"} width={24} height={24}/>
          Login with google
        </button>
      </form>
    </section>
  )
}