"use client";

import React, { useState } from 'react';
import { StatusBadge } from './StatusBadge';
import { Globe, Clock, ShieldCheck, Activity, RefreshCw, X, GripVertical } from 'lucide-react';
import { checkSiteStatus } from '@/app/actions';

type Status = 'online' | 'degraded' | 'offline';

export interface SiteData {
    id: string;
    name: string;
    domain: string;
    status: Status;
    responseTime: number;
    lastChecked: string;
    ssl: boolean;
}

interface StatusCardProps {
    site: SiteData;
    onUpdate?: (id: string, data: Partial<SiteData>) => void;
    onDelete?: (id: string) => void;
    dragHandleProps?: any;
}

export const StatusCard: React.FC<StatusCardProps> = ({ site, onUpdate, onDelete, dragHandleProps }) => {
    const [isChecking, setIsChecking] = useState(false);

    const handleCheck = async () => {
        setIsChecking(true);
        try {
            const result = await checkSiteStatus(site.domain);

            if (onUpdate) {
                const now = new Date();
                const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                onUpdate(site.id, {
                    status: result.status,
                    responseTime: result.responseTime,
                    lastChecked: `Today at ${timeString}`,
                });
            }
        } catch (error) {
            console.error("Check failed", error);
        } finally {
            setIsChecking(false);
        }
    };

    // Auto-refresh interval (every 60 seconds)
    React.useEffect(() => {
        const interval = setInterval(() => {
            handleCheck();
        }, 60000);
        return () => clearInterval(interval);
    }, [site.id]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="card animate-fade-in" style={{ position: 'relative' }}>
            {/* Drag Handle - Only show if props are provided (which means we are in admin mode) */}
            {dragHandleProps && (
                <div
                    {...dragHandleProps}
                    className="text-muted cursor-grab hover:text-main"
                    style={{ position: 'absolute', top: 'var(--space-4)', left: 'var(--space-4)', outline: 'none' }}
                >
                    <GripVertical size={18} />
                </div>
            )}

            {onDelete && (
                <button
                    onClick={() => onDelete(site.id)}
                    className="text-muted hover:text-red-500"
                    style={{ position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)' }}
                    title="Delete Monitor"
                >
                    <X size={18} />
                </button>
            )}

            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-4)', paddingLeft: dragHandleProps ? '24px' : '0', paddingRight: onDelete ? '24px' : '0' }}>
                <h3 className="text-lg font-bold truncate" style={{ maxWidth: '80%' }}>{site.name}</h3>
                <StatusBadge status={site.status} />
            </div>

            <div className="flex items-center gap-2 text-muted" style={{ marginBottom: 'var(--space-6)', paddingLeft: dragHandleProps ? '24px' : '0' }}>
                <Globe size={16} />
                <a href={site.domain.startsWith('http') ? site.domain : `https://${site.domain}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                    {site.domain}
                </a>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col gap-2">
                    <span className="text-muted flex items-center gap-2">
                        <Activity size={14} /> Response
                    </span>
                    <span className="font-medium">{site.responseTime}ms</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-muted flex items-center gap-2">
                        <ShieldCheck size={14} /> SSL
                    </span>
                    <span className="font-medium text-green-600" style={{ color: site.ssl ? 'var(--color-status-online)' : 'var(--color-status-offline)' }}>
                        {site.ssl ? 'Valid' : 'Invalid'}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between text-muted text-sm" style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>Checked {site.lastChecked}</span>
                </div>
                <button
                    onClick={handleCheck}
                    disabled={isChecking}
                    className={`flex items-center gap-1 hover:text-main ${isChecking ? 'animate-spin' : ''}`}
                    title="Check Status Now"
                >
                    <RefreshCw size={14} />
                </button>
            </div>
        </div>
    );
};
