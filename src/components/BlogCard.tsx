import Image from "next/image";
import Link from "next/link";

export const BlogCard = ({ _id, title, traffic, image, date, blogPost }: {
    _id: string;
    title: string;
    traffic: string;
    image: string;
    date: string;
    blogPost: string;
}) => {
    return (
        <div className="flex flex-col items-center justify-between p-4 shadow-md bg-white dark:bg-zinc-800 rounded-lg bg-clip-padding mt-1">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-zinc-500">Traffic: {traffic}</p>
            {image && (
                <Image
                    src={image}
                    width={24}
                    height={24}
                    alt="Blog Image"
                    className="w-12 h-12 object-cover rounded-full mb-2" />
            )}
            <time>{date}</time>
            <div className="prose prose-lg mb-8">{blogPost.slice(0, 50).replace("**", "")}...</div>
            <div className="flex justify-end mt-4">
                <Link href={`/blog/${_id}`}>
                    <div className="bg-orange-500 hover:bg-orange-700 text-white py-1 px-2 rounded-lg">Learn More</div>
                </Link>
            </div>
        </div>
    );
};
