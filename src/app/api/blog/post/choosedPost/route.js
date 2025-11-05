import { queryDatabase } from "../../../../db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const PostID = searchParams.get("PostID");

    const choosedPostQuery = `
            SELECT B.[PostID] 
                ,B.[Topic]
                ,B.[post]
                ,B.[postedAt]
                ,B.[Image]
                ,U.[FName]
                ,U.[LName]
                ,B.[UserID]
            FROM [dbo].[POST_DTL] AS B
            INNER JOIN [dbo].[USER_MST] AS U
            ON B.[UserID] = U.[UserID]
            WHERE B.[PostID] = '${PostID}'
        `;

    const data = await queryDatabase(choosedPostQuery);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ Error: err }), { status: 400 });
  }
}
