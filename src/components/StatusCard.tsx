"use client";

import React, { useState } from 'react';
import { BadgeCheck, BadgeAlert, RefreshCw, GripVertical, Clock, Globe, Activity } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { useLanguage } from '@/context/LanguageContext';

export interface SiteData {
    id: string;
    name: string;
    domain: string;
    status: 'online' | 'degraded' | 'offline';
    responseTime: number;
    lastChecked: string;
    ssl: boolean;
    sslDaysRemaining?: number;
    history?: number[];
}

interface StatusCardProps {
    site: SiteData;
    onUpdate?: (id: string, updatedData: Partial<SiteData>) => void;
    onDelete?: (id: string) => void;
    onRefresh?: () => void;
    isDragOverlay?: boolean;
    dragHandleProps?: any;
}

// Sparkline Component
const Sparkline = ({ data, color }: { data: number[], color: string }) => {
    if (!data || data.length < 2) return null;

    const height = 30;
    const width = 100;
    const max = Math.max(...data, 1);
    const min = 0;

    // Create points string
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / (max - min)) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className="opacity-50" preserveAspectRatio="none">
            <polyline
                points={points}
                fill="none"
                stroke={color === 'success' ? 'var(--color-status-online)' : color === 'warning' ? 'var(--color-status-degraded)' : 'var(--color-status-offline)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
};

export const StatusCard: React.FC<StatusCardProps> = ({ site, onUpdate, onDelete, onRefresh, isDragOverlay, dragHandleProps }) => {
    const { t } = useLanguage();
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Format display status text
    const getStatusText = (status: string) => {
        switch (status) {
            case 'online': return t.status.online;
            case 'degraded': return t.status.degraded;
            case 'offline': return t.status.offline;
            default: return t.status.pending;
        }
    };

    const getSSLLabel = () => {
        if (site.sslDaysRemaining !== undefined) {
            if (site.sslDaysRemaining < 0) return 'Expired';
            return `${site.sslDaysRemaining} days`;
        }
        return site.ssl ? 'Secure' : 'Unsecured';
    }

    const handleRefresh = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onRefresh) {
            setIsRefreshing(true);
            await onRefresh();
            setIsRefreshing(false);
        }
    };

    const sslWarning = site.sslDaysRemaining !== undefined && site.sslDaysRemaining < 30;

    // Ping color
    let pingColor = 'text-status-online';
    let graphColor = 'success';
    if (site.responseTime > 500) {
        pingColor = 'text-status-offline';
        graphColor = 'danger';
    } else if (site.responseTime > 200) {
        pingColor = 'text-status-degraded';
        graphColor = 'warning';
    }

    return (
        <div className={`card ${site.status} ${isDragOverlay ? 'opacity-80' : ''}`} style={{
            position: 'relative',
            paddingLeft: onDelete ? '3rem' : '1.5rem',
            cursor: isDragOverlay ? 'grabbing' : 'default'
        }}>

            {/* Drag Handle */}
            {onDelete && (
                <div
                    {...dragHandleProps}
                    style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'grab',
                        color: 'var(--color-text-secondary)',
                        opacity: 0.5
                    }}
                    className="hover:opacity-100"
                >
                    <GripVertical size={20} />
                </div>
            )}

            {/* Content */}
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        {/* Heartbeat Animation for Online sites */}
                        {site.status === 'online' && (
                            <div className="heartbeat-container">
                                <span className="heartbeat-ring"></span>
                                <span className="heartbeat-dot"></span>
                            </div>
                        )}

                        <h3 className="font-bold text-lg">{site.name}</h3>

                    </div>
                    <a href={`https://${site.domain}`} target="_blank" rel="noreferrer" className="text-muted text-sm hover:underline flex items-center gap-1">
                        <Globe size={12} /> {site.domain}
                    </a>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={site.status} text={getStatusText(site.status)} />

                    {/* Manual Refresh Button */}
                    {onRefresh && (
                        <button
                            onClick={handleRefresh}
                            className={`text-muted hover:text-primary transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                            title="Instant Check"
                        >
                            <RefreshCw size={14} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-6 text-sm text-muted flex-wrap">
                    <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{site.lastChecked.replace('Today at', t.dashboard.todayAt)}</span>
                    </div>
                    <div className={`flex items-center gap-2 font-medium ${pingColor}`}>
                        <Activity size={14} />
                        <span>{site.responseTime}ms</span>
                    </div>
                    <div className={`flex items-center gap-2 ${sslWarning ? 'text-status-degraded font-bold' : ''}`} title={site.sslDaysRemaining ? `Expires in ${site.sslDaysRemaining} days` : 'SSL Status'}>
                        {sslWarning ? <BadgeAlert size={14} /> : <BadgeCheck size={14} className={site.ssl ? 'text-status-online' : 'text-muted'} />}
                        <span>SSL: {getSSLLabel()}</span>
                    </div>
                </div>
            </div>

            {/* Sparkline Monitor - Bottom Row (Full Width) */}
            {site.history && site.history.length > 0 && (
                <div style={{
                    marginTop: 'var(--space-4)',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--color-border)',
                    width: '100%'
                }} title="Latency History">
                    <Sparkline data={site.history} color={graphColor} />
                </div>
            )}
        </div>
    );
};
