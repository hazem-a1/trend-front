import { Suspense } from "react";
import { TrendBlogPost } from "@/types/posts";
import { serialize } from "next-mdx-remote/serialize";
import MDXContent from "@/components/MDXWrapper";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next'


export async function generateMetadata(
    { params }: { params: { id: string }
  }): Promise<Metadata> {
    const post = await fetchPost(params.id);
    const description = `${post.blogPost.replace(/\*\*/g, "").slice(0, 50)} ...`;
    const keywords = description.split(" ").slice(0,10).join(', ');
    return {
        title: post.title,
        description: description,
        keywords: keywords
    }
}

export default async function SingleBlog({
    params
}: {
    params: {
        id: string;
    }
}) {
    const post = await fetchPost(params.id);
    
    const source = await serialize(post.blogPost);
    return (
        
         <div className="max-w-2xl mx-auto py-8 px-4 md:px-0">
            <div className="bg-inherit shadow rounded-lg p-6 mb-8 flex items-center">
        {post.image && (
            <Image
                src={post.image}
                width={24}
                height={24}
                alt={post.title}
                className="w-24 h-24 object-cover mr-4"/>
        )}
        <div>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm mb-1">Traffic: {post.traffic}</p>
            <p className="text-sm">Date: {post.date}</p>
        </div>
         </div>
            <Suspense fallback={<>Loading...</>}>
                <div className="prose">
                <MDXContent source={source}/>
                </div>
            </Suspense>
            {post?.articles?.length && <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Related Topics</h2>
                {post.articles?.map((article, index) => (
                    <div key={index} className="mb-4">
                        <Link href={article.url} target="_blank">
                            <p className="text-blue-500 hover:underline">{article.title}</p>
                        </Link>
                        <p>Source: {article.source}</p>
                    </div>
                ))}
            </div>}
        </div>
    );
}

async function fetchPost(id: string) {
    try {
    const res = await fetch(`${process.env.API_URL}/posts/${id}`);
    return await res.json() as TrendBlogPost;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch post");
    }
}