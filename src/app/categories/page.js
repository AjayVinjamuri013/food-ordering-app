"use client"

import UserTabs from "../Components/Layout/UserTabs";
import { useProfile } from "../Components/UseProfile";

export default function CategoriesPage(){
  
  const {data:profileData, loading:profileLoading} = useProfile();

  if(profileLoading){
    return <p>Loading user info...</p>
  }

  if(!profileData.admin){
    return <p>Not an admin</p>
  }

  return (
    <section className="mt-8 max-w-lg- mx-auto">
      <UserTabs isAdmin={true}/>
      <h1>Categories</h1>
    </section>
  )
}