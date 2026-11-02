'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  ArrowLeft,
  CalendarPlus,
  ShieldCheck,
  Share2,
  Clock,
  HeartHandshake
} from 'lucide-react';

interface EventDetail {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName?: string;
  attendeesCount: number;
  isJoined?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  const router = useRouter();
  const { user, token } = useAuth();

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isJoining, setIsJoining] = useState<boolean>(false);

  const fetchEventDetails = () => {
    setIsLoading(true);
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    fetch(`${API_BASE}/api/events/${eventId}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.event) {
          setEvent(data.event);
        } else {
          toast.error(data.message || 'Event not found.');
        }
      })
      .catch((err) => {
        console.error('Error loading event:', err);
        toast.error('Failed to load event details.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchEventDetails();
  }, [eventId, token]);

  // Handle Join or Leave Event
  const handleJoinToggle = async () => {
    // If not logged in, redirect to login page with return url
    if (!user || !token) {
      toast.info('Please log in to join this community event!');
      router.push(`/login?redirect=/events/${eventId}`);
      return;
    }

    if (!event) return;

    setIsJoining(true);

    if (event.isJoined) {
      // Leave event
      try {
        const res = await fetch(`${API_BASE}/api/events/${eventId}/leave`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          toast.info('You have left this event.');
          setEvent({
            ...event,
            isJoined: false,
            attendeesCount: Math.max(0, (event.attendeesCount || 1) - 1)
          });
        } else {
          toast.error(data.message || 'Failed to leave event.');
        }
      } catch (err) {
        toast.error('Network error. Failed to leave event.');
      } finally {
        setIsJoining(false);
      }
    } else {
      // Join event
      try {
        const res = await fetch(`${API_BASE}/api/events/${eventId}/join`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          toast.success(data.message || 'You have successfully joined this event!');
          setEvent({
            ...event,
            isJoined: true,
            attendeesCount: (event.attendeesCount || 0) + 1
          });
        } else {
          toast.error(data.message || 'Failed to join event.');
        }
      } catch (err) {
        toast.error('Network error. Failed to join event.');
      } finally {
        setIsJoining(false);
      }
    }
  };

  // Google Calendar integration URL helper
  const getGoogleCalendarUrl = () => {
    if (!event) return '#';
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.location);
    const startDate = new Date(event.eventDate).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(new Date(event.eventDate).getTime() + 3 * 60 * 60 * 1000)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${endDate}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Join this social drive: ${event?.title}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Event link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="h-8 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl mb-6 animate-pulse" />
        <div className="h-96 w-full bg-slate-200 dark:bg-slate-800 rounded-3xl mb-8 animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
          <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-32 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Event Not Found</h2>
        <p className="text-slate-500 mt-2">The event you are looking for may have been removed or does not exist.</p>
        <Link
          href="/events"
          className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          Back to Upcoming Events
        </Link>
      </div>
    );
  }

  const formattedDate = event.eventDate
    ? format(new Date(event.eventDate), 'EEEE, MMMM d, yyyy')
    : 'Date TBA';

  return (
    <div className="py-12 bg-slate-50/50 dark:bg-slate-950/40 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Upcoming Events</span>
        </Link>

        {/* Hero Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
          
          {/* Main Thumbnail Image */}
          <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            
            {/* Category Tag */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-lg">
                {event.eventType}
              </span>
            </div>

            {/* Title & Core Details Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white space-y-3">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{formattedDate}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{event.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Ribbon: Join Button & Volunteer Counter */}
          <div className="p-6 sm:p-8 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            {/* Attendees Count */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {event.attendeesCount || 0}
                </p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Volunteers Signed Up
                </p>
              </div>
            </div>

            {/* Buttons: Join / Joined Toggle & Share */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="Share this event"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-sm transition-colors shadow-sm"
              >
                <CalendarPlus className="w-4 h-4 text-emerald-500" />
                <span>Add to Calendar</span>
              </a>

              {/* Primary Join Button */}
              <button
                onClick={handleJoinToggle}
                disabled={isJoining}
                className={`px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all duration-200 flex items-center gap-2 active:scale-95 disabled:opacity-70 ${
                  event.isJoined
                    ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                }`}
              >
                {isJoining ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : event.isJoined ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Joined (Click to Leave)</span>
                  </>
                ) : (
                  <>
                    <HeartHandshake className="w-5 h-5" />
                    <span>Join Event</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left 2 Cols: Description & Guidelines */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  About This Social Initiative
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {/* Volunteer Guidelines */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Volunteer Guidelines</span>
                </h3>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
                  <li>Please arrive 15 minutes before the scheduled time at the designated location.</li>
                  <li>Wear comfortable clothing suitable for physical social work and distribution.</li>
                  <li>Bring any pre-coordinated relief packages or item donations if requested.</li>
                </ul>
              </div>
            </div>

            {/* Right 1 Col: Organizer Details & Info */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Initiative Organizer
                </span>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-lg flex items-center justify-center shrink-0">
                    {(event.creatorName || event.creatorEmail)[0].toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {event.creatorName || 'Community Organizer'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {event.creatorEmail}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verified Platform Member</span>
                </div>
              </div>

              {/* Date & Time reminder */}
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Event Schedule</span>
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {formattedDate}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {event.location}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
