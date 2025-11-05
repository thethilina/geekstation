"use client"
//Thilina-Dewmina

import { RiHome4Line } from "react-icons/ri";
import { MdShowChart } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";
import { LuHistory } from "react-icons/lu";
import { RiArticleLine } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";


export default function SideNav(){

const [ishidden , sethidden] = useState(false)


const hidesidebar = ()=>{

if (ishidden){
    sethidden(false)
}else{
    sethidden(true)
}


}

return(


<div className={` left-0 top-19 fixed font-gothic text-lg  flex text-gray-300 h-full w-70 z-50 `}>


<div className={`${ishidden? "hidden" : "block"} flex flex-col  px-5`}>

{/*Top 3 button*/}

<div className="flex flex-col gap-y-4  border-b-2 border-gray-500 py-4">

{/*Home button*/}

<button className="flex items-center align-baseline gap-x-5 rounded-xl px-2 py-1  hover:bg-[#161616] cursor-pointer">
<RiHome4Line size={25}/>
<h1>Home</h1>
</button>


{/*Popular button*/}

<button className="flex items-center align-baseline gap-x-5 rounded-xl px-2 py-1  hover:bg-[#161616] cursor-pointer">
<MdShowChart size={25}/>
<h1>Popular</h1>
</button>


{/*explore button*/}

<button className="flex items-center align-baseline gap-x-5 rounded-xl px-2 py-1  hover:bg-[#161616] cursor-pointer">
<FaRegCompass size={25}/>
<h1>Explore</h1>
</button>
</div>


{/*Bottom 3 button*/}
<div className="flex flex-col gap-y-4  border-b-2 border-gray-500 py-4">

{/*History button*/}

<button className="flex items-center align-baseline gap-x-5 rounded-xl px-2 py-1  hover:bg-[#161616] cursor-pointer">
<LuHistory size={25} />
<h1>History</h1>
</button>


{/*your posts button*/}

<button className="flex items-center align-baseline gap-x-5 rounded-xl px-2 py-1  hover:bg-[#161616] cursor-pointer">
<RiArticleLine size={25} />
<h1>Your Blogs</h1>
</button>


{/*read later button*/}

<button className="flex items-center align-baseline gap-x-5 rounded-xl px-2 py-1  hover:bg-[#161616] cursor-pointer">
<MdOutlineWatchLater size={25} />
<h1>Read Later</h1>
</button>
</div>


{/* Very Bottom 3 button*/}
<div className="flex flex-col gap-y-4  border-b-2 border-gray-500 py-4">

{/*settings button*/}

<button className="flex items-center align-baseline gap-x-5 rounded-xl px-2 py-1  hover:bg-[#161616] cursor-pointer">
<IoSettingsOutline  size={25}/>
<h1>Settings</h1>
</button>


{/*feedback button*/}

<button className="flex items-center align-baseline gap-x-5 rounded-xl px-2 py-1  hover:bg-[#161616] cursor-pointer">
<VscFeedback size={25} />
<h1>Feedbacks</h1>
</button>


</div>

</div>

{/*tggle button*/}
<div className="relative h-screen w-12 border-r-2 border-gray-500">
  <div onClick={()=>{hidesidebar()}}  className="absolute top-10 -right-6 w-12 h-12 bg-[#0D0D0D] border-2 border-gray-500 rounded-full flex items-center justify-center hover:cursor-pointer">
    <GiHamburgerMenu className="text-gray-300 text-xl" />
  </div>
</div>



</div>



)



}