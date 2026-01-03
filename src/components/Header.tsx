"use client";

import React from 'react';
import { Activity, Lock } from 'lucide-react';

interface HeaderProps {
    isAdmin: boolean;
    onAdminClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, onAdminClick }) => {
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
                    <span>Pulse</span>
                </div>

                <div className="flex items-center gap-4">
                    {isAdmin && <span className="badge badge-degraded">Admin Mode</span>}
                    <button
                        onClick={onAdminClick}
                        className="button button-secondary"
                        style={{ height: '36px', padding: '0 var(--space-3)', fontSize: '0.875rem' }}
                    >
                        <Lock size={14} style={{ marginRight: 'var(--space-2)' }} />
                        {isAdmin ? 'Logout' : 'Admin'}
                    </button>
                </div>
            </div>
        </header>
    );
};
