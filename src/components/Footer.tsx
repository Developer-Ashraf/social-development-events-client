'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, MapPin, Mail, Phone, Heart, Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                Civic<span className="text-indigo-400">Pulse</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 ml-0.5" />
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              CivicPulse is an open grassroots community network enabling citizens and youth leaders to organize, discover, and lead high-impact civic and welfare drives.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Follow us on X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Developer-Ashraf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">Direct Access</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-indigo-400 transition-colors">All Upcoming Drives</Link>
              </li>
              <li>
                <Link href="/create-event" className="hover:text-indigo-400 transition-colors">Launch an Initiative</Link>
              </li>
              <li>
                <Link href="/manage-events" className="hover:text-indigo-400 transition-colors">Organizer Dashboard</Link>
              </li>
              <li>
                <Link href="/joined-events" className="hover:text-indigo-400 transition-colors">My Pledged Drives</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Active Campaigns */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">Pillars of Impact</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Winter Thermal & Blanket Distribution</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Urban Afforestation & Park Cleanups</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>Free Medical & Pediatric Health Camps</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Cooked Meals & Dry Grocery Rations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <span>Slum Children Education & School Drives</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Verification */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">Civic Network Desk</h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                <span>Dhaka, Chattogram, Sylhet, Rangpur & Rajshahi, Bangladesh</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>contact@civicpulse.org</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>+880 1700-000000</span>
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <p className="text-[11px] text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Zero Commercial Ads • 100% Volunteer Led</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} CivicPulse Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with care by <span className="text-white font-semibold">Ashraful Islam</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
