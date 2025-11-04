'use client'
import React, { useEffect, useState } from 'react'

export default function Page({ params }) {
  const PostID = params.PostID; 
  const [choosedPost, setChoosedPost] = useState([]);

  useEffect(() => {
    const getchChoosedPost = async () => {
      try {
        const respond = await fetch(
          `../../api/blog/post/choosedPost?PostID=${PostID}`
        );
        const data = await respond.json();
        setChoosedPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    getchChoosedPost();
  }, [PostID]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {choosedPost.length > 0 ? (
        choosedPost.map((post) => (
          <div
            className="border-1 border-black w-[700px] h-auto pb-[10px] pt-[10px] pl-[15px] pr-[15px] flex flex-col gap-5"
            key={post.PostID}
          >
            <p className="font-bold text-[30px] text-black">{post.Topic}</p>
            <p className="font-bold text-[20px] text-black">
              {post.FName} {post.LName}
            </p>
            <p className="text-[20px] text-black">{post.post}</p>
          </div>
        ))
      ) : (
        <p>LOADING.....</p>
      )}
    </div>
  );
}
