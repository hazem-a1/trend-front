"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { TrendBlogPosts, TrendBlogPostsResponse } from "@/types/posts";
import SearchResultCard from "../SearchResultCard";

export default function Search() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [searchResults, setSearchResults] = useState<TrendBlogPosts>([]);

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            // Clicked outside, clear search results and search term
            setSearchResults([]);
        }
    };

    const handleOneChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value);
    }

    const handleSearch = useCallback(
        debounce((searchTerm: string) => {
            // api calls go here
            if (searchTerm) {
                fetchPosts(searchTerm);
            }
        }, 500), // Debounce for 300 milliseconds
        [fetchPosts]
    );

    async function fetchPosts(searchTerm: string,page:number=1) {
        const res = await fetch(`/api/search?text=${searchTerm}&page=${page}`, { cache: 'no-store' });
        const json = await res.json() as TrendBlogPostsResponse;
        setSearchResults(json.posts);
    }

    useEffect(() => {
        // Add the click event listener when the component mounts
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Remove the click event listener when the component unmounts
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="relative" ref={wrapperRef}>
            <input ref={searchInputRef} type="search" placeholder="Search" className="p-2 rounded-lg bg-inherit" onChange={handleOneChange} />
            {searchResults?.length ? <ul className="absolute overflow-auto z-10">
                {searchResults.map((result, index) => (
                    <SearchResultCard key={index} result={result} />
                ))}
            </ul> : null}
        </div>
    );
}   