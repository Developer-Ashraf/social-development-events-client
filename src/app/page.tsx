import React from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import ImpactStats from '@/components/home/ImpactStats';
import FeaturesSection from '@/components/home/FeaturesSection';
import RecentEvents from '@/components/home/RecentEvents';
import CommunityGallery from '@/components/home/CommunityGallery';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Key Metrics & Impact Stats */}
      <ImpactStats />

      {/* 3. Platform Features */}
      <FeaturesSection />

      {/* 4. Recent 6 Upcoming Events (Dynamic with MongoDB .limit(6)) */}
      <RecentEvents />

      {/* 5. Community In Action Photo Gallery */}
      <CommunityGallery />

      {/* 6. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
