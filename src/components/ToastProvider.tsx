"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                {toasts.map((toast) => (
                    <div key={toast.id} className="animate-fade-in" style={{
                        backgroundColor: 'white',
                        boxShadow: 'var(--shadow-lg)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px 16px',
                        borderLeft: `4px solid ${toast.type === 'success' ? 'var(--color-status-online)' :
                                toast.type === 'error' ? 'var(--color-status-offline)' : 'var(--color-secondary)'
                            }`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        minWidth: '300px'
                    }}>
                        {toast.type === 'success' && <CheckCircle size={18} color="var(--color-status-online)" />}
                        {toast.type === 'error' && <AlertCircle size={18} color="var(--color-status-offline)" />}
                        {toast.type === 'info' && <Info size={18} color="var(--color-secondary)" />}

                        <span style={{ fontSize: '0.9rem', flex: 1, color: 'var(--color-text-main)' }}>{toast.message}</span>

                        <button onClick={() => removeToast(toast.id)} className="text-muted hover:text-main">
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
