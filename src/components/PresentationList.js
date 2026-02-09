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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {presentations.map((presentation, index) => (
                    <div
                        key={presentation.uniqueCode || index}
                        className="card animate-fade-in"
                        style={{
                            padding: '1.5rem',
                            animationDelay: `${index * 50}ms`,
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'var(--slate-100)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--slate-600)'
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span style={{
                                    background: 'var(--slate-100)',
                                    color: 'var(--slate-800)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontWeight: '700',
                                    fontSize: '0.85rem',
                                    letterSpacing: '0.05em',
                                    fontFamily: '"Fira Code", monospace'
                                }}>
                                    {presentation.uniqueCode}
                                </span>
                            </div>

                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--slate-900)' }}>
                                {presentation.presentationName}
                            </h3>
                            <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                {presentation.courseName}
                            </p>

                            <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <span>Uploaded: {formatDate(presentation.createdAt)}</span>
                                <span style={{ color: 'var(--warning)', fontWeight: '500' }}>
                                    {getExpirationText(presentation.createdAt)}
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <button
                                onClick={() => copyCode(presentation.uniqueCode)}
                                className="btn"
                                style={{ background: 'var(--slate-100)', color: 'var(--slate-700)', fontSize: '0.9rem', padding: '0.6rem' }}
                            >
                                Copy Code
                            </button>
                            <button
                                onClick={() => handleDownload(presentation)}
                                className="btn btn-primary"
                                style={{ fontSize: '0.9rem', padding: '0.6rem' }}
                            >
                                Download
                            </button>
                            <button
                                onClick={() => handleDelete(presentation)}
                                className="btn"
                                style={{
                                    background: 'white',
                                    color: 'var(--danger)',
                                    border: '1px solid var(--danger)',
                                    gridColumn: '1 / -1',
                                    fontSize: '0.9rem',
                                    padding: '0.6rem'
                                }}
                            >
                                Delete File
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PresentationList;
