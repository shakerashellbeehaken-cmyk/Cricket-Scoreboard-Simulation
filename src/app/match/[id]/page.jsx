"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function TossPage() {
  const { id } = useParams();
  const router = useRouter();

  const [match, setMatch] = useState(null);
  const [tossWinner, setTossWinner] = useState(null);
  const [decision, setDecision] = useState(null);
  const [showStartPopup, setShowStartPopup] = useState(false);

  useEffect(() => {
    fetch(`/api/match/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "CREATED") {
          alert("Toss already completed");
          router.push("/dashboard");
          return;
        }
        setMatch(data);
      });
  }, [id, router]);

  const handleToss = () => {
    const winner = Math.random() < 0.5 ? match.teamA : match.teamB;
    setTossWinner(winner);
  };

  const submitDecision = async (choice) => {
    setDecision(choice);

    await fetch("/api/match/toss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matchId: id,
        decision: choice,
      }),
    });

    setShowStartPopup(true);
  };

  if (!match) return <p>Loading toss...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Toss</h2>

      {!tossWinner && (
        <button onClick={handleToss}>Flip Coin 🪙</button>
      )}

      {tossWinner && (
        <>
          <p>🎉 Toss Winner: <strong>{tossWinner}</strong></p>

          <p>Choose decision:</p>
          <button onClick={() => submitDecision("bat")}>Bat</button>
          <button onClick={() => submitDecision("bowl")}>Bowl</button>

        </>
      )}

      {showStartPopup && (
        <div style={{ marginTop: 20 }}>
          <p>Start First Innings?</p>
          <button onClick={() => router.push(`/match/${id}/play`)}>
            Yes
          </button>
          <button onClick={() => router.push("/dashboard")}>
            No
          </button>
        </div>
      )}
    </div>
  );
}
