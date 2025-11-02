import { queryDatabase } from "../../../db";

export async function GET() {

    try {
        const allPostsQuery = `
            SELECT B.[Topic]
                ,B.[post]
                ,B.[postedAt]
                ,B.[Image]
                ,U.[FName]
                ,U.[LName]
            FROM [dbo].[POST_DTL] AS B
            INNER JOIN [dbo].[USER_MST] AS U
            ON B.[UserID] = U.[UserID]
        `;

        const data = await queryDatabase(allPostsQuery);
        
        return new Response(JSON.stringify(data), {status: 200});
    } catch (err) {

        return new Response(JSON.stringify( {Error: err}), {status: 400});
    }
}