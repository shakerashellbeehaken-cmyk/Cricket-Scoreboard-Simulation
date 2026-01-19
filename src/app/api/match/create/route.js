// import { createNewMatch } from "@/services/matchService";

// export async function POST(req) {
//   try {
//     const { teamA, teamB, overs } = await req.json();

//     if (!teamA || !teamB || !overs) {
//       return Response.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const match = await createNewMatch();

//     return Response.json(match, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return Response.json(
//       { error: "Failed to create match" },
//       { status: 500 }
//     );
//   }
// }
