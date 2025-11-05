//Thilina Dewmina
import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";

export  default function  Nav(){

return(

<nav className="flex font-gothic  text-[#71CA84] items-center justify-between px-20 py-3 border-b-1 border-gray-500">

{/*logo*/}
<div className="text-2xl font-semibold">
GEEK STATION    
</div>

{/*searchbar*/}

<form className="flex py-1  ">    
<input type="text" className="border-l-2 border-t-2 border-b-2   text-white  border-gray-500  pl-15 py-2 rounded-l-3xl bg-[#161616]"/>
<button className="rounded-r-3xl border-r-2  border-t-2 border-b-2  py-2 border-gray-500 pr-4  bg-[#2D2D2D]">
<IoIosSearch size={23} className="text-white ml-2"/>
</button>
</form>


{/*right 3 buttons*/}

<div className="flex gap-15">

{/*create post button*/}
<button className="bg-[#161616] p-1 px-2 rounded-xl border-gray-500 border-1">
<GoPlus size={25} className="text-white"/>
</button>

{/*account*/}
<div className="w-10 h-10 bg-gray-500 rounded-4xl">

</div>

</div>








</nav>


)


}