import { useState } from "react";
import { register } from "../api/client";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await register(email, password);
      alert("Registration successful! You can now log in.");
    } catch {
      alert("Registration failed");
    }
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h1>Create Account</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}