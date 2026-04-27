'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--slate-900)', color: 'var(--slate-400)', padding: '4rem 0 2rem', marginTop: 'auto' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                            <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'white', letterSpacing: '-0.02em' }}>
                                Presentation Hub
                            </span>
                        </div>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--slate-400)', maxWidth: '280px' }}>
                            The simplest way for students to upload, share, and present slides in any classroom. No USB drives needed.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                            Product
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[['/', 'Home'], ['/classroom', 'Classroom Mode'], ['/dashboard', 'Dashboard'], ['/contact', 'Contact Us']].map(([href, label]) => (
                                <li key={href}>
                                    <Link href={href} style={{ color: 'var(--slate-400)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.color = 'white'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'var(--slate-400)'}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Features */}
                    <div>
                        <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                            Features
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {['Drag & Drop Upload', 'Secure File Storage', '6-Digit Access Codes', 'Email Notifications', 'Usage Analytics'].map(f => (
                                <li key={f} style={{ color: 'var(--slate-400)', fontSize: '0.9rem' }}>{f}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--slate-800)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                        &copy; {new Date().getFullYear()} Presentation Hub. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {['Privacy Policy', 'Terms of Service'].map(t => (
                            <a key={t} href="#" style={{ fontSize: '0.85rem', color: 'var(--slate-500)', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--slate-300)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--slate-500)'}>
                                {t}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
