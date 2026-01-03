"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { StatusCard, SiteData } from './StatusCard';

interface SortableItemProps {
    site: SiteData;
    isAdmin: boolean;
    onUpdate: (id: string, data: Partial<SiteData>) => void;
    onDelete: (id: string) => void;
}

export const SortableItem: React.FC<SortableItemProps> = ({ site, isAdmin, onUpdate, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: site.id, disabled: !isAdmin });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 1,
        position: 'relative' as const,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <StatusCard
                site={site}
                onUpdate={onUpdate}
                onDelete={isAdmin ? onDelete : undefined}
                dragHandleProps={isAdmin ? { ...attributes, ...listeners } : undefined}
            />
        </div>
    );
};
