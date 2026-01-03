"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    isSetupComplete: boolean;
    login: (email: string, password: string) => boolean;
    register: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if setup is complete (password exists)
        const storedHash = localStorage.getItem('pulse_admin_hash');
        if (storedHash) {
            setIsSetupComplete(true);
        }

        // Check if already logged in (session)
        const session = localStorage.getItem('pulse_session');
        if (session === 'active') {
            setIsAuthenticated(true);
        }

        setIsLoading(false);
    }, []);

    const login = (email: string, password: string) => {
        const storedHash = localStorage.getItem('pulse_admin_hash');
        const storedEmail = localStorage.getItem('pulse_admin_email');

        if (!storedHash) return false;

        // In a real app, verify hash. Simple match for demo.
        // Also verifying email if it was stored, but for backward compatibility/simplicity:
        // If storedEmail exists, check it.
        if (storedEmail && storedEmail !== email) {
            return false;
        }

        if (btoa(password) === storedHash) {
            localStorage.setItem('pulse_session', 'active');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const register = (email: string, password: string) => {
        // Save simple hash and email
        localStorage.setItem('pulse_admin_hash', btoa(password));
        localStorage.setItem('pulse_admin_email', email);
        localStorage.setItem('pulse_session', 'active');
        setIsSetupComplete(true);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('pulse_session');
        setIsAuthenticated(false);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isSetupComplete, login, register, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
