'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  Calendar,
  MapPin,
  Search,
  PlusCircle,
  Filter,
  Users,
  ArrowRight,
  Compass,
  Sparkles,
  RotateCcw
} from 'lucide-react';

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

const CATEGORIES = [
  'All',
  'Donation',
  'Cleanup',
  'Plantation',
  'Winter Relief',
  'Food Drive',
  'Health Camp',
  'Education'
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchEvents = () => {
    setIsLoading(true);
    let url = `${API_BASE}/api/events?`;

    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== 'All') {
      params.append('category', selectedCategory);
    }
    if (searchTerm.trim()) {
      params.append('search', searchTerm.trim());
    }

    fetch(`${url}${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.events) {
          setEvents(data.events);
        }
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEvents();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedCategory, searchTerm]);

  const getCategoryBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'winter relief':
      case 'clothing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'cleanup':
      case 'plantation':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'health camp':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'education':
        return 'bg-violet-100 text-violet-800 dark:bg-violet-950/80 dark:text-violet-300 border-violet-200 dark:border-violet-800';
      default:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }
  };

  return (
    <div className="py-12 bg-slate-50/60 dark:bg-slate-950/60 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Civic Action Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Explore Active Grassroots Drives
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Filter verified volunteer initiatives scheduled for upcoming dates. All drives with expired dates are automatically excluded.
            </p>
          </div>

          <Link
            href="/create-event"
            className="self-start md:self-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 flex items-center gap-2 active:scale-95 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Launch New Initiative</span>
          </Link>
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm mb-10 space-y-6">
          
          {/* Top Search Bar & Counter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search drives by name or district (e.g. Mirpur, Sylhet, Rangpur)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-medium"
              />
            </div>

            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 self-start sm:self-auto">
              {!isLoading ? `${events.length} Initiatives Found` : 'Loading directory...'}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              <Filter className="w-3.5 h-3.5 text-indigo-500" />
              <span>Filter by Cause Category</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-500/40'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 animate-pulse bg-white dark:bg-slate-900"
              >
                <div className="w-full h-52 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Events Grid */}
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
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.thumbnail || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border ${getCategoryBadge(event.eventType)}`}>
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

                  {/* Card Body */}
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
                      <span>Inspect Drive & Join</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && events.length === 0 && (
          <div className="text-center py-20 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              No matching upcoming drives
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              We couldn&apos;t find any scheduled initiatives matching your current criteria. Try resetting your search query or selecting &quot;All&quot; categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
