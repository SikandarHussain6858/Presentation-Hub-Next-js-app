'use client';
import React from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

const AuthLayout = ({ children, title, subtitle, isLogin = true }) => {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
            {/* Left Side - Visual/Brand */}
            <div className="auth-visual-side" style={{
                flex: 1,
                backgroundColor: 'var(--slate-900)',
                color: 'white',
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background/Ambient effects */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                    opacity: 1,
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }}></div>

                {/* Brand */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.025em', color: 'white' }}>
                        Presentation Hub
                    </h2>
                </div>

                {/* Central Visual - Floating Cards Effect */}
                <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: 'var(--slate-300)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
                            Trusted by Professionals
                        </p>
                        {/* Abstract "Logos" or Cards */}
                        <div style={{ position: 'relative', width: '280px', height: '180px', margin: '0 auto' }}>
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '20px',
                                background: '#1e293b',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                                transform: 'rotate(-5deg)',
                                zIndex: 2,
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '0.9rem'
                            }}>
                                <span style={{ fontWeight: 700, color: '#94a3b8' }}>University</span>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '35px',
                                right: '10px',
                                background: '#4f46e5',
                                padding: '0.75rem 1.25rem',
                                borderRadius: '8px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                                transform: 'rotate(8deg)',
                                zIndex: 3,
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.9rem'
                            }}>
                                Coming Soon
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '15px',
                                left: '50px',
                                background: '#0f172a',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                                transform: 'rotate(-2deg)',
                                zIndex: 1,
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '0.9rem'
                            }}>
                                <span style={{ fontWeight: 700, color: '#cbd5e1' }}>Design Co.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonial */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    padding: '1.25rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginTop: 'auto',
                    position: 'relative',
                    zIndex: 2
                }}>
                    <p style={{ fontStyle: 'italic', marginBottom: '0.75rem', color: 'var(--primary-100)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                        "Getting personalized, data-driven recommendations beyond clinic that align with my aims and values has been revolutionary."
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-400)' }}></div>
                        <div>
                            <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>Dr. Sarah Jenkins</p>
                            <p style={{ fontSize: '0.7rem', opacity: 0.7, margin: 0 }}>Digital Health Strategist</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="auth-form-side" style={{
                flex: 1,
                backgroundColor: 'var(--bg-body)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '1.5rem', // Reduced padding
                overflowY: 'auto' // Allow internal scrolling if strictly needed
            }}>
                <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                    {/* Header */}
                    <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                            <Link href="/login" style={{
                                paddingBottom: '0.5rem',
                                borderBottom: isLogin ? '2px solid var(--slate-900)' : '2px solid transparent',
                                color: isLogin ? 'var(--slate-900)' : 'var(--text-muted)',
                                fontWeight: 600
                            }}>
                                Login
                            </Link>
                            <Link href="/register" style={{
                                paddingBottom: '0.5rem',
                                borderBottom: !isLogin ? '2px solid var(--slate-900)' : '2px solid transparent',
                                color: !isLogin ? 'var(--slate-900)' : 'var(--text-muted)',
                                fontWeight: 600
                            }}>
                                Register
                            </Link>
                        </div>

                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--slate-900)' }}>{title}</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{subtitle}</p>
                    </div>

                    {children}

                    <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        By creating your account, you agree to our <br />
                        <a href="#" style={{ textDecoration: 'underline' }}>Terms of Service</a> and <a href="#" style={{ textDecoration: 'underline' }}>Privacy Policy</a>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @media (max-width: 900px) {
          .auth-visual-side {
            display: none !important;
          }
          .auth-form-side {
            flex: 1;
            padding: 1rem;
            align-items: center;
          }
        }
      `}</style>
        </div>
    );
};

export default AuthLayout;
