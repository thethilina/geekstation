//Thilina Dewmina
import { IoIosSearch } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";

export  const Nav = ()=>{

return(

<nav>

{/*logo*/}
<div>
GEEK STATION    
</div>

{/*searchbar*/}

<form>    
<input type="text"/>
<button>
<IoIosSearch />
</button>
</form>

{/*right 3 buttons*/}

<div>

{/*create post button*/}
<button>
<CiSquarePlus />
</button>

{/*account*/}
<div className="w-10 h-10 bg-gray-500 rounded-4xl">

</div>

</div>








</nav>


)


}