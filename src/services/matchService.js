// import * as repo from "@/repositories/matchRepository";
// import { teams } from "@/lib/teams";

// /* ---------------------------
//    CREATE NEW MATCH
// ---------------------------- */
// export async function createNewMatch(teamA, teamB, overs) {
//   const tossWinner = Math.random() < 0.5 ? teamA : teamB;

//   const battingTeam = tossWinner;
//   const bowlingTeam = tossWinner === teamA ? teamB : teamA;

//   const battingTeamPlayers =
//     teams.find(t => t.name === battingTeam).players;

//   const match = {
//     teamA,
//     teamB,
//     oversLimit: overs,

//     tossWinner,
//     battingTeam,
//     bowlingTeam,

//     innings: [
//       {
//         battingTeam,
//         bowlingTeam,

//         totalRuns: 0,
//         wickets: 0,

//         oversCompleted: 0,
//         ballsInOver: 0,

//         players: battingTeamPlayers.map(name => ({
//   name,
//   runs: 0,
//   balls: 0,
//   status: "yet_to_bat"
// })),

//         strikerIndex: 0,
//         nonStrikerIndex: 1,
//         nextBatsmanIndex: 2
//       }
//     ],

//     currentInnings: 0,
//     status: "in_progress"
//   };

//   // first two batsmen start
//   match.innings[0].players[0].status = "batting";
//   match.innings[0].players[1].status = "batting";

//   return repo.createMatch(match);
// }

// /* ---------------------------
//    PLAY BALL
// ---------------------------- */
// export async function playBall(matchId) {
//   const match = await repo.getMatchById(matchId);
//   if (match.status !== "in_progress") return match;

//   const inning = match.innings[match.currentInnings];
//   const striker = inning.players[inning.strikerIndex];

//   const outcomes = [0, 1, 2, 3, 4, 6, "W"];
//   const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

//   // count ball
//   inning.ballsInOver += 1;

//   /* ---------- RUN ---------- */
//   if (outcome !== "W") {
//     inning.totalRuns += outcome;
//     striker.runs += outcome;
//     striker.balls += 1;

//     // odd run → swap batsmen
//     if (outcome % 2 === 1) {
//       swapBatsmen(inning);
//     }
//   }

//   /* ---------- WICKET ---------- */
//   if (outcome === "W") {
//     striker.status = "out";
//     striker.balls += 1;
//     inning.wickets += 1;

//     if (inning.nextBatsmanIndex < 11) {
//       const newIndex = inning.nextBatsmanIndex;
//       inning.players[newIndex].status = "batting"
//       inning.strikerIndex = newIndex;
//       inning.nextBatsmanIndex += 1;
//     }
//   }

//   /* ---------- OVER COMPLETE ---------- */
//   if (inning.ballsInOver === 6) {
//     inning.oversCompleted += 1;
//     inning.ballsInOver = 0;
//     swapBatsmen(inning);
//   }

//   /* ---------- INNINGS END ---------- */
//   const inningsFinished =
//     inning.wickets === 10 ||
//     inning.oversCompleted === match.oversLimit;

//   if (inningsFinished) {
//     if (match.currentInnings === 0) {
//       startSecondInnings(match);
//     } else {
//       finishMatch(match);
//     }
//   }

//   return repo.updateMatch(matchId, match);
// }

// /* ---------------------------
//    PAUSE / RESUME
// ---------------------------- */
// export async function pauseMatch(matchId) {
//   const match = await repo.getMatchById(matchId);
//   if (match.status === "in_progress") {
//     match.status = "paused";
//   }
//   return repo.updateMatch(matchId, match);
// }

// export async function resumeMatch(matchId) {
//   const match = await repo.getMatchById(matchId);
//   if (match.status === "paused") {
//     match.status = "in_progress";
//   }
//   return repo.updateMatch(matchId, match);
// }

// export async function getMatchHistory() {
//   return repo.getAllMatches();
// }

// /* ---------------------------
//    HELPERS
// ---------------------------- */
// function swapBatsmen(inning) {
//   const temp = inning.strikerIndex;
//   inning.strikerIndex = inning.nonStrikerIndex;
//   inning.nonStrikerIndex = temp;
// }

// function startSecondInnings(match) {
//   const firstInnings = match.innings[0];
//   match.target = firstInnings.totalRuns + 1;

//   const secondBattingTeam = firstInnings.bowlingTeam;
//   const players =
//     teams.find(t => t.name === secondBattingTeam).players;

//   match.innings.push({
//     battingTeam: secondBattingTeam,
//     bowlingTeam: firstInnings.battingTeam,

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

//   match.innings[1].players[0].status = "batting";
//   match.innings[1].players[1].status = "batting";


//   match.currentInnings = 1;
// }

// function finishMatch(match) {
//   match.status = "completed";

//   const firstRuns = match.innings[0].totalRuns;
//   const secondRuns = match.innings[1].totalRuns;

//   match.winner =
//     secondRuns >= match.target
      // ? match.innings[1].battingTeam
//       : match.innings[0].battingTeam;
// }

import { createMatch, updateMatch } from "@/repositories/matchRepository";
import { attachMatchToUser } from "./userService";

/**
 * STEP 4.1 — Create Match (FOUNDATION)
 */
export const createMatchService = async ({
  userId,
  teamA,
  teamB,
  oversLimit,
}) => {
  const match = await createMatch({
    createdBy: userId,
    teamA,
    teamB,
    oversLimit,
    status: "ACTIVE",
    currentInnings: 1,
    innings1: {
      battingTeam: null,
      bowlingTeam: null,
      runs: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
      completed: false,
    },
    innings2: null,
    ballEvents: [],
  });

  await attachMatchToUser(userId, match._id);

  return match;
};

/**
 * STEP 4.2 — Toss Service
 */
export const tossService = async ({
  matchId,
  tossWinner,
  decision, // "bat" | "bowl"
}) => {
  return updateMatch(matchId, {
    tossWinner,
    tossDecision: decision,
    innings1: {
      battingTeam: decision === "bat" ? tossWinner : null,
      bowlingTeam: decision === "bowl" ? tossWinner : null,
    },
  });
};
