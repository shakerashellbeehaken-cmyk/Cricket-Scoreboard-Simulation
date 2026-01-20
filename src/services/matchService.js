import { createMatch as createMatchRepo } from "@/repositories/matchRepository";
import { getMatchById, updateMatch } from "@/repositories/matchRepository";


export const createMatch = async ({ teamA, teamB, overs, userId }) => {
  return createMatchRepo({
    teamA,
    teamB,
    oversLimit: overs,
    createdBy: userId,
    status: "CREATED",
    innings: [],
  });
};



export const performToss = async ({ matchId, decision, userId }) => {
  const match = await getMatchById(matchId);

  if (!match) throw new Error("Match not found");
  if (match.createdBy.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // Step 1: Toss
  if (!match.tossWinner) {
    const winner = Math.random() < 0.5 ? match.teamA : match.teamB;
    match.tossWinner = winner;
    return updateMatch(matchId, match);
  }

  // Step 2: Decision
  if (!match.tossDecision && decision) {
    match.tossDecision = decision;

    // Initialize first innings
    const battingTeam =
      decision === "bat" ? match.tossWinner :
      match.tossWinner === match.teamA ? match.teamB : match.teamA;

    const bowlingTeam =
      battingTeam === match.teamA ? match.teamB : match.teamA;

    match.innings.push({
      battingTeam,
      bowlingTeam,
      totalRuns: 0,
      wickets: 0,
      oversCompleted: 0,
      ballsInCurrentOver: 0,
      players: [],
    });

    match.status = "IN_PROGRESS";
    match.currentInnings = 0;

    return updateMatch(matchId, match);
  }

  return match;
};
