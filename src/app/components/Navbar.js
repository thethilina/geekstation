//Thilina Dewmina
"use client";
import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Nav() {
  const [Imagex, setImage] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const getProfilePicture = async () => {
      const respond = await fetch("/api/token/checkToken");
      const data = await respond.json();
      console.log("API RESPONSE:", data);

      const img = data.box?.[0]?.Image;
      console.log("Fetched image:", img);
      setImage(img);
      setUserID(data.uid);
    };
    getProfilePicture();
  }, []);

  return (
    <nav className="flex font-gothic top-0  fixed w-full text-[#71CA84] items-center justify-between px-20 py-3 border-b-2 border-gray-500 bg-[#000000]">
      {/*logo*/}
      <Link className="text-xl font-semibold" href="/">
        GEEK STATION
      </Link>

      {/*searchbar*/}

      <form className="flex py-1">
        <input
          type="text"
          className="border-l-2 border-t-2 border-b-2   text-white  border-gray-500  pl-15 py-2 rounded-l-3xl bg-[#161616]"
        />
        <button className="rounded-r-3xl border-r-2  border-t-2 border-b-2  py-2 border-gray-500 pr-4  bg-[#2D2D2D] hover:cursor-pointer hover:bg-[#202020]">
          <IoIosSearch size={23} className="text-white ml-2" />
        </button>
      </form>

      {/*right 3 buttons*/}

      <div className="flex gap-15">
        {/*create post button*/}
        <Link
          className="bg-[#161616] flex justify-center items-center p-1 rounded-xl border-gray-500 border-1 hover:cursor-pointer hover:bg-[#202020]"
          href="/User/Add"
        >
          <GoPlus size={25} className="text-white" />
        </Link>

        {/*account*/}
        <Link href={`/User/Profile/${userID}`}>
          <Image
            src={Imagex}
            width={40}
            height={40}
            className="w-10 h-10 rounded-4xl border-1 border-white"
            alt="Profile Image"
          />
        </Link>
      </div>
    </nav>
  );
}
