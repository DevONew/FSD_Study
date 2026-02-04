import { mockArticles, mockTags } from "./mock-data";

// 개발용: 목 데이터 사용 (실제 API 서버가 CORS 문제로 사용 불가)
const USE_MOCK = true;

// 기본 API 클라이언트
export async function apiClient<T>(
  endpoint: string,
  _options?: RequestInit
): Promise<T> {
  // 목 데이터 모드
  if (USE_MOCK) {
    // 네트워크 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 태그 목록 API
    if (endpoint === "/tags") {
      return { tags: mockTags } as T;
    }

    // 기사 목록 API (태그 필터링 지원)
    if (endpoint.startsWith("/articles")) {
      const url = new URL(endpoint, "http://localhost");
      const tag = url.searchParams.get("tag");

      if (tag) {
        const filteredArticles = mockArticles.articles.filter((article) =>
          article.tagList.includes(tag)
        );
        return {
          articles: filteredArticles,
          articlesCount: filteredArticles.length,
        } as T;
      }

      return mockArticles as T;
    }

    throw new Error(`Mock not implemented for: ${endpoint}`);
  }

  // 실제 API 호출 (현재 CORS 문제로 사용 불가)
  const { BACKEND_URL } = await import("@/shared/config");
  const url = `${BACKEND_URL}${endpoint}`;

  const response = await fetch(url, {
    ..._options,
    headers: {
      "Content-Type": "application/json",
      ..._options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
