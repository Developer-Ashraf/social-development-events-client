'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, ArrowRight, Sparkles, Clock } from 'lucide-react';

interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  attendeesCount?: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function RecentEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/events/recent-upcoming`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.events) {
          setEvents(data.events);
        }
      })
      .catch((err) => {
        console.error('Error fetching recent events:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Category badge color helper
  const getCategoryTheme = (type: string) => {
    switch (type.toLowerCase()) {
      case 'winter relief':
      case 'clothing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'environment':
      case 'tree plantation':
      case 'cleanup':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'healthcare':
      case 'medical':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'education':
      case 'youth':
        return 'bg-violet-100 text-violet-800 dark:bg-violet-950/80 dark:text-violet-300 border-violet-200 dark:border-violet-800';
      default:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50/70 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Verified Civic Campaigns</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Urgent Upcoming Drives Across Your City
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
              Grassroots community service drives scheduled soon. Explore verified initiatives and join fellow volunteers on the ground.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-800 shadow-sm transition-all group shrink-0"
          >
            <span>Explore All Initiatives</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 animate-pulse bg-white dark:bg-slate-900"
              >
                <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Events Cards Grid */}
        {!isLoading && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const eventDateObj = event.eventDate ? new Date(event.eventDate) : null;
              const formattedDate = eventDateObj
                ? format(eventDateObj, 'EEE, MMM d, yyyy')
                : 'Date TBA';

              return (
                <div
                  key={event._id}
                  className="flex flex-col h-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-950/10 dark:hover:shadow-black/50 hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.thumbnail || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border ${getCategoryTheme(event.eventType)}`}>
                        {event.eventType}
                      </span>
                    </div>

                    {/* Formatted Date & Attendee Stamp */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white">
                      <div className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-indigo-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-indigo-400/30 text-indigo-200">
                        <Users className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{event.attendeesCount || 0} Volunteers</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {event.title}
                      </h3>

                      <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </p>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* View Event Button */}
                    <Link
                      href={`/events/${event._id}`}
                      className="w-full mt-2 py-3 rounded-2xl text-center text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white border border-indigo-200/80 dark:border-indigo-800/60 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Inspect Drive & Pledge Support</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
