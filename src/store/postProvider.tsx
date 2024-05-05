"use client";

import { TrendBlogPosts } from '@/types/posts';
import React, { createContext, useContext, useState } from 'react';

interface PostContextProps {
  posts: TrendBlogPosts;
  setPosts: (posts: TrendBlogPosts) => void;
}

const defaultValue: PostContextProps = {
    posts: [],
    setPosts: (posts: TrendBlogPosts) => {},
};

const PostContext = createContext<PostContextProps>(defaultValue);

export const PostProvider= ({ children }: {
    children: React.ReactNode;
}) => {
  const [posts, setPosts] = useState<TrendBlogPosts>([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};