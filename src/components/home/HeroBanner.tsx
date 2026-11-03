import React from 'react';
import Link from 'next/link';
import { Compass, Calendar, PlusCircle, ArrowRight, ShieldCheck, Users, MapPin, Sparkles, Heart } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 border-b border-slate-200/80 dark:border-slate-800/80">
      
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Vision & Calls to Action */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Next-Gen Grassroots Volunteer Network</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Mobilize Your City.{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 dark:from-indigo-400 dark:via-blue-300 dark:to-violet-400">
                Spark Lasting Change.
              </span>
            </h1>

            {/* Mission Statement */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              CivicPulse empowers citizens, youth changemakers, and local leaders to coordinate real-world welfare drives. From warm clothing distributions and emergency food relief to neighborhood cleanups and free medical clinics.
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/events"
                className="px-7 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
              >
                <Calendar className="w-5 h-5" />
                <span>Explore Live Drives</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/create-event"
                className="px-6 py-3.5 rounded-2xl text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <PlusCircle className="w-5 h-5 text-indigo-500" />
                <span>Start an Initiative</span>
              </Link>
            </div>

            {/* Volunteer Social Proof Avatar Stack */}
            <div className="pt-4 flex items-center gap-4">
              <div className="flex -space-x-2.5 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Volunteer" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Volunteer" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Volunteer" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Volunteer" />
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-extrabold text-slate-900 dark:text-white">3,200+ Volunteers</span> actively participating across Bangladesh
              </div>
            </div>

          </div>

          {/* Right Column: Visual Spotlight Card & Floating Trust Chips */}
          <div className="lg:col-span-5 relative">
            
            {/* Spotlight Showcase Card */}
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-indigo-950/10 dark:shadow-black/40 overflow-hidden">
              
              {/* Image banner */}
              <div className="relative h-52 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800"
                  alt="Spotlight Event"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                
                {/* Urgent Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-bold tracking-wide uppercase flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>Spotlight Drive</span>
                </div>

                {/* Location overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mirpur-10 & Mohammadpur, Dhaka</span>
                  </span>
                  <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px]">
                    Winter Relief
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Winter Warmth & Blanket Distribution Drive 2026
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  Distributing heavy blankets and warm thermal jackets to street dwellers, rickshaw pullers, and underprivileged families before harsh cold waves.
                </p>

                {/* Progress Meter */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Volunteer Goal</span>
                    <span className="text-indigo-600 dark:text-indigo-400">68 Pledged / 80 Needed</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full w-[85%]" />
                  </div>
                </div>

                {/* Action button inside spotlight */}
                <div className="pt-2">
                  <Link
                    href="/events"
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/60 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Event & Pledge Participation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Floating Trust Badge: Bottom Left */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">100% Verified Organizers</p>
                <p className="text-[9px] text-slate-500 dark:text-slate-400">Direct on-ground accountability</p>
              </div>
            </div>

            {/* Floating Trust Badge: Top Right */}
            <div className="hidden sm:flex absolute -top-5 -right-6 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Heart className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Zero Commercial Ads</p>
                <p className="text-[9px] text-slate-500 dark:text-slate-400">Pure community welfare</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
