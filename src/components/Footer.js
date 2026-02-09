import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer style={{
            background: 'white',
            borderTop: '1px solid var(--slate-200)',
            padding: '4rem 0 2rem',
            marginTop: 'auto',
            position: 'relative'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '3rem',
                    marginBottom: '3rem'
                }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            color: 'var(--slate-900)',
                            fontWeight: '800',
                            fontSize: '1.25rem',
                            fontFamily: '"Outfit", sans-serif'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Presentation Hub
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            Simplify your university presentations with our easy-to-use platform.
                            Upload, manage, and display presentations seamlessly.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--slate-900)', fontWeight: '700', marginBottom: '1.25rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.75rem' }}><Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link href="/classroom" style={{ color: 'var(--text-muted)' }}>Classroom Mode</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link href="/contact" style={{ color: 'var(--text-muted)' }}>Contact Us</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link href="/dashboard" style={{ color: 'var(--text-muted)' }}>Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--slate-900)', fontWeight: '700', marginBottom: '1.25rem' }}>Features</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)' }}>
                            <li style={{ marginBottom: '0.75rem' }}>Easy Upload</li>
                            <li style={{ marginBottom: '0.75rem' }}>Secure Storage</li>
                            <li style={{ marginBottom: '0.75rem' }}>Email Notifications</li>
                            <li style={{ marginBottom: '0.75rem' }}>Quick Access Codes</li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '2rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem'
                }}>
                    <p>© {new Date().getFullYear()} Presentation Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
