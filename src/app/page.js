'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

/* ── Icons ── */
const UploadIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>);
const KeyIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>);
const MonitorIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>);
const UserPlusIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>);
const ArrowRightIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
const StarIcon = ({ fill }) => (<svg width="14" height="14" viewBox="0 0 24 24" fill={fill ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>);

/* ── Animated counter hook ── */
function useCountUp(target, duration = 1500, start = false) {
    const [val, setVal] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        if (!start || !target) return;
        let cur = 0;
        const step = target / (duration / 16);
        ref.current = setInterval(() => {
            cur += step;
            if (cur >= target) { setVal(target); clearInterval(ref.current); }
            else setVal(Math.floor(cur));
        }, 16);
        return () => clearInterval(ref.current);
    }, [target, duration, start]);
    return val;
}

/* ── Intersection observer hook ── */
function useInView() {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
}

const features = [
    { icon: <UserPlusIcon />, step: '01', title: 'Create Account', desc: 'Sign up in seconds. Get your personal dashboard for managing all presentation files in one place.', color: '#6366f1' },
    { icon: <UploadIcon />, step: '02', title: 'Upload Your Slides', desc: 'Supports PowerPoint, PDF, Keynote and more. Tag presentations with course names for easy organization.', color: '#8b5cf6' },
    { icon: <KeyIcon />, step: '03', title: 'Receive an Access Code', desc: 'Every upload generates a unique 6-digit access code instantly — no configuration required.', color: '#ec4899' },
    { icon: <MonitorIcon />, step: '04', title: 'Present Instantly', desc: 'Enter the code on any classroom computer. Your presentation loads immediately — no sign-in needed.', color: '#0ea5e9' },
];

