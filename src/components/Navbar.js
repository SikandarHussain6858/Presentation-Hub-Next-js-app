'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

const BarChartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

const LogOutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const GridIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
);

const MonitorIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
);

const MailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
);

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => {
        setIsMenuOpen(false);
        logout();
    };

    return (
        <nav style={{
            background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: `1px solid ${scrolled ? 'var(--slate-200)' : 'rgba(226,232,240,0.6)'}`,
            transition: 'all 0.3s ease',
            boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
                {/* Brand */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--slate-900)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: 'var(--slate-900)', letterSpacing: '-0.02em' }}>
                        Presentation Hub
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--slate-600)', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--slate-100)'; e.currentTarget.style.color = 'var(--slate-900)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--slate-600)'; }}>
                                <GridIcon /> Dashboard
                            </Link>
                            <Link href="/dashboard/analytics" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--slate-600)', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--slate-100)'; e.currentTarget.style.color = 'var(--slate-900)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--slate-600)'; }}>
                                <BarChartIcon /> Analytics
                            </Link>
                            <Link href="/contact" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--slate-600)', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--slate-100)'; e.currentTarget.style.color = 'var(--slate-900)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--slate-600)'; }}>
                                <MailIcon /> Contact
                            </Link>
                            <div style={{ width: '1px', height: '24px', background: 'var(--slate-200)', margin: '0 0.5rem' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--slate-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>
                                    {user?.email?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--slate-600)', background: 'transparent', border: '1px solid var(--slate-200)', cursor: 'pointer', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--slate-50)'; e.currentTarget.style.color = 'var(--slate-900)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--slate-600)'; }}>
                                    <LogOutIcon /> Sign Out
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/classroom" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--slate-600)', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--slate-100)'; e.currentTarget.style.color = 'var(--slate-900)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--slate-600)'; }}>
                                <MonitorIcon /> Classroom
                            </Link>
                            <Link href="/contact" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--slate-600)', textDecoration: 'none', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--slate-100)'; e.currentTarget.style.color = 'var(--slate-900)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--slate-600)'; }}>
                                <MailIcon /> Contact
                            </Link>
                            <div style={{ width: '1px', height: '24px', background: 'var(--slate-200)', margin: '0 0.5rem' }} />
                            <Link href="/login" style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--slate-700)', textDecoration: 'none', border: '1px solid var(--slate-200)', transition: 'all 0.2s', background: 'white' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--slate-50)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}>
                                Sign In
                            </Link>
                            <Link href="/register" style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'white', textDecoration: 'none', background: 'var(--slate-900)', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'var(--slate-900)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Hamburger */}
                <button className="nav-hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div style={{ background: 'white', borderTop: '1px solid var(--slate-200)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.75rem', borderRadius: '8px', color: 'var(--slate-700)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><GridIcon /> Dashboard</Link>
                            <Link href="/dashboard/analytics" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.75rem', borderRadius: '8px', color: 'var(--slate-700)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BarChartIcon /> Analytics</Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.75rem', borderRadius: '8px', color: 'var(--slate-700)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MailIcon /> Contact</Link>
                            <button onClick={handleLogout} style={{ padding: '0.75rem', borderRadius: '8px', color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LogOutIcon /> Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link href="/classroom" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.75rem', borderRadius: '8px', color: 'var(--slate-700)', textDecoration: 'none', fontWeight: 500 }}>Classroom</Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.75rem', borderRadius: '8px', color: 'var(--slate-700)', textDecoration: 'none', fontWeight: 500 }}>Contact</Link>
                            <Link href="/login" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.75rem', borderRadius: '8px', color: 'var(--slate-700)', textDecoration: 'none', fontWeight: 500 }}>Sign In</Link>
                            <Link href="/register" onClick={() => setIsMenuOpen(false)} style={{ padding: '0.875rem', borderRadius: '8px', color: 'white', background: 'var(--slate-900)', textDecoration: 'none', fontWeight: 600, textAlign: 'center' }}>Get Started</Link>
                        </>
                    )}
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .nav-desktop { display: none !important; }
                    .nav-hamburger { display: block !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
