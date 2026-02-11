import { POST } from "@/shared/api";

export async function loginUser(email: string, password: string) {
  const { data, error } = await POST("/users/login", {
    body: {
      user: { email, password },
    },
  });

  if (error || !data) {
    throw new Error("로그인에 실패했습니다.");
  }

  return data.user;
}
