import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, PlusCircle, ArrowRight, ShieldCheck, Users2 } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-800">
      
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-teal-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Community-Driven Social Development Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Gather for Good.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400">
            Transform Your Neighborhood.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Create, discover, and join local social service drives in your area. From winter clothes and warm blanket distribution in Mirpur & Mohammadpur to urban tree plantations and cleanups.
        </p>

        {/* CTA Action Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/events"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
          >
            <Calendar className="w-5 h-5" />
            <span>Explore Upcoming Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/create-event"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
          >
            <PlusCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Create an Event</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/80 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Verified Community Initiatives</span>
          </div>
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Over 1,450+ Active Citizen Volunteers</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Zero Platform Fees for Social Causes</span>
          </div>
        </div>

      </div>
    </section>
  );
}
