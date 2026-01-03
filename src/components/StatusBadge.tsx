import React from 'react';

type Status = 'online' | 'degraded' | 'offline';

interface StatusBadgeProps {
    status: Status;
    text?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
    const getBadgeClass = (status: Status) => {
        switch (status) {
            case 'online':
                return 'badge-online';
            case 'degraded':
                return 'badge-degraded';
            case 'offline':
                return 'badge-offline';
            default:
                return '';
        }
    };

    const getLabel = (status: Status) => {
        switch (status) {
            case 'online':
                return 'Operational';
            case 'degraded':
                return 'Degraded';
            case 'offline':
                return 'Offline';
            default:
                return status;
        }
    };

    return (
        <span className={`badge ${getBadgeClass(status)}`}>
            {text || getLabel(status)}
        </span>
    );
};
