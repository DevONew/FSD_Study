"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../api";

export function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await registerUser(username, email, password);
      // TODO: 토큰 저장 로직 추가 필요
      console.log("회원가입 성공:", user);
      router.push("/");
    } catch (err) {
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <ul className="error-messages">
          <li>{error}</li>
        </ul>
      )}

      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </fieldset>

      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </fieldset>

      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </fieldset>

      <button
        className="btn btn-lg btn-primary pull-xs-right"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "가입 중..." : "Sign up"}
      </button>
    </form>
  );
}
