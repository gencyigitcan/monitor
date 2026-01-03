"use client";

import React from 'react';
import { Activity, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Hero = ({ onScrollToDashboard }: { onScrollToDashboard: () => void }) => {
    const { t } = useLanguage();

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
                    <span>{t.hero.label}</span>
                </div>

                <h1 className="font-bold" style={{
                    fontSize: '3.5rem',
                    lineHeight: 1.1,
                    marginBottom: 'var(--space-6)',
                    background: 'linear-gradient(135deg, var(--color-text-main) 0%, var(--color-primary-dark) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    whiteSpace: 'pre-line'
                }}>
                    {t.hero.title}
                </h1>

                <p className="text-muted" style={{
                    fontSize: '1.25rem',
                    maxWidth: '600px',
                    margin: '0 auto var(--space-8)'
                }}>
                    {t.hero.subtitle}
                </p>

                <div className="flex gap-4 justify-center">
                    <button onClick={onScrollToDashboard} className="button button-primary" style={{ padding: '0 32px', height: '56px', fontSize: '1.1rem' }}>
                        {t.hero.viewDemo}
                    </button>
                    <a href="https://github.com/gencyigitcan/monitor" target="_blank" className="button button-secondary" style={{ padding: '0 32px', height: '56px', fontSize: '1.1rem' }}>
                        {t.hero.githubRepo}
                    </a>
                </div>
            </div>
        </section>
    );
};

export const Features = () => {
    const { t } = useLanguage();

    // We recreate features array inside component to use current 't'
    const features = [
        {
            icon: <Zap size={24} color="var(--color-accent)" />,
            title: t.features.realTime,
            desc: t.features.realTimeDesc
        },
        {
            icon: <Shield size={24} color="var(--color-secondary)" />,
            title: t.features.ssl,
            desc: t.features.sslDesc
        },
        {
            icon: <Globe size={24} color="var(--color-primary)" />,
            title: t.features.global,
            desc: t.features.globalDesc
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
