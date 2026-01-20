"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>

      <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Sign in with Google
      </button>

      <button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
        Sign in with GitHub
      </button>

      <hr />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn("credentials", {
            email: e.target.email.value,
            password: e.target.password.value,
            callbackUrl: "/dashboard",
          });
        }}
      >
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      <p>
        New here? <Link href="/signup">Register</Link>
      </p>
    </div>
  );
}
