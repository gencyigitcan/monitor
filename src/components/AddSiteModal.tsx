"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddSiteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (site: any) => void;
}

export const AddSiteModal: React.FC<AddSiteModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [type, setType] = useState('https');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            name,
            domain,
            type,
            status: 'online', // Default mock status
            responseTime: Math.floor(Math.random() * 200) + 20,
            lastChecked: 'Just now',
            ssl: true
        });
        // Reset
        setName('');
        setDomain('');
        onClose();
    };

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
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px', margin: 'var(--space-4)' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-6)' }}>
                    <h2 className="text-xl font-bold">Add New Monitor</h2>
                    <button onClick={onClose} className="text-muted hover:text-main">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="label">Site Name</label>
                        <input
                            className="input"
                            placeholder="e.g. Landing Page"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label">Domain / URL</label>
                        <input
                            className="input"
                            placeholder="example.com"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label">Type</label>
                        <select
                            className="input"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="https">HTTPS</option>
                            <option value="http">HTTP</option>
                            <option value="api">API</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-2" style={{ marginTop: 'var(--space-4)' }}>
                        <button type="button" onClick={onClose} className="button button-secondary">Cancel</button>
                        <button type="submit" className="button button-primary">Add Monitor</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
