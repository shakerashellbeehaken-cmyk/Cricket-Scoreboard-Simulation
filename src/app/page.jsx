import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Virtual Cricket Match</h1>

      <p>
        Play a simple virtual cricket match.
        Create a match, play ball by ball, pause, resume,
        and view match history.
      </p>

      <Link href="/dashboard">
        <button>Go to Dashboard</button>
      </Link>
    </main>
  );
}
