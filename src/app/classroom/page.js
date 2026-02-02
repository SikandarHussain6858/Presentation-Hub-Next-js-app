'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Classroom() {
    const params = useSearchParams();
    const [code, setCode] = useState('');
    const [presentation, setPresentation] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');

    // Check for code in URL
    useEffect(() => {
        const urlCode = params.get('code');
        if (urlCode) {
            setCode(urlCode.toUpperCase());
            fetchPresentation(urlCode.toUpperCase());
        }
    }, [params]);

    const fetchPresentation = async (searchCode) => {
        setError('');
        setPresentation(null);
        setTimeLeft('');
        setLoading(true);

        try {
            const res = await fetch(`/api/presentations?uniqueCode=${searchCode}`);
            const result = await res.json();

            if (!res.ok || !result.success || result.data.length === 0) {
                throw new Error(result.error || 'Presentation not found');
            }

            // API returns an array, take the first one
            setPresentation(result.data[0]);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Presentation not found');
        } finally {
            setLoading(false);
        }
    };

    // Timer effect
    useEffect(() => {
        let intervalId;

        if (presentation && presentation.createdAt) {
            const calculateTimeLeft = () => {
                const created = new Date(presentation.createdAt).getTime();
                const now = new Date().getTime();
                const expirationTime = created + (24 * 60 * 60 * 1000); // 24 hours in ms
                const difference = expirationTime - now;

                if (difference <= 0) {
                    clearInterval(intervalId);
                    setPresentation(null);
                    setTimeLeft('');
                    setError('This presentation has expired');
                    return;
                }

                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            };

            calculateTimeLeft();
            intervalId = setInterval(calculateTimeLeft, 1000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [presentation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!code.trim()) {
            setError('Please enter a code');
            return;
        }
        fetchPresentation(code.toUpperCase());
    };

    const handleClear = () => {
        setCode('');
        setPresentation(null);
        setError('');
        setTimeLeft('');
    };

    const handleDownload = () => {
        if (presentation && presentation.fileUrl) {
            window.open(presentation.fileUrl, '_blank');
        } else {
            alert('File URL not found');
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{ fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>Classroom Mode</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Enter the 6-digit presentation code to display
                    </p>
                </div>

                {error && <div className="alert alert-error" style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="000000"
                            maxLength="6"
                            style={{
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                fontSize: '3rem',
                                letterSpacing: '0.5rem',
                                fontWeight: '700',
                                padding: '1.5rem',
                                height: 'auto',
                                border: '2px solid var(--primary-200)',
                                color: 'var(--primary-600)',
                                fontFamily: '"Outfit", sans-serif'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 2, padding: '1rem', fontSize: '1.1rem' }}>
                            {loading ? 'Searching...' : 'Find Presentation'}
                        </button>
                        {presentation && (
                            <button type="button" onClick={handleClear} className="btn btn-secondary" style={{ flex: 1 }}>
                                Clear
                            </button>
                        )}
                    </div>
                </form>

                {presentation && (
                    <div className="card animate-fade-in" style={{ padding: '2.5rem', marginTop: '2rem', borderTop: '4px solid var(--success)' }}>
                        <div className="presentation-info">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ background: 'var(--success)', color: 'white', padding: '0.5rem', borderRadius: '50%' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>Found</h2>
                                </div>
                                {timeLeft && (
                                    <div style={{
                                        background: 'var(--primary-50)',
                                        color: 'var(--primary-700)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Expires in: {timeLeft}
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'grid', gap: '1rem', fontSize: '1.1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Name:</span>
                                    <span style={{ fontWeight: '600' }}>{presentation.presentationName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Course:</span>
                                    <span style={{ fontWeight: '600' }}>{presentation.courseName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>File:</span>
                                    <span style={{ fontWeight: '600' }}>{presentation.fileName}</span>
                                </div>
                            </div>
                        </div>

                        <button onClick={handleDownload} className="btn btn-success" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Download & Open Presentation
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
