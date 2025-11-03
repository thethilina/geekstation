import { queryDatabase } from "../../../db";

export async function POST(req) {
  try {
    const FormData = await req.formData();
    const postTitle = FormData.get("title");
    const postContent = FormData.get("content");
    const authorId = FormData.get("uid");

    // creating the BlogID
    const blogCountResult = await queryDatabase(
      `SELECT * FROM [dbo].[POST_DTL]`
    );
    const blogCount = blogCountResult.length;
    let newBlogId;
    if (blogCount === 0) {
      newBlogId = `BID${String(blogCount + 1).padStart(13, "0")}`;
    } else {
      // now we must get the last BlogId from the database and increment it by 1
      const LastBlog = await queryDatabase(
        `SELECT RIGHT(MAX([PostID]), 13) FROM [dbo].[POST_DTL]`
      );
      const lastBlogIdNumber = parseInt(LastBlog[0][""]) + 1;
      newBlogId = `BID${String(lastBlogIdNumber).padStart(13, "0")}`;
    }

    // now we cant insert these values to the database
    const insertQry = `

            INSERT INTO [dbo].[POST_DTL]
                ([PostID]
                ,[UserID]
                ,[Topic]
                ,[post]
                ,[Image])
            VALUES (

                '${newBlogId}',
                '${authorId}',
                '${postTitle}',
                '${postContent}',
                ''

            )
        
        `;
    await queryDatabase(insertQry);

    return new Response(JSON.stringify({ respond: "S" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ Error: err.message, respond: "F" }), {
      status: 500,
    });
  }
}
