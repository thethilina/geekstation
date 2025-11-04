"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    const getUserID = async () => {
      const reponse = await fetch("../../api/token");
      const data = await reponse.json();
      setUid(data.token);
    };

    getUserID();
  }, []);

  const postBlog = async () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("uid", uid);

    const response = await fetch("../../api/blog/add", {
      method: "POST",
      body: formdata,
    });

    const data = await response.json();

    if (data.respond === "S") {
      alert("Blog Posted Successfully");
      setTitle("");
      setContent("");
      router.push("/User");

    } else if (data.respond === "F") {
      alert("Error Occurred: " + data.Error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[400px] h-[300px] flex flex-col justify-center items-center gap-5 border-1 border-black"
      >
        <p className="font-bold text-[30px]">Add a blog</p>
        <input
          type="text"
          placeholder="Title"
          className="w-[300px] h-[30px] border-2 border-black font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-[300px] border-2 border-black mt-5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="button"
          className="w-[100px] h-[30px] border-2 border-black mt-5 cursor-pointer"
          onClick={postBlog}
        >
          Post
        </button>
      </form>
    </div>
  );
}
