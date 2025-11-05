"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const [uName, setUName] = useState("");
  const [Bday, setBday] = useState("");
  const [about, setAbout] = useState("");
  const [userID, setUserID] = useState("");
  const [Imaged, setImage] = useState(null);

  useEffect(() => {
    const getOldValues = async () => {
      try {
        const respondToken = await fetch("../../api/token/checkToken");
        const tokenData = await respondToken.json();
        setUserID(tokenData.uid);

        const respondUserData = await fetch(
          `../../api/user/profile?uid=${tokenData.uid}`
        );
        const userDatas = await respondUserData.json();

        setUName(userDatas.userData[0].UserName);
        setAbout(userDatas.userData[0].About);

        const dateStr = userDatas.userData[0].BrithDay;
        const formattedDate = dateStr ? dateStr.split("T")[0] : "";
        setBday(formattedDate);

        console.log("BEFORE", dateStr);
        console.log("AFTER", formattedDate);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    getOldValues();
  }, []);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("userName", uName);
    formData.append("Bday", Bday);
    formData.append("about", about);
    formData.append("uid", userID);
    formData.append("image", Imaged);

    const respond = await fetch("../../../api/user/profile", {
      method: "POST",
      body: formData,
    });

    const updatedResult = await respond.json();

    if (updatedResult.didSuccess === "S") {
      router.push("/");
      console.log(updatedResult.url);
    } else {
      alert(updatedResult.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full h-auto pt-[10px] pb-[10px] flex flex-col justify-center items-center text-[#000000] gap-5"
      >
        <input
          type="text"
          placeholder="UserName"
          className="border-1 border-black rounded-[5px] w-[300px] h-[50px] pl-[10px]"
          defaultValue={uName}
          onChange={(e) => setUName(e.target.value)}
        />

        <input
          type="date"
          placeholder="Birthday"
          className="border-1 border-black rounded-[5px] w-[300px] h-[50px] pl-[10px]"
          defaultValue={Bday}
          onChange={(e) => setBday(e.target.value)}
        />

        <input
          type="text"
          placeholder="About me"
          className="border-1 border-black rounded-[5px] w-[300px] h-[50px] pl-[10px]"
          defaultValue={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <input
          type="file"
          placeholder="select an Image"
          className="border-1 border-black rounded-[5px] w-[300px] h-[50px] pl-[10px]"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="button"
          className="w-[300px] h-[50px] bg-[#000000] text-white hover:cursor-pointer"
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
    </div>
  );
}
