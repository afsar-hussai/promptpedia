"use client";

import Form from "@components/Form";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const UpdatePrompt = () => {

    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const searchParams=useSearchParams();
    const promptId=searchParams.get('id');

    const [submitting, setIsSubmitting] = useState(false);

    const router=useRouter();
    const getPromptDetails=async ()=>{
        const response=await fetch(`/api/prompt/${promptId}`);
        const data=await response.json();
        setPost({
            prompt:data.prompt,
            tag:data.tag,
        })
    }
    useEffect(()=>{
        if(promptId) getPromptDetails();
    },[promptId])


    const updatePrompt=async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response=await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            });
            if (response.ok) {
                router.push('/');

                
            }
            
        } catch (error) {
            console.log(error)
            
            
        }finally{
            setIsSubmitting(false);
        }

    }
  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    
    />
  )
}

export default UpdatePrompt