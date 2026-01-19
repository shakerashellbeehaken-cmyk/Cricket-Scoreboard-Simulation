// "use client";

// import { useEffect, useState } from "react";
// import styles from "./Match.module.css";

// export default function Match({ matchId }) {
//   const [match, setMatch] = useState(null);

//   async function fetchMatch() {
//     const res = await fetch("/api/match/history");
//     const matches = await res.json();
//     const current = matches.find((m) => m._id === matchId);
//     setMatch(current);
//   }

//   async function playBall() {
//     await fetch("/api/match/play-ball", {
//       method: "POST",
//       body: JSON.stringify({ matchId }),
//     });
//     fetchMatch();
//   }

//   async function pauseMatch() {
//     await fetch("/api/match/pause", {
//       method: "POST",
//       body: JSON.stringify({ matchId }),
//     });
//     fetchMatch();
//   }

//   async function resumeMatch() {
//     await fetch("/api/match/resume", {
//       method: "POST",
//       body: JSON.stringify({ matchId }),
//     });
//     fetchMatch();
//   }

//   useEffect(() => {
//     fetchMatch();
//   }, []);

//   if (!match) return <p>Loading match...</p>;

//   const inning = match.innings[match.currentInnings];
//   const oversText = `${inning.oversCompleted}.${inning.ballsInOver}`;

//   // Target logic (only show in 2nd innings)
//   const isSecondInnings = match.currentInnings === 1;
//   const target = isSecondInnings
//     ? match.innings[0].runs + 1
//     : null;

//   return (
//     <section className={styles.match}>
//       <h1 className={styles.title}>
//         {match.teamA} vs {match.teamB}
//       </h1>
//     <p className={styles.commentary}>
//   {match.tossWinner} won the toss and chose to {match.tossDecision}
// </p>
//       <p className={styles.status}>Status: {match.status}</p>
//       <p>
//   Toss Winner: <strong>{match.tossWinner}</strong>
// </p>

// <p>
//   Batting: {inning.battingTeam} | Bowling: {inning.bowlingTeam}
// </p>


//       <div className={styles.scoreBox}>
//         <p className={styles.innings}>
//           Innings {match.currentInnings + 1}
//         </p>
        

//         <p className={styles.score}>
//   {inning.totalRuns}/{inning.wickets}
// </p>


//         <p className={styles.overs}>Overs: {oversText}</p>

//         <p className={styles.runRate}>Run Rate: {match.runRate}</p>
//         <table className={styles.batsmen}>
//   <thead>
//     <tr>
//       <th>Batsman</th>
//       <th>R</th>
//       <th>B</th>
//       <th>Status</th>
//     </tr>
//   </thead>
//   <tbody>
//     {inning.players.map((p) => (
//       <tr key={p.name}>
//         <td>{p.name}</td>
//         <td>{p.runs}</td>
//         <td>{p.balls}</td>
//         <td>{p.status}</td>
//       </tr>
//     ))}
//   </tbody>
// </table>


//         {match.currentInnings === 1 && (
//   <p className={styles.target}>
//     Target: {match.target}
//   </p>
// )}

        
//         {isSecondInnings && (
//           <p className={styles.target}>Target: {target}</p>
//         )}
//       </div>

//       <div className={styles.controls}>
//         <button
//           onClick={playBall}
//           disabled={match.status !== "in_progress"}
//         >
//           Play Ball
//         </button>

//         <button
//           onClick={pauseMatch}
//           disabled={match.status !== "in_progress"}
//         >
//           Pause
//         </button>

//         <button
//           onClick={resumeMatch}
//           disabled={match.status !== "paused"}
//         >
//           Resume
//         </button>
//       </div>

//       {match.status === "completed" && (
//         <p className={styles.winner}>
//           Winner: {match.winner}
//         </p>
//       )}
//     </section>
//   );
// }
