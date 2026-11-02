import React from 'react';
import { Users, CalendarCheck2, HeartHandshake, Award } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '1,450+',
    label: 'Active Volunteers',
    desc: 'Passionate youth and citizens ready to serve'
  },
  {
    icon: CalendarCheck2,
    value: '180+',
    label: 'Events Completed',
    desc: 'Drives organized across neighborhoods'
  },
  {
    icon: HeartHandshake,
    value: '24,000+',
    label: 'Lives Impacted',
    desc: 'Needy families supported directly'
  },
  {
    icon: Award,
    value: '100%',
    label: 'Community Drives',
    desc: 'Grassroots transparency and care'
  }
];

export default function ImpactStats() {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
