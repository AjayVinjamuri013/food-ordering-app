"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Header(){
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
if(userName && userName.includes(' ')){
  userName = userName.split(" ")[0]
}
    return (
    <header className="flex items-center justify-between">
    <nav className="flex items-center gap-8 text-gray-500 font-semibold">
      <Link className="text-primary font-semibold text-2xl" href={"/"}>Papa Jones Pizza</Link>
      <Link href={'/'}>Home</Link>
      <Link href={''}>Menu</Link>
      <Link href={''}>About</Link>
      <Link href={''}>Contact</Link>
    </nav>
    <nav className="flex items-center gap-4 text-gray-500 font-semibold">
      {status === 'authenticated' && (
        <>
          <Link href={"/profile"} className="whitespace-nonwrap">Hello, {userName}</Link>
          <button className="bg-primary rounded-full text-white px-8 py-2" onClick={()=> signOut()}>
            Logout
          </button>
        </>
      )}
      {status === 'unauthenticated' && (
        <>
          <Link href={"/login"}>Login</Link>
          <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
            Register
          </Link>
        </>
      )}
      
    </nav>
  </header>
  )
}