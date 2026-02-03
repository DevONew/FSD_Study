// Article 엔티티 타입 정의

export interface Author {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

// API 응답 타입
export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}
