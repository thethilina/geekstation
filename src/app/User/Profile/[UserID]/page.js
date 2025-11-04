"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page({ params }) {
  const userID = params.UserID;

  const [getAlluserData, setAllUserData] = useState(null);
  const [getAllPostData, setAllPostData] = useState([]);
  const [Bday, setBday] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const respond = await fetch(`../../../api/user/profile?uid=${userID}`);
        const userDatas = await respond.json();

        setAllUserData(userDatas.userData[0] || null);
        setAllPostData(userDatas.postData || []);

        const dateStr = userDatas.userData[0].BrithDay;
        const formattedDate = dateStr ? dateStr.split("T")[0] : "";
        setBday(formattedDate);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [userID]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      {isLoading ? (
        <p>Loading Details...</p>
      ) : (
        <>
          {getAlluserData ? (
            <div className="w-full flex flex-col justify-center items-center gap-5 h-[200px]">
              <p className="text-[30px] font-bold text-[#000000]">
                {getAlluserData.FName} {getAlluserData.LName} (
                {getAlluserData.UserName})
              </p>
              <p className="text-[15px] text-[#000000]">
                {getAlluserData.About || "NO ABOUT"}
              </p>
              <p className="text-[15px] text-[#000000]">
                {Bday || "SETTILE THE BIRTH DAY"}
              </p>
              <Link
                href="/User/Profile/EditInfo"
                className="w-[300px] h-[50px] border-1 border-black flex justify-center items-center"
              >
                Edit info
              </Link>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <div className="border-t-1 border-t-black w-full h-auto flex flex-wrap justify-center items-center gap-5 pt-[5px]">
            {getAllPostData.length > 0 ? (
              getAllPostData.map((post) => (
                <Link
                  key={post.PostID}
                  className="w-[300px] h-[150px] border border-black flex flex-col justify-center items-center"
                  href={`/User/${post.PostID}`}
                >
                  <p className="font-bold text-[20px] text-black">
                    {post.Topic}
                  </p>
                  <p className="text-[15px] text-gray-600">{post.PostedAt}</p>
                </Link>
              ))
            ) : (
              <p>NO POST TO FETCH...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
