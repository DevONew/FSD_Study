"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../api";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await loginUser(email, password);
      // TODO: 토큰 저장 로직 추가 필요
      console.log("로그인 성공:", user);
      router.push("/");
    } catch (err) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
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
        {isLoading ? "로그인 중..." : "Sign in"}
      </button>
    </form>
  );
}
