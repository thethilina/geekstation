import { queryDatabase } from "../../../db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("uid");

    const getAllDataOfUser = `
            SELECT [UserID]
                ,[FName]
                ,[LName]
                ,[UserName]
                ,[Email]
                ,[BrithDay]
                ,[About]
                ,[Image]
            FROM [dbo].[USER_MST]
            WHERE [UserID] = '${userID}'
        `;

    const getAllDataOfUserPost = `
            SELECT
                [PostID]
                ,[Topic]
                ,[Post]
                ,[Image]
                ,[Cate]
                ,[PostedAt]
            FROM [dbo].[POST_DTL]
            WHERE [UserID] = '${userID}'
        `;

    const result_of_User_DATA = await queryDatabase(getAllDataOfUser);
    const result_of_user_Post_DATA = await queryDatabase(getAllDataOfUserPost);

    return new Response(
      JSON.stringify({
        userData: result_of_User_DATA,
        postData: result_of_user_Post_DATA,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ errrr: err, errMesg: err.message }), {
      status: 400,
    });
  }
}

export async function POST(req) {
  try {
    const FormData = await req.formData();
    const userName = FormData.get("userName");
    const about = FormData.get("about");
    const userID = FormData.get("uid");
    const BDay = FormData.get("Bday");

    const updateQuery = `
            UPDATE [dbo].[USER_MST]
            SET [UserName] = '${userName}'
                ,[BrithDay] = '${BDay}'
                ,[About] = '${about}'
                ,[CreatedAt] = (SELECT [CreatedAt] FROM [dbo].[USER_MST] WHERE [UserID] = '${userID}')
                ,[UpdateAt] = (GETDATE())
            WHERE [UserID] = '${userID}'
        `;

    await queryDatabase(updateQuery);

    return new Response(JSON.stringify({ didSuccess: "S" }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: err.message, didSuccess: "F" }),
      { status: 400 }
    );
  }
}
