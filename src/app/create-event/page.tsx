'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import {
  Calendar,
  MapPin,
  Image as ImageIcon,
  Tag,
  FileText,
  PlusCircle,
  ArrowLeft,
  Mail,
  AlertCircle
} from 'lucide-react';

const CATEGORIES = [
  'Donation',
  'Cleanup',
  'Plantation',
  'Winter Relief',
  'Food Drive',
  'Health Camp',
  'Education'
];

const PRESET_THUMBNAILS = [
  { label: 'Winter Clothes', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800' },
  { label: 'Blanket Relief', url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800' },
  { label: 'Lake Cleanup', url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800' },
  { label: 'Tree Plantation', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800' }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function CreateEventPage() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  // Calculate minimum date allowed (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    title: '',
    eventType: 'Donation',
    eventDate: minDateString,
    location: '',
    thumbnail: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Protected route check: Ensure session is checked before redirecting
  useEffect(() => {
    if (!isLoading && !user) {
      toast.info('Please log in to create a community event.');
      router.push('/login?redirect=/create-event');
    }
  }, [user, isLoading, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !token) {
      toast.error('You must be logged in to create an event.');
      return;
    }

    // Form field validation
    if (
      !formData.title.trim() ||
      !formData.location.trim() ||
      !formData.description.trim() ||
      !formData.eventDate
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Strict Future Date Validation
    const selectedDate = new Date(formData.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime()) || selectedDate <= today) {
      toast.error('Event date must be in the future. Past dates cannot be added.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        eventType: formData.eventType,
        thumbnail: formData.thumbnail.trim() || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
        location: formData.location.trim(),
        eventDate: formData.eventDate
      };

      const res = await fetch(`${API_BASE}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to create event.');
        setIsSubmitting(false);
        return;
      }

      toast.success(data.message || 'Event created successfully!');
      router.push('/events');

    } catch (err) {
      console.error('Error creating event:', err);
      toast.error('Network error. Failed to create event.');
      setIsSubmitting(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50/50 dark:bg-slate-950/40 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Upcoming Events</span>
        </Link>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5">
          
          <div className="space-y-2 mb-8">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              Social Service Drive
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Create a Community Event
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Organize a local relief effort, environmental cleanup, or community support drive.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Event Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Event Title <span className="text-emerald-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Winter Clothes Distribution - Mirpur 10, Dhaka"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Row: Event Type & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Event Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-emerald-500" />
                  <span>Event Type</span>
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Date (Strict Future Date Validation) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>Event Date</span> <span className="text-emerald-500">*</span>
                </label>
                <input
                  type="date"
                  name="eventDate"
                  min={minDateString}
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  Date must be in the future (today or later).
                </p>
              </div>

            </div>

            {/* Location / Venue */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Location / Venue</span> <span className="text-emerald-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Thumbnail Image URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                <span>Thumbnail Image URL</span>
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />

              {/* Quick Preset Buttons */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400">Quick presets:</span>
                {PRESET_THUMBNAILS.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, thumbnail: preset.url })}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-600 dark:text-slate-300 hover:text-emerald-600 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Event Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>Event Description</span> <span className="text-emerald-500">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Attached User Email Badge */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>Organizer Email attached:</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">{user.email}</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  <span>Publish Event</span>
                </>
              )}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
