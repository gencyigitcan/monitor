"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Locale } from '@/i18n/translations';

interface LanguageContextType {
    locale: Locale;
    toggleLanguage: () => void;
    t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
    return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<Locale>('en');

    useEffect(() => {
        const saved = localStorage.getItem('pulse_locale') as Locale;
        if (saved && (saved === 'en' || saved === 'tr')) {
            setLocale(saved);
        } else {
            // Auto-detect browser language
            const browserLang = navigator.language.split('-')[0];
            if (browserLang === 'tr') {
                setLocale('tr');
            }
        }
    }, []);

    const toggleLanguage = () => {
        const newLocale = locale === 'en' ? 'tr' : 'en';
        setLocale(newLocale);
        localStorage.setItem('pulse_locale', newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, toggleLanguage, t: translations[locale] }}>
            {children}
        </LanguageContext.Provider>
    );
};
