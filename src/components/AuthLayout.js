'use client';
import React from 'react';
import Link from 'next/link';

const AuthLayout = ({ children, title, subtitle, isLogin = true }) => {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
            {/* Left Visual Panel */}
            <div className="auth-visual-side" style={{ flex: 1, backgroundColor: 'var(--slate-900)', color: 'white', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
                {/* Grid texture */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
                {/* Glow */}
                <div style={{ position: 'absolute', top: '-15%', right: '-15%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

                {/* Brand */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
                        <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>Presentation Hub</span>
                    </Link>
                </div>

                {/* Center Visual */}
                <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Floating access code card */}
                    <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '280px', backdropFilter: 'blur(12px)' }}>
                        <p style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate-500)', marginBottom: '0.75rem' }}>Current Presentation</p>
                        <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-200)', marginBottom: '1.25rem' }}>Final Year Project Defense</p>
                        <div style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--slate-400)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Access Code</p>
                            <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '0.2em', color: 'white', margin: 0 }}>856-992</p>
                        </div>
                        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ width: '7px', height: '7px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 5px #10b981' }} />
                            <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>Active — expires in 23h 14m</span>
                        </div>
                    </div>
                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '280px' }}>
                        {[['1,200+', 'Students'], ['99.9%', 'Uptime'], ['6-digit', 'Codes']].map(([val, lbl]) => (
                            <div key={lbl} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '0.875rem 0.5rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '1rem', fontWeight: 800, color: 'white', margin: '0 0 0.2rem' }}>{val}</p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--slate-500)', margin: 0 }}>{lbl}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonial */}
                <div style={{ position: 'relative', zIndex: 2, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontStyle: 'italic', marginBottom: '0.875rem', color: 'var(--slate-300)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                        "Presentation Hub saved me when the lab PC wouldn't read my USB. Entered my code and it just worked. Absolute lifesaver."
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>A</div>
                        <div>
                            <p style={{ fontSize: '0.82rem', fontWeight: 700, margin: 0, color: 'var(--slate-200)' }}>Ahmad K.</p>
                            <p style={{ fontSize: '0.72rem', opacity: 0.6, margin: 0, color: 'var(--slate-400)' }}>CS Final Year Student</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="auth-form-side" style={{ flex: 1, backgroundColor: 'var(--bg-body)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
                <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                    {/* Tab switcher */}
                    <div style={{ display: 'flex', gap: '0', marginBottom: '2rem', background: 'var(--slate-100)', borderRadius: '10px', padding: '4px' }}>
                        <Link href="/login" style={{ flex: 1, textAlign: 'center', padding: '0.625rem', borderRadius: '7px', fontSize: '0.9rem', fontWeight: 600, color: isLogin ? 'var(--slate-900)' : 'var(--slate-500)', background: isLogin ? 'white' : 'transparent', textDecoration: 'none', boxShadow: isLogin ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
                            Sign In
                        </Link>
                        <Link href="/register" style={{ flex: 1, textAlign: 'center', padding: '0.625rem', borderRadius: '7px', fontSize: '0.9rem', fontWeight: 600, color: !isLogin ? 'var(--slate-900)' : 'var(--slate-500)', background: !isLogin ? 'white' : 'transparent', textDecoration: 'none', boxShadow: !isLogin ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
                            Register
                        </Link>
                    </div>

                    <div style={{ marginBottom: '1.75rem' }}>
                        <h1 style={{ fontSize: '1.625rem', fontWeight: 800, marginBottom: '0.375rem', color: 'var(--slate-900)' }}>{title}</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{subtitle}</p>
                    </div>

                    {children}

                    <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        By continuing, you agree to our{' '}
                        <a href="#" style={{ textDecoration: 'underline', color: 'var(--slate-600)' }}>Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" style={{ textDecoration: 'underline', color: 'var(--slate-600)' }}>Privacy Policy</a>.
                    </p>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .auth-visual-side { display: none !important; }
                    .auth-form-side { flex: 1; padding: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default AuthLayout;
