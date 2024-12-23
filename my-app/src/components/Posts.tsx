import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // API pages usually start from 1
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      if (response.data.length === 0) {
        setError("No more posts available.");
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
      }
    } catch (error) {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // Infinite Scroll Logic
  useEffect(() => {
    const lastPostElement = document.querySelector("#last-post");
    if (!lastPostElement) return;

    const loadMorePosts = (entries: any[]) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(loadMorePosts, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (lastPostElement) {
      observer.current.observe(lastPostElement);
    }

    return () => {
      if (observer.current && lastPostElement) {
        observer.current.unobserve(lastPostElement);
      }
    };
  }, [posts]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>

      {/* Loader */}
      {loading && <div className="text-center py-4">Loading...</div>}

      {/* Sentinel to trigger loading more posts */}
      <div id="last-post" className="h-2"></div>
    </div>
  );
};

export default Posts;
