import React from 'react';

const LoadingFallback = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-2xl font-bold">
                Loading...
            </div>
        </div>
    );
};

export default LoadingFallback;