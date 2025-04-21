"use client";
import Image from "next/image"
import Link from "next/link";

import { signIn , signOut , useSession , getProviders  } from 'next-auth/react';
import { useEffect, useState } from "react";


const Nav = () => {
  const {data:session}=useSession();

  const [providers, setProviders] = useState(null);

  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(()=>{
    (async () => {
      const response=await getProviders();
      setProviders(response);
    }

    )();
  },[]);



  return (
    <nav className='flex-between w-full mb-16 pt-3'>
     <Link 
     href='/' className='flex gap-2 flex-center'
     >
     <Image
     src='/assets/images/logo.svg'
     alt='logo'
     width={30}
     height={30}
     className='object-contain'
     />

    <p className='logo_text'>Promptpedia</p>
     </Link>

     {/* Desktop Navigation */}


     <div
     className="sm:flex hidden"
     >

      {session?.user ? (
        <div 
        className="flex gap-3 md:gap-5"
        >
        <Link
        href='/create-prompt'
        className='black_btn'
        >
        Create Post
        </Link>
        <button
        type="button"
        onClick={signOut}
        className='outline_btn'
        >
          Sign Out
        </button>

        <Link
        href='/profile'
        >
        <Image
       src={session?.user.image}
        width={37}
        height={37}
        alt="profile"
        className="rounded-full"
        />

        </Link>
        </div>
      ) : (
        <>
        {providers && 
        Object.values(providers).map((provider)=>(
          <button
          key={provider.name}
          onClick={()=>signIn(provider.id)}
          className="black_btn"
          
          >
            Sign In
          </button>
        ))}
        
        </>
      )}

     </div>


     {/* Mobile Navigation */}

     <div
     
     className="sm:hidden flex relative">

      {session?.user ? (
        <div>
          <Image 
      src={session?.user.image}
      onClick={()=>setToggleDropDown((prev)=>!prev)}

      width={37}
      height={37}
      className='rounded-full'
      alt='profile'

      />

      {toggleDropDown && (
        <div className="dropdown">
          <Link
          href='/profile'
          onClick={()=>setToggleDropDown(false)}

            className='dropdown_link'
          
          >
          Profile
          </Link>


          <Link
          href='/create-prompt'

          onClick={()=>setToggleDropDown(false)}

            className='dropdown_link'
          >
          Create Post
          </Link>

          <button
          type="button"
          onClick={()=>{
            setToggleDropDown(false);
            signOut();}}

            className='mt-5 w-full black_btn'
          >
            Sign Out
          </button>
          
        </div>
      )}
        </div>
      ) : (
        <>
        {providers && 
        Object.values(providers).map((provider)=>(
          <button
         
          type="button"
          onClick={()=>{
           signIn(provider.id);

          }}
          className="black_btn"

          key={provider.name}
          >
            Sign In
          </button>
        ))}
        
        </>
      )}




     </div>

     


    </nav>
  )
}

export default Nav