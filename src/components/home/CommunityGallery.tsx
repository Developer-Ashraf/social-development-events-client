import React from 'react';
import { Camera, MapPin } from 'lucide-react';

const galleryPhotos = [
  {
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80',
    title: 'Winter Clothes Collection',
    location: 'Mirpur, Dhaka',
    category: 'Winter Relief'
  },
  {
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80',
    title: 'Warm Blanket Distribution',
    location: 'Mohammadpur, Dhaka',
    category: 'Humanitarian Aid'
  },
  {
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80',
    title: 'Dhanmondi Lake Clean-Up',
    location: 'Dhanmondi, Dhaka',
    category: 'Environmental'
  },
  {
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    title: 'Urban Tree Plantation Drive',
    location: 'Uttara, Dhaka',
    category: 'Green City'
  },
  {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    title: 'Community Food Sharing',
    location: 'Rayer Bazar, Dhaka',
    category: 'Nutrition'
  },
  {
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    title: 'Children Book & Bag Drive',
    location: 'Kamalapur, Dhaka',
    category: 'Education'
  }
];

export default function CommunityGallery() {
  return (
    <section className="py-20 bg-slate-50/60 dark:bg-slate-950/40 border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Community in Action
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Moments from volunteer drives, relief distributions, and green initiatives across Dhaka and beyond.
          </p>
        </div>

        {/* Gallery Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryPhotos.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-200 dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Caption Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-600/90 text-white mb-1.5 backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold leading-tight group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
