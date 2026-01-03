"use client";

import React from 'react';
import { Activity, ArrowRight, Shield, Zap, Globe } from 'lucide-react';

export const Hero = ({ onScrollToDashboard }: { onScrollToDashboard: () => void }) => {
    return (
        <section className="flex flex-col items-center justify-center text-center animate-fade-in" style={{
            padding: 'var(--space-12) 0',
            minHeight: '60vh',
            background: 'linear-gradient(180deg, var(--color-bg-app) 0%, #FFF5F2 100%)',
            marginBottom: 'var(--space-12)',
            borderRadius: '0 0 var(--radius-lg) var(--radius-lg)'
        }}>
            <div className="container">
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'white',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: 'var(--shadow-sm)',
                    marginBottom: 'var(--space-6)',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                }}>
                    <Activity size={16} />
                    <span>v2.0 is live</span>
                </div>

                <h1 className="font-bold" style={{
                    fontSize: '3.5rem',
                    lineHeight: 1.1,
                    marginBottom: 'var(--space-6)',
                    background: 'linear-gradient(135deg, var(--color-text-main) 0%, var(--color-primary-dark) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                }}>
                    Monitoring made <br /> calm & friendly.
                </h1>

                <p className="text-muted" style={{
                    fontSize: '1.25rem',
                    maxWidth: '600px',
                    margin: '0 auto var(--space-8)'
                }}>
                    Keep track of your critical services with a dashboard that feels less like a terminal and more like a home.
                </p>

                <div className="flex gap-4 justify-center">
                    <button onClick={onScrollToDashboard} className="button button-primary" style={{ padding: '0 32px', height: '56px', fontSize: '1.1rem' }}>
                        View Live Demo
                    </button>
                    <a href="https://github.com/yigitcangenc/monitor" target="_blank" className="button button-secondary" style={{ padding: '0 32px', height: '56px', fontSize: '1.1rem' }}>
                        GitHub Repo
                    </a>
                </div>
            </div>
        </section>
    );
};

export const Features = () => {
    const features = [
        {
            icon: <Zap size={24} color="var(--color-accent)" />,
            title: "Real-time Checks",
            desc: "Instant server-side monitoring for HTTP/HTTPS services with accurate response times."
        },
        {
            icon: <Shield size={24} color="var(--color-secondary)" />,
            title: "SSL Validation",
            desc: "Never let a certificate expire unnoticed. We track validity and expiration dates."
        },
        {
            icon: <Globe size={24} color="var(--color-primary)" />,
            title: "Global Availability",
            desc: "Monitor your subdomains and APIs from anywhere, ensuring 100% uptime."
        }
    ];

    return (
        <section className="container" style={{ marginBottom: 'var(--space-12)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {features.map((f, i) => (
                    <div key={i} className="card" style={{ padding: '2rem', border: 'none', background: 'transparent', boxShadow: 'none' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'white',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'var(--shadow-md)',
                            marginBottom: 'var(--space-4)'
                        }}>
                            {f.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                        <p className="text-muted">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
