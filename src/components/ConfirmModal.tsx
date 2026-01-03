"use client";

import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

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
            zIndex: 2000,
            backdropFilter: 'blur(4px)'
        }}>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px', margin: 'var(--space-4)' }}>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="text-muted mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="button button-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="button button-danger"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
