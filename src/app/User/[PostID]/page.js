"use client";
import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page({ params }) {

  const router = useRouter();

  const resolvedPostID = use(params);
  const PostID = resolvedPostID.PostID;
  const [choosedPost, setChoosedPost] = useState([]);
  const [userID, setUserID] = useState(""); // to catch the userID

  /*
    We catch the useID here because 
    if the useID of the token and 
    userID of the POST_DTL equals then
    user must can be edit or delete the post

  */

  useEffect(() => {
    const getchChoosedPost = async () => {
      try {
        const respond = await fetch(
          `../../api/blog/post/choosedPost?PostID=${PostID}`
        );
        const data = await respond.json();
        setChoosedPost(data);

        const respondUser = await fetch("../../api/token/checkToken");
        const dataUSer = await respondUser.json();

        setUserID(dataUSer.uid);
        console.log("USERRR", choosedPost[0].UserID);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    getchChoosedPost();
  }, [PostID, userID]);

  const handDelete = async () => {

    const respondDelete = await fetch(`../../api/blog/delete?pid=${PostID}`);
    const replyDeleted = await respondDelete.json();

    if (replyDeleted.Message === 'S') {

      router.push("/");

    } else {

      alert(replyDeleted.Message);
    }

  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {choosedPost.length > 0 && choosedPost[0]?.UserID === userID ? (
        <div className="flex flex-row h-[50px] w-full justify-center items-center gap-5 mt-[-350px] mb-[150px]">
          <Link href={`/User/${PostID}/Edit`} className="w-[150px] h-[50px] bg-blue-500 text-[20px] text-[#FFFFFF] font-bold flex justify-center items-center">EDIT</Link>
          <button className="w-[150px] h-[50px] bg-red-500 text-[20px] text-[#FFFFFF] font-bold hover:cursor-pointer" onClick={handDelete}>DELETE</button>
        </div>
      ) : (
        <div></div>
      )}
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