/* ── Stat Item (animated on scroll) ── */
function StatItem({ value, label, suffix = '' }) {
    const [ref, inView] = useInView();
    const animated = useCountUp(value, 1400, inView);
    return (
        <div ref={ref} style={{ textAlign: 'center', padding: '1.5rem 2rem' }}>
            <div style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {animated.toLocaleString()}{suffix}
            </div>
            <div style={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.875rem', marginTop: '0.4rem', fontWeight: 500 }}>{label}</div>
        </div>
    );
}

export default function Home() {
    const [stats, setStats] = useState({ average: 0, count: 0 });
    const [animatedCode, setAnimatedCode] = useState('------');
    const [codeGlow, setCodeGlow] = useState(false);
    const [featuresRef, featuresInView] = useInView();

    useEffect(() => {
        fetch('/api/feedback')
            .then(res => res.json())
            .then(data => { if (data.success) setStats(data.data); })
            .catch(() => {});
    }, []);

    // Animate access code with glow pulse
    useEffect(() => {
        const codes = ['856992', '341208', '774513', '629047'];
        let i = 0;
        const interval = setInterval(() => {
            setCodeGlow(true);
            setTimeout(() => {
                setAnimatedCode(codes[i % codes.length]);
                setCodeGlow(false);
                i++;
            }, 300);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ backgroundColor: 'var(--slate-50)' }}>
            {/* ── HERO ── */}
            <section style={{ background: 'var(--slate-900)', color: 'white', padding: '6rem 0 7rem', position: 'relative', overflow: 'hidden' }}>
                {/* Grid background */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
                {/* Glow blobs */}
                <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'blobFloat 10s ease-in-out infinite alternate' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'blobFloat 12s ease-in-out infinite alternate-reverse' }} />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap' }}>
                        {/* Left */}
                        <div style={{ flex: '1.2', minWidth: '300px', animation: 'heroFadeIn 0.7s both' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(255,255,255,0.07)', borderRadius: '50px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-300)', letterSpacing: '0.02em' }}>
                                <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 6px #10b981', animation: 'pulse 2s ease-in-out infinite' }} />
                                v2.0 — Now Available
                            </div>

                            <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', color: 'white', letterSpacing: '-0.03em' }}>
                                Master Your<br />
                                <span style={{ color: 'var(--slate-400)' }}>Classroom Slides.</span>
                            </h1>

                            <p style={{ fontSize: '1.1rem', color: 'var(--slate-400)', maxWidth: '520px', lineHeight: 1.75, marginBottom: '2.5rem' }}>
                                Upload, manage and present your university work using a secure 6-digit access code. No USB drives, no sign-in at the podium — just present.
                            </p>

                            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                                <Link href="/register">
                                    <button className="hero-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', borderRadius: '10px', background: 'white', color: 'var(--slate-900)', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer', transition: 'all 0.25s', boxShadow: '0 4px 20px rgba(255,255,255,0.15)' }}>
                                        Get Started Free <ArrowRightIcon />
                                    </button>
                                </Link>
                                <Link href="/classroom">
                                    <button className="hero-btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', borderRadius: '10px', background: 'transparent', color: 'var(--slate-300)', fontWeight: 600, fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'all 0.25s' }}>
                                        <MonitorIcon /> Classroom Mode
                                    </button>
                                </Link>
                            </div>

                            {/* Trust row */}
                            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', animation: 'heroFadeIn 0.7s 0.3s both' }}>
                                <div style={{ display: 'flex' }}>
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} style={{ width: '34px', height: '34px', borderRadius: '50%', background: `hsl(${220 + i * 15}, 65%, 72%)`, border: '2px solid var(--slate-900)', marginLeft: i > 0 ? '-10px' : '0' }} />
                                    ))}
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.15rem' }}>
                                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{stats.average ? stats.average.toFixed(1) : '5.0'}</span>
                                        {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} fill={true} />)}
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--slate-500)' }}>Based on {stats.count || 100}+ student reviews</p>
                                </div>
                            </div>
                        </div>

                        {/* Right — animated UI card */}
                        <div className="hero-visuals" style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center', animation: 'heroFadeIn 0.7s 0.15s both' }}>
                            <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)', transform: 'rotate(-2deg)', transition: 'transform 0.4s ease' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'rotate(-2deg)'}>
                                    <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem' }}>
                                        {['#EF4444', '#F59E0B', '#10B981'].map(c => <div key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />)}
                                    </div>
                                    <div style={{ height: '8px', width: '55%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginBottom: '0.6rem' }} />
                                    <div style={{ height: '8px', width: '80%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginBottom: '1.75rem' }} />
                                    <div style={{ background: codeGlow ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.2)', borderRadius: '12px', padding: '1.25rem', border: `1px solid ${codeGlow ? 'rgba(99,102,241,0.6)' : 'rgba(99,102,241,0.3)'}`, textAlign: 'center', transition: 'all 0.3s ease', boxShadow: codeGlow ? '0 0 20px rgba(99,102,241,0.3)' : 'none' }}>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Access Code</p>
                                        <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '2rem', fontWeight: 800, letterSpacing: '0.2em', color: 'white', transition: 'opacity 0.3s', opacity: codeGlow ? 0.4 : 1 }}>{animatedCode}</p>
                                    </div>
                                    <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
                                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem' }}>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: 0 }}>Course</p>
                                            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-200)', margin: '0.2rem 0 0' }}>CS 401</p>
                                        </div>
                                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem' }}>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: 0 }}>File</p>
                                            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-200)', margin: '0.2rem 0 0' }}>Final.pptx</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating badge */}
                                <div style={{ position: 'absolute', bottom: '-16px', left: '20px', background: 'white', borderRadius: '10px', padding: '0.625rem 1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', transform: 'rotate(2deg)' }}>
                                    <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 6px #10b981', animation: 'pulse 2s ease-in-out infinite' }} />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-800)' }}>Ready to present</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── LIVE STATS BAND ── */}
            <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <StatItem value={1200} label="Presentations Uploaded" suffix="+" />
                        <StatItem value={8500} label="Classroom Sessions" suffix="+" />
                        <StatItem value={98} label="Uptime" suffix="%" />
                        <StatItem value={stats.count || 250} label="Happy Students" suffix="+" />
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section style={{ padding: '6rem 0', background: 'var(--slate-50)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary-600)', marginBottom: '0.75rem' }}>How It Works</p>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1rem' }}>Four steps to a seamless presentation</h2>
                        <p style={{ fontSize: '1.05rem', color: 'var(--slate-500)', maxWidth: '540px', margin: '0 auto' }}>We handle the file logistics so you can stay focused on delivering your best work.</p>
                    </div>

                    <div ref={featuresRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {features.map((f, i) => (
                            <div key={f.step} className="feature-card" style={{
                                background: 'white', padding: '2rem', borderRadius: '16px',
                                border: '1px solid var(--slate-200)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                opacity: featuresInView ? 1 : 0,
                                transform: featuresInView ? 'translateY(0)' : 'translateY(24px)',
                                transition: `opacity 0.5s ${i * 100}ms, transform 0.5s ${i * 100}ms`,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div style={{ width: '48px', height: '48px', background: `${f.color}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color }}>
                                        {f.icon}
                                    </div>
                                    <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--slate-100)', fontFamily: '"Outfit", sans-serif', lineHeight: 1 }}>{f.step}</span>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.625rem', color: 'var(--slate-900)' }}>{f.title}</h3>
                                <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', lineHeight: 1.65 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section style={{ background: 'var(--slate-900)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>Ready to simplify your presentations?</h2>
                    <p style={{ color: 'var(--slate-400)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>Join hundreds of students who never worry about USB drives or classroom logins again.</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/register">
                            <button className="hero-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', borderRadius: '10px', background: 'white', color: 'var(--slate-900)', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer', transition: 'all 0.25s' }}>
                                Create Free Account <ArrowRightIcon />
                            </button>
                        </Link>
                        <Link href="/classroom">
                            <button style={{ padding: '0.875rem 2rem', borderRadius: '10px', background: 'transparent', color: 'var(--slate-300)', fontWeight: 600, fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'all 0.2s' }}>
                                Enter Classroom Code
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                .feature-card:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.09) !important; border-color: var(--primary-200) !important; }
                .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,255,255,0.2); }
                .hero-btn-secondary:hover { background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.3) !important; }
                @keyframes heroFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes blobFloat { from { transform: scale(1) translate(0, 0); } to { transform: scale(1.08) translate(10px, -15px); } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
                @media (max-width: 900px) { .hero-visuals { display: none !important; } }
            `}</style>
        </div>
    );
}
