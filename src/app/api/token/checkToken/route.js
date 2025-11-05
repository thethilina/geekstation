import { queryDatabase } from "../../../db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokens = cookieStore.get("token")?.value;

    let tokenValue;
    let fullName;
    let userRoleResult

    if (tokens) {
      const userRoleQuery = `
              SELECT [Role]
                  ,[FName]
                  ,[LName]
                  ,[Image]
              FROM [dbo].[USER_MST]
              WHERE [UserId] = '${tokens}'
          `;
      userRoleResult = await queryDatabase(userRoleQuery);

      tokenValue = userRoleResult[0]?.Role;
      fullName = userRoleResult[0]?.FName+" "+userRoleResult[0]?.LName;

    } else if (!tokens) {
      tokenValue = "NO";
    }

    return new Response(JSON.stringify({ role: tokenValue, name: fullName, uid: tokens, box: userRoleResult}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
