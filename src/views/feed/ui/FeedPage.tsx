"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArticlePreview, type Article } from "@/entities/article";
import { GET } from "@/shared/api";

const ARTICLES_PER_PAGE = 10;

export function FeedPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTag = searchParams?.get("tag") ?? null;
  const currentPage = parseInt(searchParams?.get("page") ?? "1", 10) || 1;

  const pageCount = Math.ceil(articlesCount / ARTICLES_PER_PAGE);

  useEffect(() => {
    async function fetchTags() {
      try {
        const { data } = await GET("/tags");
        if (data?.tags) {
          setTags(data.tags);
        }
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
        const offset = (currentPage - 1) * ARTICLES_PER_PAGE;
        const { data } = await GET("/articles", {
          params: {
            query: {
              tag: selectedTag ?? undefined,
              limit: ARTICLES_PER_PAGE,
              offset,
            },
          },
        });
        if (data?.articles) {
          setArticles(data.articles as Article[]);
          setArticlesCount(data.articlesCount);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [selectedTag, currentPage]);

  function handleTagClick(tag: string) {
    router.push(`/?tag=${encodeURIComponent(tag)}`);
  }

  function handleClearTag() {
    router.push("/");
  }

  function handlePageChange(page: number) {
    const params = new URLSearchParams();
    if (selectedTag) {
      params.set("tag", selectedTag);
    }
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
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

            {pageCount > 1 && (
              <nav>
                <ul className="pagination">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                    (page) => (
                      <li
                        key={page}
                        className={`page-item ${page === currentPage ? "active" : ""}`}
                      >
                        <button
                          type="button"
                          className="page-link"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
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
