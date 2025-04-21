"use client";
import Profile from '@components/Profile';
import { useSession } from '@node_modules/next-auth/react';
import { useRouter } from '@node_modules/next/navigation';
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
  const {data: session}=useSession();
  const [myposts, setMyPosts] = useState([]);
  const router=useRouter();

  const fetchPosts=async ()=>{
    try {
      const response=await fetch(`/api/user/${session?.user.id}/posts`);
      const data=await response.json();
      setMyPosts(data);
      
    } catch (error) {
      console.log("Unable to Fetch all Posts because ", error)
      
    }
  }

  useEffect(()=>{
    if(session?.user.id) fetchPosts();
  },[])

  const handleEdit=(post)=>{
    router.push(`/update-prompt?id=${post._id}`);

  }

  const handleDelete=async (post)=>{
    const hasConfirmed=confirm("Are you sure do you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        const response=await fetch(`/api/prompt/${post._id.toString()}`,{
          method:'DELETE'
        });
        const filteredPosts=myposts.filter((p)=>p._id!=post._id);
        setMyPosts(filteredPosts);
        
      } catch (error) {
        console.log(error)
        
      }
      
    }

  }


  return (
    <Profile 
    name='My'
    desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    data={myposts}
    
    />
  )
}

export default MyProfile