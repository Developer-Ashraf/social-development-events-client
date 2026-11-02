'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

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

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              Upcoming Initiatives
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Recent Upcoming Community Events
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              Discover the latest 6 community drives scheduled in your city. Get involved today.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 animate-pulse bg-slate-50 dark:bg-slate-800/40"
              >
                <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Events Cards Grid */}
        {!isLoading && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const formattedDate = event.eventDate
                ? format(new Date(event.eventDate), 'EEE, MMM d, yyyy')
                : 'Date TBA';

              return (
                <div
                  key={event._id}
                  className="flex flex-col h-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-200 group"
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.thumbnail || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/95 text-emerald-700 dark:text-emerald-400 shadow-md backdrop-blur-sm border border-slate-200/40 dark:border-slate-700/60">
                        {event.eventType}
                      </span>
                    </div>

                    {/* Formatted Date Stamp */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium text-white bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <Users className="w-3.5 h-3.5 text-teal-400" />
                        <span>{event.attendeesCount || 0} Joined</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {event.title}
                      </h3>

                      <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </p>

                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* View Event Button */}
                    <Link
                      href={`/events/${event._id}`}
                      className="w-full mt-2 py-3 rounded-xl text-center text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white border border-emerald-200/80 dark:border-emerald-800/60 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span>View Event Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && events.length === 0 && (
          <div className="text-center py-16 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No upcoming events yet</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Be the first to create a community drive in your area!
            </p>
            <Link
              href="/create-event"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
            >
              Create an Event
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
