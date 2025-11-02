'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {

  const [posts, setPosts] = useState([]);
  useEffect(() => {

    const fetchPosts = async () => {
      const posts = await fetch ('../../api/user/post');

      const data = await posts.json()

      setPosts(data)
    }

    fetchPosts();
  },[])


  return (
    <div className='flex flex-col justify-center items-center w-full gap-5'>
        User Dashboard
        <Link href="/User/Add" className='border-1 border-black w-[150px] h-[50px] text-center'>Add a Post</Link>

        <div className='flex justify-center flex-wrap items-center w-full h-auto gap-2'>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className='w-[300px] h-[150px] border border-black flex flex-col justify-center items-center'>
              <p className='font-bold text-[20px] text-black'>{post.Topic}</p>
              <p className='text-[15px] text-gray-600'>{post.FName} {post.LName}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}

        </div>
    </div>
  )
}
