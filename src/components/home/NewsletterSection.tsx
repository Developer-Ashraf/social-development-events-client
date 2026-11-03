'use client';

import React, { useState } from 'react';
import { Mail, Send, BellRing, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Subscribed successfully! You will receive local emergency drive notifications.');
    setEmail('');
  };

  return (
    <section className="py-20 bg-slate-50/70 dark:bg-slate-900/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white shadow-2xl shadow-indigo-950/20 border border-indigo-700/50">
          
          {/* Subtle Decorative Accents */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center max-w-2xl mx-auto space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-bold uppercase tracking-wider border border-white/10">
              <BellRing className="w-3.5 h-3.5 text-amber-400" />
              <span>Civic Dispatch Wire</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Get Instant Neighborhood Emergency & Drive Alerts
            </h2>

            <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
              Never miss a critical winter relief drive, flood response dispatch, or neighborhood cleanup organized near your location.
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
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-md font-medium"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shrink-0"
              >
                <span>Join Alert Wire</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <p className="text-xs text-indigo-300/80 pt-2">
              Privacy protected. 0% spam. Unsubscribe anytime.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
