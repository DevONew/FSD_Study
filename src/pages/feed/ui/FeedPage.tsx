"use client";

import { useEffect, useState } from "react";
import { ArticlePreview, type Article, type ArticlesResponse } from "@/entities/article";
import { apiClient } from "@/shared/api";

export function FeedPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await apiClient<ArticlesResponse>("/articles?limit=10");
        setArticles(data.articles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {loading ? (
              <div className="article-preview">Loading articles...</div>
            ) : articles.length === 0 ? (
              <div className="article-preview">No articles yet.</div>
            ) : (
              articles.map((article) => (
                <ArticlePreview key={article.slug} article={article} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
