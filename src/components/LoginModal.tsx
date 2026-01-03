"use client";

import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple demo authentication
        if (password === 'admin') {
            onLogin();
            onClose();
            setPassword('');
            setError('');
        } else {
            setError('Incorrect password');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px', margin: 'var(--space-4)' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-6)' }}>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Lock size={20} className="text-primary" />
                        Admin Login
                    </h2>
                    <button onClick={onClose} className="text-muted hover:text-main">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Enter password (admin)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                    </div>

                    <button type="submit" className="button button-primary w-full">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};
