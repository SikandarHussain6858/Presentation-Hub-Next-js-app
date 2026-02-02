'use client';
import React from 'react';
import toast from 'react-hot-toast';

const SkeletonLoader = () => (
    <div className="animate-pulse">
        {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1.5fr', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--slate-100)' }}>
                <div style={{ height: '24px', background: 'var(--slate-200)', borderRadius: '4px' }}></div>
                <div style={{ height: '24px', background: 'var(--slate-200)', borderRadius: '4px' }}></div>
                <div style={{ height: '24px', background: 'var(--slate-200)', borderRadius: '4px' }}></div>
                <div style={{ height: '24px', background: 'var(--slate-200)', borderRadius: '4px' }}></div>
                <div style={{ height: '24px', background: 'var(--slate-200)', borderRadius: '4px' }}></div>
            </div>
        ))}
    </div>
);

const PresentationList = ({ presentations, onDelete, loading }) => {
    const handleDelete = async (presentation) => {
        if (window.confirm('Are you sure you want to delete this presentation?')) {
            try {
                const res = await fetch(`/api/presentations?id=${presentation._id}`, {
                    method: 'DELETE',
                });
                
                const data = await res.json();
                
                if (data.success) {
                    toast.success('Presentation deleted successfully');
                    if (onDelete) {
                        onDelete(presentation._id);
                    }
                } else {
                    toast.error(data.error || 'Failed to delete presentation');
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete presentation');
            }
        }
    };

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success(`Code ${code} copied to clipboard!`);
    };

    const handleDownload = (presentation) => {
        if (presentation.fileUrl) {
            window.open(presentation.fileUrl, '_blank');
        } else {
            toast.error("File URL not found");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
    };

    const getExpirationText = (dateString) => {
        if (!dateString) return '';
        const created = new Date(dateString).getTime();
        const now = new Date().getTime();
        const expirationTime = created + (24 * 60 * 60 * 1000); // 24 hours
        const difference = expirationTime - now;

        if (difference <= 0) return 'Expired';

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) return `Expires in ${hours}h ${minutes}m`;
        return `Expires in ${minutes}m`;
    };

    if (loading) {
        return (
            <div className="card" style={{ padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>My Presentations</h2>
                <SkeletonLoader />
            </div>
        );
    }

    if (presentations.length === 0) {
        return (
            <div className="presentations-list">
                <h2>My Presentations</h2>
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: 'var(--bg-light)',
                    borderRadius: '12px',
                    marginTop: '2rem',
                    border: '1px solid var(--border-light)'
                }}>
                    <p style={{ color: 'var(--text-medium)', fontSize: '1.1rem' }}>
                        No presentations uploaded yet.
                    </p>
                    <p style={{ color: 'var(--text-light)' }}>
                        Upload your first presentation above to get started!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>My Presentations</h2>
                <div style={{
                    background: 'var(--primary-100)',
                    color: 'var(--primary-700)',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                }}>
                    {presentations.length} {presentations.length === 1 ? 'Presentation' : 'Presentations'}
                </div>
            </div>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Presentation Name</th>
                            <th>Course</th>
                            <th>Code</th>
                            <th>Upload Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {presentations.map((presentation, index) => (
                            <tr
                                key={presentation.uniqueCode || index}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <td style={{ fontWeight: '500' }}>{presentation.presentationName}</td>
                                <td>{presentation.courseName}</td>
                                <td>
                                    <span style={{
                                        background: 'var(--slate-100)',
                                        color: 'var(--slate-800)',
                                        padding: '0.4rem 0.875rem',
                                        borderRadius: '6px',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        letterSpacing: '0.1em',
                                        display: 'inline-block',
                                        fontFamily: '"Fira Code", monospace',
                                        border: '1px solid var(--slate-200)'
                                    }}>
                                        {presentation.uniqueCode}
                                    </span>
                                </td>
                                <td>
                                    <div>{formatDate(presentation.createdAt)}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--warning)', marginTop: '0.25rem', fontWeight: '500' }}>
                                        {getExpirationText(presentation.createdAt)}
                                    </div>
                                </td>
                                <td>
                                    <div className="table-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => copyCode(presentation.uniqueCode)}
                                            className="btn btn-success"
                                            style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                                            title="Copy code to clipboard"
                                        >
                                            Copy
                                        </button>
                                        <button
                                            onClick={() => handleDownload(presentation)}
                                            className="btn btn-primary"
                                            style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                                            title="Download presentation"
                                        >
                                            Download
                                        </button>
                                        <button
                                            onClick={() => handleDelete(presentation)}
                                            className="btn"
                                            style={{
                                                padding: '0.5rem',
                                                fontSize: '0.8rem',
                                                background: 'var(--danger)',
                                                color: 'white',
                                            }}
                                            title="Delete presentation"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PresentationList;
