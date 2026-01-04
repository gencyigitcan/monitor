"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData } from '@/components/StatusCard';
import { checkSiteStatus } from '@/app/actions';

interface SiteContextType {
    sites: SiteData[];
    setSites: React.Dispatch<React.SetStateAction<SiteData[]>>;
    addSite: (site: Partial<SiteData>) => void;
    updateSite: (id: string, data: Partial<SiteData>) => void;
    deleteSite: (id: string) => void;
    reorderSites: (newSites: SiteData[]) => void;
    refreshSite: (id: string) => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const useSites = () => {
    const context = useContext(SiteContext);
    if (!context) throw new Error('useSites must be used within a SiteProvider');
    return context;
};

const INITIAL_SITES: SiteData[] = [
    {
        id: '1',
        name: 'Marketing Website',
        domain: 'pulse.io',
        status: 'online',
        responseTime: 45,
        lastChecked: 'Today at 09:00',
        ssl: true
    },
    {
        id: '2',
        name: 'API Service',
        domain: 'api.pulse.io',
        status: 'online',
        responseTime: 120,
        lastChecked: 'Today at 09:01',
        ssl: true
    },
];

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sites, setSites] = useState<SiteData[]>(INITIAL_SITES);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('pulse_sites');
        if (saved) {
            try {
                setSites(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load sites", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('pulse_sites', JSON.stringify(sites));
        }
    }, [sites, isLoaded]);

    // Automatic polling
    useEffect(() => {
        if (!isLoaded || sites.length === 0) return;

        const interval = setInterval(() => {
            sites.forEach((site, index) => {
                // Stagger checks slightly
                setTimeout(() => refreshSite(site.id), index * 2000);
            });
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [isLoaded, sites]); // restart timer if sites change (add/remove/update)

    const addSite = (newSiteData: Partial<SiteData>) => {
        const newSite: SiteData = {
            id: Math.random().toString(36).substr(2, 9),
            name: newSiteData.name || 'Untitled',
            domain: newSiteData.domain || '',
            status: 'online',
            responseTime: 0,
            lastChecked: 'Pending...',
            ssl: true,
            ...newSiteData
        } as SiteData;

        setSites(prev => [...prev, newSite]);
    };

    const updateSite = (id: string, updatedData: Partial<SiteData>) => {
        setSites(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
    };

    const deleteSite = (id: string) => {
        setSites(prev => prev.filter(s => s.id !== id));
    };

    const reorderSites = (newSites: SiteData[]) => {
        setSites(newSites);
    };

    const refreshSite = async (id: string) => {
        const site = sites.find(s => s.id === id);
        if (!site) return;

        try {
            const result = await checkSiteStatus(site.domain);
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            updateSite(id, {
                status: result.status,
                responseTime: result.responseTime,
                lastChecked: `Today at ${timeString}`,
                ssl: result.ssl ? result.ssl.valid : site.ssl,
                sslDaysRemaining: result.ssl ? result.ssl.daysRemaining : undefined,
                history: [...(site.history || []), result.responseTime].slice(-20) // Keep last 20
            });
        } catch (error) {
            console.error("Failed to check site", error);
        }
    };

    // Auto-refresh logic could stay here or component level. 
    // Keeping it simple: component triggering ensures we only check when viewing.

    return (
        <SiteContext.Provider value={{ sites, setSites, addSite, updateSite, deleteSite, reorderSites, refreshSite }}>
            {children}
        </SiteContext.Provider>
    );
};
