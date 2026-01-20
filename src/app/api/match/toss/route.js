import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Match from "@/models/Match";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { matchId, decision } = await req.json();

  await connectDB();

  const match = await Match.findById(matchId);

  if (!match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }

  // 🔒 OWNER CHECK
  if (match.createdBy.toString() !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (match.toss.winner) {
    return NextResponse.json(
      { error: "Toss already completed" },
      { status: 400 }
    );
  }

  const winner = Math.random() > 0.5 ? match.teamA : match.teamB;

  match.toss.winner = winner;
  match.toss.decision = decision; // "bat" | "bowl"
  match.status = "IN_PROGRESS";

  await match.save();

  return NextResponse.json({
    message: "Toss completed",
    winner,
    decision,
  });
}
