import React from "react";

const Loading = () => {
  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
              <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
            </div>
            
            {/* Content */}
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;