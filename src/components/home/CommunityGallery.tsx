import React from 'react';
import { Quote, Star, MapPin, CheckCircle, Heart } from 'lucide-react';

const stories = [
  {
    quote: "When the severe northern cold wave hit Kurigram and Rangpur, CivicPulse enabled us to coordinate 1,200 heavy blankets and distribute them directly to vulnerable families in under 48 hours.",
    author: "Rashikur Rahman",
    role: "Community Coordinator",
    location: "Rangpur & Kurigram",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    cause: "Winter Warmth Initiative",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
  },
  {
    quote: "Organizing the medical camp in Rayer Bazar provided free diagnostic tests and essential pediatric medicines to over 350 street children and garment workers. The transparency of this platform is unmatched.",
    author: "Dr. Syeda Nabila",
    role: "Public Health Fellow",
    location: "Rayer Bazar, Dhaka",
    avatar: "https://images.unsplash.com/photo-1594824813637-440263c9c991?w=150",
    cause: "Community Healthcare",
    badgeColor: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
  },
  {
    quote: "Mobilizing 45 student volunteers to restore native mangrove saplings and clean plastic waste along the coastal belt proved to me that our generation is ready to protect our ecology with our own hands.",
    author: "Tanvir Hasan",
    role: "Youth Climate Advocate",
    location: "Cox's Bazar & Chattogram",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    cause: "Ecological Restoration",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
  }
];

export default function CommunityGallery() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400" />
            <span>Real On-Ground Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Voices of Changemakers Leading the Frontlines
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Hear directly from student volunteers, healthcare professionals, and neighborhood organizers driving civic transformation.
          </p>
        </div>

        {/* Testimonials / Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-3xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-8 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Quote Icon & Cause Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Quote className="w-5 h-5 fill-indigo-600/20" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.badgeColor}`}>
                    {item.cause}
                  </span>
                </div>

                {/* Stars rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author attribution footer */}
              <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center gap-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span>{item.author}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                  <p className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{item.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
