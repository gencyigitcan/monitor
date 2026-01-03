"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, ArrowRight, Lock, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { showToast } = useToast();
    const { isSetupComplete, login, register, isAuthenticated } = useAuth();
    const { t } = useLanguage();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isSetupComplete) {
            // Registration Mode
            if (!email.includes('@')) {
                setError('Please enter a valid email address');
                return;
            }
            if (password.length < 6) {
                setError(t.login.passwordLength);
                return;
            }
            if (password !== confirmPassword) {
                setError(t.login.passwordsDoNotMatch);
                return;
            }
            register(email, password);
            showToast(t.login.accountCreated, 'success');
            router.push('/admin');
        } else {
            // Login Mode
            const success = login(email, password);
            if (success) {
                showToast(t.login.welcomeBack, 'success');
                router.push('/admin');
            } else {
                setError(t.login.invalidAuth);
                showToast(t.login.invalidAuth, 'error');
            }
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
                    <h1 className="text-xl font-bold">
                        {isSetupComplete ? t.login.adminAccess : t.login.setupAccount}
                    </h1>
                    <p className="text-muted">
                        {isSetupComplete
                            ? t.login.enterCredentials
                            : t.login.createCredentials}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="label">{t.login.emailLabel}</label>
                        <div className="flex items-center gap-2" style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0 var(--space-4)',
                            background: 'white'
                        }}>
                            <UserPlus size={16} className="text-muted" />
                            <input
                                type="email"
                                className="input"
                                style={{ border: 'none', paddingLeft: 0, height: '46px' }}
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">{t.login.passwordLabel}</label>
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
                            />
                        </div>
                    </div>

                    {!isSetupComplete && (
                        <div>
                            <label className="label">{t.login.confirmPasswordLabel}</label>
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
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

                    <button type="submit" className="button button-primary w-full justify-center">
                        {isSetupComplete ? t.login.loginButton : t.login.createAccount}
                        <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </button>

                    <button type="button" onClick={() => router.push('/')} className="button button-secondary w-full justify-center">
                        {t.common.backToDashboard}
                    </button>
                </form>
            </div>
        </main>
    );
}
