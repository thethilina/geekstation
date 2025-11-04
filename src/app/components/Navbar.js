"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [userData, setUSerData] = useState([]);

  useEffect(() => {
    const getUserID = async () => {
      const res = await fetch("../api/token/checkToken");

      const data = await res.json();
      setUSerData(data);
    };

    getUserID();
  }, []);

  async function logout() {
    await fetch("/app/api/logout", { method: "POST" });
    window.location.href = "/auth/Login";
  }
  return (
    <div className="w-full flex flex-row h-[50px] bg-[#000000] text-green-500 justify-center items-center gap-10">
      <Link href="/">GEEKSTATION</Link>

      <Link href="/User/Add">Add a Post</Link>

      {userData && userData.uid ? (
        <Link href={`/User/Profile/${userData.uid}`}>{userData.name}</Link>
      ) : (
        <p>NO USER</p>
      )}

      <button onClick={logout} className="text-red-500 hover:cursor-pointer">
        LOG OUT
      </button>
    </div>
  );
}
