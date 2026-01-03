"use client";

import React from 'react';
import { Activity, Lock, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HeaderProps {
    isAdmin: boolean;
    onAdminClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, onAdminClick }) => {
    const { t, locale, toggleLanguage } = useLanguage();

    return (
        <header className="flex items-center justify-between" style={{
            height: '70px',
            padding: '0 var(--space-4)',
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(253, 251, 247, 0.9)', // Semitransparent background
            backdropFilter: 'blur(10px)',
            zIndex: 100,
            borderBottom: '1px solid var(--color-border)',
            marginBottom: 'var(--space-8)'
        }}>
            <div className="container flex items-center justify-between" style={{ width: '100%' }}>
                <div className="flex items-center gap-2 text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    <Activity />
                    <span>{t.common.pulse}</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="button button-text"
                        style={{ height: '36px', padding: '0 var(--space-3)', fontSize: '0.875rem' }}
                        title={locale === 'en' ? 'Türkçe' : 'English'}
                    >
                        <Globe size={18} style={{ marginRight: 'var(--space-2)' }} />
                        {locale.toUpperCase()}
                    </button>

                    {isAdmin && <span className="badge badge-degraded">{t.common.admin}</span>}
                    <button
                        onClick={onAdminClick}
                        className="button button-secondary"
                        style={{ height: '36px', padding: '0 var(--space-3)', fontSize: '0.875rem' }}
                    >
                        <Lock size={14} style={{ marginRight: 'var(--space-2)' }} />
                        {isAdmin ? t.common.logout : t.common.admin}
                    </button>
                </div>
            </div>
        </header>
    );
};
