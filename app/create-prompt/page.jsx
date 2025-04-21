"use client";

import Form from "@components/Form";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "@node_modules/next/navigation";
import { useState } from "react";



const CreatePrompt = () => {

    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const [submitting, setIsSubmitting] = useState(false);

    const router=useRouter();
    const {data: session}=useSession();

    const createPrompt=async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response=await fetch("/api/prompt/new",{
                method:'POST',
                body:JSON.stringify({
                    prompt:post.prompt,
                    userId:session?.user.id,
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
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    
    />
  )
}

export default CreatePrompt