import {  sql ,queryDatabase} from "../../../db";
import { NextResponse } from "next/server";

export const DELETE = async(request)=>{

try{

const body = await request.json()

//get post id using body
const { postID} = body;

//check if they exist or not empty
if( !postID){

    return new NextResponse(JSON.stringify({Message: "values not found"}) , {status:404})
}

//make the query

const blogupquery = ` DELETE FROM POST_DTL
                    WHERE [postID] = '${postID}'

` 


//delete the blog

const updatedblog = await queryDatabase(blogupquery)



return new NextResponse(JSON.stringify({Message:"Blog deleted successfully"}) , {status:200})

}catch(e){

return new NextResponse(JSON.stringify("Error deleting blog"+e.message) , {status:500})


}





}

/*
    THILINA REFER MY FUNCTION PLEASE
*/

export async function GET(req) {

    try {

        const { searchParams } = new URL(req.url);
        const postID = searchParams.get("pid");

        const deleteQuery = `
            DELETE FROM [dbo].[POST_DTL]
            WHERE [PostID] = '${postID}'
        `;

        await queryDatabase(deleteQuery);

        return new Response(JSON.stringify({Message: 'S'}), {status: 200});
    } catch (err) {

        return new Response(JSON.stringify({Message : err.message}), {status : 400});
    }
}