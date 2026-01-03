"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, ArrowRight, Lock } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { showToast } = useToast();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin') {
            // In a real app, set a cookie. Here we use localStorage/state
            // For this simple demo, we'll just redirect and let the admin layout assume access
            // or we set a simple flag
            localStorage.setItem('pulse_auth', 'true');
            showToast('Welcome back, Admin', 'success');
            router.push('/admin');
        } else {
            setError('Incorrect password');
            showToast('Authentication failed', 'error');
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen" style={{ background: 'var(--color-bg-app)' }}>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="text-center mb-8">
                    <div style={{
                        display: 'inline-flex',
                        padding: '12px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--color-status-online-bg)',
                        color: 'var(--color-primary)',
                        marginBottom: 'var(--space-4)'
                    }}>
                        <Activity size={32} />
                    </div>
                    <h1 className="text-xl font-bold">Admin Access</h1>
                    <p className="text-muted">Enter your password to manage monitors.</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="label">Password</label>
                        <div className="flex items-center gap-2" style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0 var(--space-4)',
                            background: 'white'
                        }}>
                            <Lock size={16} className="text-muted" />
                            <input
                                type="password"
                                className="input"
                                style={{ border: 'none', paddingLeft: 0, height: '46px' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                    </div>

                    <button type="submit" className="button button-primary w-full justify-center">
                        Login <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </button>

                    <button type="button" onClick={() => router.push('/')} className="button button-secondary w-full justify-center">
                        Back to Dashboard
                    </button>
                </form>
            </div>
        </main>
    );
}
