import React from 'react';

export default function EventCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 animate-pulse bg-white dark:bg-slate-900 shadow-sm"
        >
          {/* Thumbnail Skeleton */}
          <div className="w-full h-52 bg-slate-200 dark:bg-slate-800 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" />
          </div>

          {/* Badge & Date Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-24" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-28" />
          </div>

          {/* Title Skeleton */}
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-4/5" />

          {/* Location & Desc Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          </div>

          {/* Button Skeleton */}
          <div className="h-11 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
        </div>
      ))}
    </div>
  );
}
