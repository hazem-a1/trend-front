"use client";

import { useEffect, useRef, useState } from 'react';
import { BlogCard } from './BlogCard';
import { TrendBlogPosts, TrendBlogPostsResponse } from '@/types/posts';

export default function ClientBlog() {
    const [hasMore, setHasMore] = useState(true);

  const [posts, setPosts] = useState<TrendBlogPosts>([]);
  const [page, setPage] = useState(2);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
    console.log("Intersecting! Fetching more posts...");

        }
      });
    }, options);

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    if (!hasMore) {
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [hasMore]);

  async function fetchPosts() {
    const res = await fetch(`https://trending-myth.koyeb.app/posts?page=${page}&size=10&sort=date&order=asc`);
    const json = await res.json() as TrendBlogPostsResponse;
    
    setPosts((prevPosts) => [...prevPosts, ...json.posts]);
    // If the number of posts fetched is less than the requested size, we've reached the end of the feed
    if (json.posts.length < 10) {
        setHasMore(false);
    }
  }

return (
    <div>
        {posts.map((post) => (
            <BlogCard key={post._id} {...post} />
        ))}
        {hasMore ? (
            <div ref={loadMoreRef} className="load-more">Load more...</div>
        ) : (
            <div>{`You've reached the end of the feed.`}</div>
        )}
    </div>
);
}