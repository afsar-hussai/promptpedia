"use client";


import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PostCardList=({ data , handleTagClick })=>{
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}

        />
      ))}
    </div>
  )
}



const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts=async ()=>{
    try {
      const response=await fetch('/api/prompt');
      const data=await response.json();
      setPosts(data);
      
    } catch (error) {
      console.log("Unable to Fetch all Posts because ", error)
      
    }
  }


  useEffect(()=>{

    

    fetchPosts();
  },[]);

  const filterPrompts=(searchText)=>{
    const regex=new RegExp(searchText,"i"); // case insensitive
    return posts.filter((item)=>
      regex.test(item.creator.username) || 
      regex.test(item.prompt) || 
      regex.test(item.tag))
  }

  const handleTagClick=(tagName)=>{
    setSearchText(tagName);
    const searchResults=filterPrompts(tagName);
    setSearchedResults(searchResults);

  }

  const handleSearchChange=(e)=>{
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults=filterPrompts(e.target.value);
        setSearchedResults(searchResults);
      }, 500)
    )

  }

  return (
    <section className='feed'>

      <form  className='relative w-full flex-center'>
      <input
      
      placeholder='Search for a tag or a username'
      type="text"
      value={searchText}
      onChange={handleSearchChange}
      className='search_input peer'
      required
      />

      </form>
      
      {searchText? (<PostCardList
      data={searchedResults}
      handleTagClick={handleTagClick}
      />): (<PostCardList 
      data={posts}
      handleTagClick={handleTagClick}
      />)}
      
    </section>
  )
}

export default Feed