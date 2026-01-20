"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewMatchPage() {
  const router = useRouter();

  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [overs, setOvers] = useState(2);

  async function handleCreateMatch(e) {
    e.preventDefault();

    if (!teamA || !teamB || teamA === teamB) {
      alert("Please select two different teams");
      return;
    }

    const res = await fetch("/api/match/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamA, teamB, overs }),
    });

    let data = {};
try {
  data = await res.json();
} catch {
  alert("Server error while creating match");
  return;
}


    if (!res.ok) {
      alert(data.error || "Failed to create match");
      return;
    }

    // Redirect to toss page
    router.push(`/match/${data.matchId}`);
  }

  return (
    <main>
      <h1>Create New Match</h1>

      <form onSubmit={handleCreateMatch}>
        <label>
          Team A:
          <input value={teamA} onChange={(e) => setTeamA(e.target.value)} />
        </label>

        <br />

        <label>
          Team B:
          <input value={teamB} onChange={(e) => setTeamB(e.target.value)} />
        </label>

        <br />

        <label>
          Overs:
          <select value={overs} onChange={(e) => setOvers(Number(e.target.value))}>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>

        <br /><br />

        <button type="submit">Proceed to Toss</button>
      </form>
    </main>
  );
}
