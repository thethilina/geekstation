import {  sql ,queryDatabase} from "../../../db";
import { NextResponse } from "next/server";

export const PATCH = async(request)=>{

try{

const body = await request.json()

//get fieldtoedit name and the new value of field using body
const {fieldtoedit , newvalue , postID} = body;

//check if they exist or not empty
if(!fieldtoedit || !newvalue || !postID){

    return new NextResponse(JSON.stringify({Message: "values not found"}) , {status:404})
}

//make the query

const blogupquery = ` UPDATE POST_DTL
                    SET [${fieldtoedit}] = '${newvalue}'
                    WHERE [postID] = '${postID}'

` 


//update the table

const updatedblog = await queryDatabase(blogupquery)



return new NextResponse(JSON.stringify({Message:"Blog updated successfully"}) , {status:200})

}catch(e){

return new NextResponse(JSON.stringify("Error updating blog table"+e.message) , {status:500})


}





}