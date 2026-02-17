/**
 * @file PostDisplay.tsx
 * @brief React component that fetches and displays post data from an API.
 * @details Renders a post fetched from a configurable API URL. Handles
 * loading and error states. Uses native fetch for HTTP requests. Designed
 * to be testable with Jest by mocking the global fetch.
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

import React, { useState, useEffect } from 'react';

/**
 * @interface ApiPost
 * @type interface
 * @brief Structure of a post from the API.
 * @details Matches the shape returned by JSONPlaceholder or NestJS /api/posts/:id.
 */
export interface ApiPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * @interface PostDisplayProps
 * @type interface
 * @brief Props for the PostDisplay component.
 * @details Allows configuring the API URL and post ID to fetch.
 */
export interface PostDisplayProps {
  /** Base URL for the API (e.g. http://localhost:3000/api) */
  apiBaseUrl?: string;
  /** Post ID to fetch (default 1) */
  postId?: number;
}

/**
 * @class PostDisplay
 * @type class
 * @brief React component that fetches and displays a single post.
 * @details Fetches post data on mount, shows loading state, then displays
 * title and body. Renders error message on fetch failure.
 */
export const PostDisplay: React.FC<PostDisplayProps> = ({
  apiBaseUrl = 'http://localhost:3000/api',
  postId = 1,
}) => {
  const [post, setPost] = useState<ApiPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url: string = `${apiBaseUrl}/posts/${postId}`;
    const controller: AbortController = new AbortController();

    const fetchPost = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const response: Response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data: ApiPost = (await response.json()) as ApiPost;
        setPost(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchPost();
    return (): void => controller.abort();
  }, [apiBaseUrl, postId]);

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: {error}</div>;
  }

  if (!post) {
    return <div data-testid="empty">No post data</div>;
  }

  return (
    <div data-testid="post-display">
      <h2 data-testid="post-title">{post.title}</h2>
      <p data-testid="post-body">{post.body}</p>
    </div>
  );
};
