import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 🔒 Auth guard (NO logout here)
  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <main style={{ padding: "32px" }}>
      <h1>Dashboard</h1>

      {/* Logout */}
      <LogoutButton />

      {/* Profile */}
      <section style={{ marginTop: "24px" }}>
        <h2>Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        {user.image && (
          <img
            src={user.image}
            alt="Profile"
            width={80}
            height={80}
            style={{ borderRadius: "50%" }}
          />
        )}
      </section>

      {/* Frequent Player */}
      <section style={{ marginTop: "24px" }}>
        <h3>Frequent Player</h3>
        <p>Coming soon</p>
      </section>

      {/* Match History */}
      <section style={{ marginTop: "24px" }}>
        <h3>Previous Matches</h3>
        <MatchHistory />
      </section>

      {/* Start Match */}
      <section style={{ marginTop: "24px" }}>
        <Link href="/match/new">
          <button>Start New Match</button>
        </Link>
      </section>
    </main>
  );
}

/* ---------- Server Component for history ---------- */
async function MatchHistory() {
  const res = await fetch("http://localhost:3000/api/match/history", {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>Failed to load match history.</p>;
  }

  const matches = await res.json();

  if (matches.length === 0) {
    return <p>No matches played yet.</p>;
  }

  return (
    <ul>
      {matches.map((match) => (
        <li key={match._id}>
          {match.teamA} vs {match.teamB} — {match.status}
        </li>
      ))}
    </ul>
  );
}
