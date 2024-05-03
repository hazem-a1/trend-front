"use client";

export default function Error(error: Error) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-3xl font-bold">some thing went wrong {error.message}</h1>
        </div>
    );
}