"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(event){
    event.preventDefault();
    setLoginInProgress(true);
    const res = await signIn('credentials', {email, password, callbackUrl:"/"});
    setLoginInProgress(false)
  }
  return (
    <section className="mt-4">
      <h1 className="text-center text-primary text-3xl mb-4">
        Login
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" placeholder="email" 
               name="email"
               value={email} 
               disabled={loginInProgress}
               onChange={event => setEmail(event.target.value)}/>
        <input type="password" placeholder="password" 
               name="password"
               value={password}
               disabled={loginInProgress}
               onChange={event => setPassword(event.target.value)}/>
        <button type="submit" disabled={loginInProgress}>Login</button>
        <div className="my-4 text-center text-gray-500">or login with provider</div>
        <button type="button" onClick={()=> signIn('google', {callbackUrl:"/"})} className="flex gap-4 justify-center">
          <Image src={"/google.png"} width={24} height={24}/>
          Login with google
        </button>
      </form>
    </section>
  )
}