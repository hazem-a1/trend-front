import { TrendBlogPost } from "@/types/posts";
import Link from "next/link";

export default function SearchResultCard({ result }: { result: TrendBlogPost }) {
    return (
        <li className="mb-1 bg-blue-500">
            <Link href={`/blog/${result._id}`} className="block p-4 rounded-lg shadow-lg hover:bg-black-100 transition-colors duration-200">
                <h2 className="text-xl font-bold mb-2">{result.title}</h2>
                <div className="mt-2 text-sm">
                    <span>Posted on {result.date}</span>
                    <span> • </span>
                    <span>{result.country_iso} {result.traffic}</span>
                </div>
            </Link>
        </li>
    );
}