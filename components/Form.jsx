import Link from 'next/link'
import React from 'react'

const Form = ({  
  type,
  post,
  setPost,
  submitting,
  handleSubmit}
) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>

      <p
      className='desc text-left max-w-md'
      >
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
        </p>
      <form 
      onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label htmlFor="prompt"
        
        >
          <span
          className='font-satoshi font-semibold text-base text-gray-700'
          >
          Your AI Prompt
          </span>

          <textarea
          placeholder='Write your post here'
          name="prompt"
           id="prompt"
           required
           className='form_textarea '
           value={post.prompt}
           onChange={(e)=>setPost({...post,prompt: e.target.value})}
           
           />


        </label>


        <label htmlFor="tag"
        
        >
         <span className='font-satoshi font-semibold text-base text-gray-700'>
            Field of Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>

          <input
          placeholder='#Tag'
          type='text'
          value={post.tag}
          onChange={(e)=>setPost({...post,tag: e.target.value})}
          name="tag"
           id="tag"
          className='form_input'
          required
           
           />


        </label>

        <div 
        className='flex-end mx-3 mb-5 gap-4'
        >
          <Link
          href='/'
          className='text-gray-500 text-sm hover:bg-gray-800 hover:text-white px-5 py-1.5 rounded-full'
          >
            Cancel
          </Link>

          <button
          type='submit'
          disabled={submitting}
          className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white hover:bg-orange-400'
          >
            {submitting ? `${type}ing`:type}
          </button>

        </div>


      </form>

    </section>
  )
}

export default Form