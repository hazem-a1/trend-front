"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string };
    reset: () => void;
  }) {
    useEffect(() => {
        console.error(error);
      }, [error]);
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1 className="text-3xl font-bold">some thing went wrong</h1>
            <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
        </div>
    );
}