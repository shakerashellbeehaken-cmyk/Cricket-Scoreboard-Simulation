"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignupPage() {
  async function handleRegister(e) {
    e.preventDefault();

    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      signIn("credentials", {
        email: body.email,
        password: body.password,
        callbackUrl: "/dashboard",
      });
    }
  }

  return (
    <div>
      <h1>Register</h1>

      <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Sign up with Google
      </button>

      <button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
        Sign up with GitHub
      </button>

      <hr />

      <form onSubmit={handleRegister}>
        <input name="name" placeholder="Name" />
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
