'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Image as ImageIcon,
  ShieldCheck,
  Save,
  Calendar,
  Sparkles,
  HeartHandshake,
  FolderCog
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';


export default function ProfilePage() {
  const router = useRouter();
  const { user, token, isLoading: authLoading, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    photoURL: ''
  });
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.info('Please log in to view your profile.');
      router.push('/login?redirect=/profile');
    } else if (user) {
      setFormData({
        name: user.name || '',
        photoURL: user.photoURL || ''
      });
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!formData.name.trim()) {
      toast.error('Name cannot be empty.');
      return;
    }

    setIsUpdating(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to update profile.');
        setIsUpdating(false);
        return;
      }

      updateUser({
        name: formData.name.trim(),
        photoURL: formData.photoURL.trim()
      });

      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Network error during profile update.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50/50 dark:bg-slate-950/40 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bonus Feature</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Profile & Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View your community contributions and update your display information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 space-y-8">
          
          {/* Avatar Preview Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-500/30 bg-indigo-100 dark:bg-indigo-950 shrink-0 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.photoURL || user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={user.name || 'User Profile'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
                }}
              />
            </div>

            <div className="text-center sm:text-left space-y-1 overflow-hidden">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white truncate">
                {user.name}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>{user.email}</span>
              </p>
              <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Volunteer & Organizer</span>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-indigo-500" />
                <span>Display Name</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Profile Photo URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                <span>Profile Photo URL</span>
              </label>
              <input
                type="url"
                value={formData.photoURL}
                onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
              />
              <p className="mt-1 text-xs text-slate-400">
                Paste any valid image URL (e.g. Unsplash or Gravatar).
              </p>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Email Address (Account ID)</span>
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-sm cursor-not-allowed"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Email address is linked to your account and cannot be modified.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
              >
                {isUpdating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
