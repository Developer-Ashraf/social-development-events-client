import React from 'react';
import { Users2, MousePointerClick, SlidersHorizontal, CalendarSearch } from 'lucide-react';

const features = [
  {
    icon: Users2,
    title: 'Community-Led Drives',
    description: 'Empower any active citizen to organize social initiatives, winter clothing drives, food distributions, and cleanups in minutes.'
  },
  {
    icon: MousePointerClick,
    title: 'One-Click Participation',
    description: 'Join verified social service initiatives with a single tap. Coordinate directly with organizers and track your volunteer commitments.'
  },
  {
    icon: SlidersHorizontal,
    title: 'Creator Controls',
    description: 'Easily manage, update details, and review participants for your own initiatives with built-in creator security and editing.'
  },
  {
    icon: CalendarSearch,
    title: 'Upcoming-Only Smart Discovery',
    description: 'Strict future-date filters guarantee you will always discover upcoming active initiatives that need volunteers today.'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-50/60 dark:bg-slate-950/40 border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Platform Capabilities
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Grassroots Action & Real Impact
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            A cohesive platform connecting compassionate citizens with direct local community opportunities.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
