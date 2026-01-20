import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import { createMatch } from "@/services/matchService";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { teamA, teamB, overs } = await req.json();

  if (!teamA || !teamB || !overs) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  if (teamA === teamB) {
    return Response.json({ error: "Teams must be different" }, { status: 400 });
  }

  await connectDB();

  const match = await createMatch({
    teamA,
    teamB,
    overs,
    userId: session.user.id,
  });

  return Response.json({ matchId: match._id }, { status: 201 });
}
