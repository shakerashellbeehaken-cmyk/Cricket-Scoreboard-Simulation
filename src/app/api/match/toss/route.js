// import Match from "@/models/Match";
// import { connectDB } from "@/lib/db";
// import { teams } from "@/lib/teams";

// export async function POST(req) {
//   await connectDB();

//   const { matchId, decision } = await req.json();
//   const match = await Match.findById(matchId);

//   if (!match || match.tossDecision) {
//     return Response.json({ error: "Invalid toss state" }, { status: 400 });
//   }

//   match.tossDecision = decision;

//   let battingTeam, bowlingTeam;

//   if (decision === "bat") {
//     battingTeam = match.tossWinner;
//     bowlingTeam =
//       match.tossWinner === match.teamA ? match.teamB : match.teamA;
//   } else {
//     bowlingTeam = match.tossWinner;
//     battingTeam =
//       match.tossWinner === match.teamA ? match.teamB : match.teamA;
//   }

//   const players =
//     teams.find(t => t.name === battingTeam).players;

//   match.innings.push({
//     battingTeam,
//     bowlingTeam,

//     totalRuns: 0,
//     wickets: 0,
//     oversCompleted: 0,
//     ballsInOver: 0,

//     players: players.map(name => ({
//       name,
//       runs: 0,
//       balls: 0,
//       status: "yet_to_bat"
//     })),

//     strikerIndex: 0,
//     nonStrikerIndex: 1,
//     nextBatsmanIndex: 2
//   });

//   match.innings[0].players[0].status = "batting";
//   match.innings[0].players[1].status = "batting";

//   match.status = "in_progress";

//   await match.save();
//   return Response.json(match);
// }
