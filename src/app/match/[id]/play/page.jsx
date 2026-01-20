"use client";

import { useParams } from "next/navigation";

export default function PlayMatchPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: "24px" }}>
      <h1>Match Play Page</h1>
      <p>Match ID: {id}</p>
      <p>First innings will start here.</p>
    </div>
  );
}
