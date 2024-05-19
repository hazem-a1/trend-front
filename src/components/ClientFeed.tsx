"use client";

import { useEffect, useRef, useState } from 'react';
import { BlogCard } from './BlogCard';
import { TrendBlogPostsResponse } from '@/types/posts';
import { usePostContext } from '@/store/postProvider';

export default function ClientBlog() {
  const { posts, setPosts } = usePostContext();
  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(2);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    void fetchPosts();
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
    const res = await fetch(`/api?page=${page}&size=10&sort=lastupdated&order=desc`, { cache: 'no-store' });
    const json = await res.json() as TrendBlogPostsResponse;
    
    setPosts(posts.concat(json.posts));
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
          
            <div ref={loadMoreRef}>
              <svg  className="animate-spin animate-infinite animate-ease-out h-5 w-5 mr-3 " viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              </svg>
              </div>
        ) : (
            <div>{`You've reached the end of the feed.`}</div>
        )}
    </div>
);
}