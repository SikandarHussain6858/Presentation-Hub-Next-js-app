'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    const handleLogout = () => {
        logout();
    };

    const ThemeToggle = () => (
        <button
            onClick={toggleTheme}
            className="btn"
            style={{
                padding: '0.5rem',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme === 'dark' ? 'var(--slate-800)' : 'var(--primary-50)',
                color: theme === 'dark' ? 'var(--warning)' : 'var(--slate-600)',
                border: '1px solid var(--border-color)'
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            )}
        </button>
    );

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Link href="/" className="navbar-brand">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Presentation Hub
                    </Link>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div className="mobile-only" style={{ display: 'none' }}>
                            <ThemeToggle />
                        </div>
                        <button
                            className="btn btn-secondary mobile-only"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{ padding: '0.5rem', display: 'none' }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    {isAuthenticated ? (
                        <>
                            <span style={{ fontSize: '0.9rem', color: 'var(--slate-500)' }}>{user?.email}</span>
                            <Link href="/dashboard">Dashboard</Link>
                            <Link href="/contact">Contact Us</Link>
                            <ThemeToggle />
                            <button onClick={handleLogout} className="btn btn-secondary">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/classroom">Classroom</Link>
                            <Link href="/contact">Contact Us</Link>
                            <Link href="/login">Login</Link>
                            <ThemeToggle />
                            <Link href="/register" className="btn btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <style jsx global>{`
        @media (max-width: 768px) {
          .navbar-content {
            flex-direction: column;
            align-items: flex-start;
          }
          .mobile-only {
            display: block !important;
          }
          .navbar-links {
            display: none;
            width: 100%;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
          }
          .navbar-links.active {
            display: flex;
          }
          .navbar-links a, .navbar-links button {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
