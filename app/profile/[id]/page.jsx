"use client";
import Profile from '@components/Profile';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, use } from 'react'

const OthersProfile = ({ params }) => {

  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const { id } = use(params);
  const [myposts, setMyPosts] = useState([]);




  useEffect(() => {


    const fetchPosts = async () => {

      try {
        const response = await fetch(`/api/user/${id}/posts`);
        const data = await response.json();
        setMyPosts(data);

      } catch (error) {
        console.log("Unable to Fetch all Posts because ", error)

      }
    }


    if (id) fetchPosts();
  }, [id])




  return (
    <Profile
      name={userName}
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'

      data={myposts}

    />
  )
}

export default OthersProfile


