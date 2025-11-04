'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

export default function page() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {

      // first we need to get the userID from the cookies
      const userIDData = await fetch('../api/token');
      const userData = await userIDData.json();

      const posts = await fetch (`../api/blog/post?uid=${userData.token}`);

      const data = await posts.json()

      setPosts(data)

    }

    fetchPosts();
  },[])


  return (
    <div className='flex flex-col justify-center items-center w-full gap-5'>
        User Dashboard
      
        <div className='flex justify-center flex-wrap items-center w-full h-auto gap-2'>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Link key={index} className='w-[300px] h-[150px] border border-black flex flex-col justify-center items-center' href={`/User/${post.PostID}`}>
              <p className='font-bold text-[20px] text-black'>{post.Topic}</p>
              <p className='text-[15px] text-gray-600'>{post.FName} {post.LName}</p>
            </Link>
          ))
        ) : (
          <p>No posts available.</p>
        )}

        </div>
    </div>
  )
}
