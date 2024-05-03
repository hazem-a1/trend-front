export interface Article {
    title: string;
    source: string;
    url: string;
}

export interface Trend {
    title: string;
    traffic: string;
    image: string;
    date: string;
    articles: Array<Article>;
}


export interface TrendBlogPost extends Trend {
    _id: string;
    blogPost: string;
    published: boolean;
    country_iso: string;
    lastupdated: number;
}

export type TrendBlogPosts = Array<TrendBlogPost>;
export type TrendBlogPostsResponse = {
    total: number;
    posts: TrendBlogPosts;
    page: number;
    size: number;
}