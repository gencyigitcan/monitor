"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, LogOut, LayoutDashboard, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem('pulse_auth');
        if (auth !== 'true') {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('pulse_auth');
        router.push('/');
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                background: 'white',
                borderRight: '1px solid var(--color-border)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div className="flex items-center gap-2 text-xl font-bold mb-8" style={{ color: 'var(--color-primary)' }}>
                    <Activity />
                    <span>Pulse Admin</span>
                </div>

                <nav className="flex flex-col gap-2 flex-1">
                    <Link href="/admin" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-main font-medium">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/" target="_blank" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-muted hover:text-main">
                        <Globe size={20} />
                        View Live Site
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-red-50 text-red-500 font-medium mt-auto"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-1 bg-app p-8 overflow-auto">
                {children}
            </div>
        </div>
    );
}
