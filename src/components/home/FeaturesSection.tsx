import React from 'react';
import { Target, Users2, CheckCircle2, ShieldAlert, CalendarClock, Lock } from 'lucide-react';

export default function FeaturesSection() {
  const steps = [
    {
      number: '01',
      title: 'Initiate a Cause',
      description: 'Define your welfare goal, schedule a future date, and set clear volunteer requirements for your local area.',
      icon: Target,
      tag: 'Organizer Power'
    },
    {
      number: '02',
      title: 'Mobilize Volunteers',
      description: 'Citizens discover drives by city & category, join with one secure click, and sync event schedules to their calendars.',
      icon: Users2,
      tag: 'One-Click RSVP'
    },
    {
      number: '03',
      title: 'Lead On-Ground Impact',
      description: 'Show up, distribute relief supplies, execute cleanups, and track verified participants in real time.',
      icon: CheckCircle2,
      tag: 'Real Results'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Seamless Grassroots Coordination</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            How CivicPulse Transforms Good Intentions Into Real Action
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            A transparent, student and community-built pipeline designed to eliminate organizational friction and get hands on the ground where help is needed most.
          </p>
        </div>

        {/* 3-Step Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-8 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group"
              >
                {/* Step Number Watermark */}
                <span className="text-5xl font-black text-slate-200/80 dark:text-slate-800/80 select-none absolute top-6 right-6 group-hover:text-indigo-200 dark:group-hover:text-indigo-900/50 transition-colors">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-13 h-13 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-md shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>

                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
                  {step.tag}
                </span>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 2 Feature Callout Badges */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/60 dark:border-blue-900/40">
            <CalendarClock className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Upcoming-Only Temporal Guarantee
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Our strict database queries guarantee you never see expired or past events. Every initiative listed is actively welcoming volunteers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-violet-50/70 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20 border border-violet-200/60 dark:border-violet-900/40">
            <Lock className="w-6 h-6 text-violet-600 dark:text-violet-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Cryptographic Token & Creator Authorization
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Events are protected with verified JWT ownership. Only the creator who initiated a drive has the permission to update or remove it.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
