"use client";

import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

import { SortableItem } from '@/components/SortableItem';
import { AddSiteModal } from '@/components/AddSiteModal';
import { ConfirmModal } from '@/components/ConfirmModal';
import { useSites } from '@/context/SiteContext';
import { useToast } from '@/components/ToastProvider';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminPage() {
    const { sites, reorderSites, addSite, updateSite, deleteSite } = useSites();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [confirmState, setConfirmState] = useState<{ isOpen: boolean, id: string | null }>({ isOpen: false, id: null });
    const { showToast } = useToast();
    const { t } = useLanguage();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = sites.findIndex((item) => item.id === active.id);
            const newIndex = sites.findIndex((item) => item.id === over.id);
            reorderSites(arrayMove(sites, oldIndex, newIndex));
        }
    };

    const handleAdd = (data: any) => {
        addSite(data);
        showToast(t.admin.monitorAdded, 'success');
    };

    const confirmDelete = (id: string) => {
        setConfirmState({ isOpen: true, id });
    };

    const executeDelete = () => {
        if (confirmState.id) {
            deleteSite(confirmState.id);
            showToast(t.admin.monitorDeleted, 'success');
        }
        setConfirmState({ isOpen: false, id: null });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-2">{t.admin.manageMonitors}</h1>
                    <p className="text-muted">{t.admin.manageDesc}</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="button button-primary"
                >
                    <Plus size={18} style={{ marginRight: '8px' }} />
                    {t.dashboard.addMonitor}
                </button>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sites.map(s => s.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-1 gap-4">
                        {sites.map(site => (
                            <SortableItem
                                key={site.id}
                                site={site}
                                isAdmin={true}
                                onUpdate={updateSite}
                                onDelete={confirmDelete}
                            />
                        ))}
                        {sites.length === 0 && (
                            <div className="card flex flex-col items-center justify-center text-center p-12 text-muted">
                                <p>{t.dashboard.noMonitors}</p>
                            </div>
                        )}
                    </div>
                </SortableContext>
            </DndContext>

            <AddSiteModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAdd}
            />

            <ConfirmModal
                isOpen={confirmState.isOpen}
                title={t.admin.confirmDeleteTitle}
                message={t.admin.confirmDeleteMessage}
                onConfirm={executeDelete}
                onCancel={() => setConfirmState({ isOpen: false, id: null })}
            />
        </div>
    );
}
