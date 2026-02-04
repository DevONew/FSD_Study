"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArticlePreview, type Article, type ArticlesResponse } from "@/entities/article";
import { apiClient } from "@/shared/api";

interface TagsResponse {
  tags: string[];
}

export function FeedPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTag = searchParams?.get("tag") ?? null;

  useEffect(() => {
    async function fetchTags() {
      try {
        const data = await apiClient<TagsResponse>("/tags");
        setTags(data.tags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const endpoint = selectedTag
          ? `/articles?tag=${encodeURIComponent(selectedTag)}&limit=10`
          : "/articles?limit=10";
        const data = await apiClient<ArticlesResponse>(endpoint);
        setArticles(data.articles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [selectedTag]);

  function handleTagClick(tag: string) {
    router.push(`/?tag=${encodeURIComponent(tag)}`);
  }

  function handleClearTag() {
    router.push("/");
  }

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
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${!selectedTag ? "active" : ""}`}
                    onClick={handleClearTag}
                  >
                    Global Feed
                  </button>
                </li>
                {selectedTag && (
                  <li className="nav-item">
                    <span className="nav-link active">
                      # {selectedTag}
                    </span>
                  </li>
                )}
              </ul>
            </div>

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

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                {tags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className="tag-pill tag-default"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
