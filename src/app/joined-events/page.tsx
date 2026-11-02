'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Clock,
  HeartHandshake
} from 'lucide-react';

interface JoinedItem {
  _id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  eventType: string;
  joinedAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function JoinedEventsPage() {
  const router = useRouter();
  const { user, token, isLoading: authLoading } = useAuth();

  const [joinedEvents, setJoinedEvents] = useState<JoinedItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Protected route check: Ensure session is evaluated before redirecting
  useEffect(() => {
    if (!authLoading && !user) {
      toast.info('Please log in to view your joined events.');
      router.push('/login?redirect=/joined-events');
    }
  }, [user, authLoading, router]);

  // Fetch joined events
  const fetchJoinedEvents = () => {
    if (!token) return;
    setIsLoading(true);

    fetch(`${API_BASE}/api/events/user/joined`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.joinedEvents) {
          setJoinedEvents(data.joinedEvents);
        }
      })
      .catch((err) => {
        console.error('Error fetching joined events:', err);
        toast.error('Failed to load your joined events.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user && token) {
      fetchJoinedEvents();
    }
  }, [user, token]);

  if (authLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50/50 dark:bg-slate-950/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>My Volunteer Commitments</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Joined Events
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Here are all the social development and community service drives you have signed up for, sorted by event date.
            </p>
          </div>

          <Link
            href="/events"
            className="self-start md:self-auto px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Explore More Drives</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 animate-pulse bg-white dark:bg-slate-900"
              >
                <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Joined Events Grid */}
        {!isLoading && joinedEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {joinedEvents.map((item) => {
              const formattedDate = item.eventDate
                ? format(new Date(item.eventDate), 'EEE, MMM d, yyyy')
                : 'Date TBA';

              const formattedJoined = item.joinedAt
                ? format(new Date(item.joinedAt), 'MMM d, yyyy')
                : 'Recently';

              return (
                <div
                  key={item._id}
                  className="flex flex-col h-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-200 group"
                >
                  {/* Thumbnail Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnail || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800'}
                      alt={item.eventTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/95 text-emerald-700 dark:text-emerald-400 shadow-md backdrop-blur-sm border border-slate-200/40">
                        {item.eventType}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-medium text-white bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.eventTitle}
                      </h3>

                      <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </p>

                      <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span>You signed up as a confirmed volunteer</span>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Joined on {formattedJoined}</span>
                      </div>
                    </div>

                    {/* View Event Button */}
                    <Link
                      href={`/events/${item.eventId}`}
                      className="w-full mt-2 py-3 rounded-xl text-center text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white border border-emerald-200/80 dark:border-emerald-800/60 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span>View Event</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && joinedEvents.length === 0 && (
          <div className="text-center py-20 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No joined events yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              You haven&apos;t joined any community drives yet. Browse upcoming initiatives and be part of the solution!
            </p>
            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
            >
              <span>Explore Upcoming Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
