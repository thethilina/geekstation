import { queryDatabase } from "../../../db";

export async function GET(req) {
  try {
    /*
            Thilina said he wants to 
            make the dashboard as showing blogs
            according to the user's interested category.
            So we have to get the userID from the query params
            and then we can get the user's interested category
            from the CATEGORY_DTL table.
        */

    // First we get the userID and then we can get his inerested category
    const { searchParams } = new URL(req.url);
    const UserID = searchParams.get("uid");
    console.log("UserID in blog post route: ", UserID);
    //now lets get the user's interested category
    const userIneterestedCategoriesQuery = `
            SELECT [Category]
            FROM [dbo].[CATEGORY_DTL]
            WHERE [UserID] = '${UserID}'
        `;
    const userCategoriesResult = await queryDatabase(
      userIneterestedCategoriesQuery
    );
    let categories = []; // to store categories
    let data = []; // to store final posts data
    console.log(userCategoriesResult);
    // now lets store those categories into an array
    if (userCategoriesResult) {
      // storing categories
      for (const row of userCategoriesResult) {
        categories.push(row.Category);
        console.log(row.Category);
      }
      console.log(categories);
      // nice now we have to get the posts according to these categories
      for (const category of categories) {
        const postsAccordingToCategoriesQuery = `
                    SELECT B.[PostID] 
                        ,B.[Topic]
                        ,B.[post]
                        ,B.[postedAt]
                        ,B.[Image]
                        ,U.[FName]
                        ,U.[LName]
                    FROM [dbo].[POST_DTL] AS B
                    INNER JOIN [dbo].[USER_MST] AS U
                    ON B.[UserID] = U.[UserID]
                    WHERE B.[Cate] = '${category}'

                `;
        const postsResult = await queryDatabase(
          postsAccordingToCategoriesQuery
        );
        data = data.concat(postsResult);
      }
    } else {
      // if the user has no interested category, we can return all posts
      const allPostsQuery = `
                SELECT B.[PostID] 
                    ,B.[Topic]
                    ,B.[post]
                    ,B.[postedAt]
                    ,B.[Image]
                    ,U.[FName]
                    ,U.[LName]
                FROM [dbo].[POST_DTL] AS B
                INNER JOIN [dbo].[USER_MST] AS U
                ON B.[UserID] = U.[UserID]
            `;
      data = await queryDatabase(allPostsQuery);
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ Error: err }), { status: 400 });
  }
}
