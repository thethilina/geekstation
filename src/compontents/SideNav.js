//Thilina-Dewmina
import { RiHome4Line } from "react-icons/ri";
import { MdShowChart } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";
import { LuHistory } from "react-icons/lu";
import { RiArticleLine } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";



export default function SideNav(){

return(


<div>

{/*Top 3 button*/}
<div>

{/*Home button*/}

<button>
<RiHome4Line />
<h1>Home</h1>
</button>


{/*Popular button*/}

<button>
<MdShowChart />
<h1>Popular</h1>
</button>


{/*explore button*/}

<button>
<FaRegCompass />
<h1>Explore</h1>
</button>
</div>


{/*Bottom 3 button*/}
<div>

{/*History button*/}

<button>
<LuHistory />
<h1>History</h1>
</button>


{/*your posts button*/}

<button>
<RiArticleLine />
<h1>Your Blogs</h1>
</button>


{/*read later button*/}

<button>
<MdOutlineWatchLater />
<h1>Read Later</h1>
</button>
</div>


{/* Very Bottom 3 button*/}
<div>

{/*settings button*/}

<button>
<IoSettingsOutline />
<h1>Settings</h1>
</button>


{/*feedback button*/}

<button>
<VscFeedback />
<h1>Send Feedbacks</h1>
</button>


</div>





</div>



)



}