import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Virtual Cricket Match</h1>

      <p>
        Play a virtual cricket match ball-by-ball.
        Login to start a new match or continue previous ones.
      </p>

     <Link href="/login">
  <button>Login</button>
</Link>

    </main>
  );
}
