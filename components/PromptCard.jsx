"use client"
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Image from 'next/image'

const PromptCard = ({post , 
  handleTagClick , 
  handleDelete , 
  handleEdit}) => {
  const [copied, setCopied] = useState("");
  const {data: session}=useSession();
  const pathName=usePathname();
  const router=useRouter();

  const handleCopy=()=>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
      
    }, 2000);
  }

  const handleProfile=()=>{
    if(session?.user.id===post.creator._id) return router.push('/profile');

    return router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>


        <div 
        className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
        onClick={handleProfile}
        >
        <Image
        src={post.creator.image}
        alt='user_image'
        width={40}
        height={40}
        className='rounded-full object-contain'
        />

        <div className='flex flex-col'>
          <h3 
          className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
          <p
          className='font-inter text-sm text-gray-500'
          >{post.creator.email}</p>
        </div>

        </div>

        

        <div className='copy_btn' onClick={handleCopy}>
          <Image 
          src={copied===post.prompt?"/assets/icons/tick.svg":"/assets/icons/copy.svg"}

          alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
          width={12}
          height={12}
          />
        </div>
       
      </div>

      <p
      className='my-4 font-satoshi text-sm text-gray-700'
      >{post.prompt}</p>
      <p
      className='font-inter text-sm blue_gradient cursor-pointer'
      onClick={()=>handleTagClick && handleTagClick(post.tag)}
      >#{post.tag}
      
      </p>

      {session?.user.id===post.creator._id && pathName==="/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
          className='font-inter text-sm green_gradient cursor-pointer hover:text-green-600'
          onClick={handleEdit}
          >Edit</p>
          <p
          className='font-inter text-sm orange_gradient cursor-pointer hover:text-orange-700'
          onClick={handleDelete}
          >Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard