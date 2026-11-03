import React from 'react';
import { Users, MapPin, Clock, HeartHandshake } from 'lucide-react';

export default function ImpactStats() {
  const metrics = [
    {
      icon: Users,
      value: '3,200+',
      label: 'Verified Volunteers',
      description: 'Active youth & citizen changemakers',
      color: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
    },
    {
      icon: MapPin,
      value: '14 Districts',
      label: 'Geographic Reach',
      description: 'Dhaka, Sylhet, Rangpur, Chattogram & more',
      color: 'from-amber-500 to-orange-600',
      iconBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
    },
    {
      icon: Clock,
      value: '8,500+ hrs',
      label: 'On-Ground Hours',
      description: 'Direct community service dedicated',
      color: 'from-indigo-500 to-violet-600',
      iconBg: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
    },
    {
      icon: HeartHandshake,
      value: '42,000+',
      label: 'Lives Touched',
      description: 'Meals, warm clothes & healthcare provided',
      color: 'from-rose-500 to-pink-600',
      iconBg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
    }
  ];

  return (
    <section className="relative -mt-6 sm:-mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`pt-4 sm:pt-0 ${index !== 0 ? 'lg:pl-6' : ''} flex items-center gap-4 group`}
              >
                <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
