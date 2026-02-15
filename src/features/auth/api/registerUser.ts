import { POST } from "@/shared/api";

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  const { data, error } = await POST("/users", {
    body: {
      user: { username, email, password },
    },
  });

  if (error || !data) {
    throw new Error("회원가입에 실패했습니다.");
  }

  return data.user;
}
