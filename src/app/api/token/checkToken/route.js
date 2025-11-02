import { queryDatabase } from "../../../db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokens = cookieStore.get("token")?.value;

    let tokenValue;

    if (tokens) {
      const userRoleQuery = `SELECT [Role]
              FROM [dbo].[USER_MST]
              WHERE [UserId] = '${tokens}'
          `;
      const userRoleResult = await queryDatabase(userRoleQuery);

      tokenValue = userRoleResult[0]?.Role;
    } else if (!tokens) {
      tokenValue = "NO";
    }

    return new Response(JSON.stringify({ role: tokenValue }), {
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
