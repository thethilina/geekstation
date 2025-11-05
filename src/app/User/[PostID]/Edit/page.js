'use client'
import { useRouter } from 'next/navigation';
import React, { use, useState, useEffect } from 'react'

export default function Page({params}) {

    const router = useRouter()

    const resolvedPostID = use(params);
    const PostID = resolvedPostID.PostID;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {

        const getOldData = async () => {

            const respond = await fetch(`../../../api/blog/post/choosedPost?PostID=${PostID}`)
            const oldData = await respond.json();

            setTitle(oldData[0].Topic);
            setContent(oldData[0].post);

        };

        getOldData()
    },[])


    const handUpdate = async () => {

        const formData = new FormData()
        formData.append("title", title);
        formData.append("body", content);
        formData.append("pid", PostID);

        const editRespond = await fetch('../../../api/blog/edit', {
            method : 'POST',
            body : formData
        })

        const replyEditRespond = await editRespond.json();

        if(replyEditRespond.Message === 'S') {

            router.push("/");
            alert(replyEditRespond)
            
        } else {
            alert(replyEditRespond.Message);
        }
    }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[400px] h-[300px] flex flex-col justify-center items-center gap-5 border-1 border-black"
      >
        <p className="font-bold text-[30px]">Edit the blog</p>
        <input
          type="text"
          placeholder="Title"
          className="w-[300px] h-[30px] border-2 border-black font-bold"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-[300px] border-2 border-black mt-5"
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="button"
          className="w-[100px] h-[30px] border-2 border-black mt-5 cursor-pointer"
          onClick={handUpdate}
        >
          Edit
        </button>
      </form>
    </div>
  )
}
