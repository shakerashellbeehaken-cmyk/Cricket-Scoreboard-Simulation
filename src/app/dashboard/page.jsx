// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getMatchesByUser } from "@/repositories/matchRepository";

// import styles from "./Dashboard.module.css";

// async function getMatches() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return [];
//   }

//   return getMatchesByUser(session.user.id);
// }


// export default async function DashboardPage() {
//   const matches = await getMatches();

//   return (
//     <section className={styles.dashboard}>
//       <div className={styles.header}>
//         <h1>Dashboard</h1>
//         <a href="/match/new" className={styles.createBtn}>
//           <button>+ Create New Match</button>
//         </a>
//       </div>
//        <h1>My Matches</h1>

//       {matches.map((match) => (
//         <div key={match._id}>
//           {match.teamA} vs {match.teamB}
//         </div>
//       ))}

//       <h2 className={styles.subTitle}>Match History</h2>

//       {matches.length === 0 && (
//         <p className={styles.empty}>No matches played yet.</p>
//       )}

//       <div className={styles.list}>
//         {matches.map((match) => (
//           <div key={match._id} className={styles.card}>
//             <div>
//               <strong>{match.teamA}</strong> vs{" "}
//               <strong>{match.teamB}</strong>
//             </div>

//             <div className={styles.meta}>
//               Status: {match.status} | RR: {match.runRate}
//             </div>

//             <a href={`/match/${match._id}`} className={styles.link}>
//               View Match →
//             </a>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

export default function DashboardPage() {
  return <div>Dashboard Page</div>;
}