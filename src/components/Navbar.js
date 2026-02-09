'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleLogout = () => {
        logout();
    };



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

                            <button onClick={handleLogout} className="btn btn-secondary">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/classroom">Classroom</Link>
                            <Link href="/contact">Contact Us</Link>
                            <Link href="/login">Login</Link>

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
