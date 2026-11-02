'use client';

import React, { useState } from 'react';
import { Mail, Send, BellRing } from 'lucide-react';
import { toast } from 'sonner';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Thank you for subscribing to local community drive alerts!');
    setEmail('');
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-2xl shadow-emerald-700/20">
          
          {/* Subtle Decorative Pattern */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative text-center max-w-2xl mx-auto space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-semibold uppercase tracking-wider">
              <BellRing className="w-3.5 h-3.5" />
              <span>Stay Connected</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Subscribe to Local Cause Alerts
            </h2>

            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
              Get notified when new winter clothes drives, blanket distributions, or emergency cleanups are organized in your neighborhood.
            </p>

            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <p className="text-xs text-emerald-200/80 pt-2">
              No spam guaranteed. Unsubscribe anytime with one click.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
