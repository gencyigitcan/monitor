"use client";

import React, { useRef } from 'react';
import { Hero, Features } from '@/components/LandingSections';
import { StatusCard } from '@/components/StatusCard';
import { Header } from '@/components/Header';
import { useSites } from '@/context/SiteContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { sites, updateSite } = useSites();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAdminClick = () => {
    // Just redirect to login or admin depending on auth state (layout handles check)
    router.push('/admin');
  };

  return (
    <main style={{ paddingBottom: 'var(--space-12)' }}>
      <Header isAdmin={false} onAdminClick={handleAdminClick} />

      <Hero onScrollToDashboard={scrollToDashboard} />
      <Features />

      <div className="container" ref={dashboardRef}>
        <div className="flex justify-between items-end" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="animate-fade-in">
            <h1 className="text-xl font-bold" style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>
              System Status
            </h1>
            <p className="text-muted">
              Live monitoring for all critical services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4" style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-6)'
        }}>
          {sites.map(site => (
            <StatusCard
              key={site.id}
              site={site}
              onUpdate={updateSite} // Allow public to trigger check updates visually, but no edits
            />
          ))}

          {sites.length === 0 && (
            <div className="card flex flex-col items-center justify-center text-center p-12 text-muted col-span-full">
              <p>No sites monitored yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
