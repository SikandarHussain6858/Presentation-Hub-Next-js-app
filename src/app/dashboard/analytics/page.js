'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';

/* ── Animated counter hook ── */
function useCountUp(target, duration = 1200) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!target) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setVal(target); clearInterval(timer); }
            else setVal(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return val;
}

/* ── SVG Line Chart ── */
function LineChart({ data }) {
    if (!data || data.length === 0) return null;
    const W = 700, H = 250, PAD = 40;
    const maxV = Math.max(...data.map(d => Math.max(d.views, d.downloads)), 1);
    const ptsViews = data.map((d, i) => ({
        x: PAD + (i / Math.max(data.length - 1, 1)) * (W - PAD * 2),
        y: PAD + (1 - d.views / maxV) * (H - PAD * 2),
        d,
    }));
    const polylineViews = ptsViews.map(p => `${p.x},${p.y}`).join(' ');
    const areaViews = `M${ptsViews[0].x},${H - PAD} ` + ptsViews.map(p => `L${p.x},${p.y}`).join(' ') + ` L${ptsViews[ptsViews.length - 1].x},${H - PAD} Z`;

    return (
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', minWidth: '400px', height: 'auto', overflow: 'visible' }}>
                <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary-400)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--primary-400)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map(t => {
                    const y = PAD + t * (H - PAD * 2);
                    return <line key={t} x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="var(--slate-200)" strokeWidth="1" strokeDasharray="4 4" />;
                })}
                {/* Area fill */}
                <path d={areaViews} fill="url(#chartGrad)" />
                {/* Line */}
                <polyline points={polylineViews} fill="none" stroke="var(--primary-500)" strokeWidth="3" strokeLinejoin="round" />
                {/* Dots */}
                {ptsViews.map((p, i) => (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="5" fill="var(--bg-card)" stroke="var(--primary-500)" strokeWidth="2.5" />
                    </g>
                ))}
                {/* X labels */}
                {ptsViews.filter((_, i) => i % Math.ceil(ptsViews.length / 7) === 0 || i === ptsViews.length - 1).map((p, i) => (
                    <text key={i} x={p.x} y={H - 10} textAnchor="middle" fontSize="12" fill="var(--slate-500)" fontWeight="500">
                        {new Date(p.d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </text>
                ))}
            </svg>
        </div>
    );
}

import { FcBinoculars, FcDownload, FcComboChart } from 'react-icons/fc';

/* ── Stat Card ── */
function StatCard({ label, value, IconComponent, delay = 0, animationClass }) {
    const animated = useCountUp(value, 1000);
    return (
        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', animation: `fadeInUp 0.5s ${delay}ms both`, background: '#ffffff', border: '1px solid var(--slate-200)' }}>
            <div style={{ 
                width: '4.5rem', height: '4.5rem', 
                background: 'var(--slate-50)', 
                borderRadius: 'var(--radius-2xl)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                flexShrink: 0,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
            }}>
                <div className={`sticker-icon ${animationClass}`}>
                    <IconComponent size={40} />
                </div>
            </div>
            <div>
                <div style={{ color: 'var(--slate-500)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    {label}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1 }}>
                    {animated.toLocaleString()}
                </div>
            </div>
        </div>
    );
}

/* ── Top Presentation Row ── */
function TopRow({ pres, rank }) {
    const rankColors = ['#f59e0b', '#94a3b8', '#d97706']; // Gold, Silver, Bronze
    const rankBg = ['rgba(245, 158, 11, 0.1)', 'rgba(148, 163, 184, 0.1)', 'rgba(217, 119, 6, 0.1)'];

    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1rem',
            borderBottom: '1px solid var(--slate-200)',
            transition: 'background 0.2s',
            background: '#ffffff'
        }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
            onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
        >
            <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                background: rankBg[rank] || 'var(--slate-100)', 
                color: rankColors[rank] || 'var(--slate-600)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '0.9rem', fontWeight: 700, flexShrink: 0 
            }}>
                {rank + 1}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: 'var(--slate-800)', fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {pres.name}
                </div>
                <div style={{ color: 'var(--slate-500)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                    {pres.views} views • {pres.downloads} downloads
                </div>
            </div>
            <div style={{ background: 'var(--primary-50)', color: 'var(--primary-700)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, flexShrink: 0 }}>
                {pres.views}
            </div>
        </div>
    );
}

/* ── Main Analytics Component ── */
export default function AnalyticsDashboard() {
    const { user, loading: authLoading } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (authLoading) return;
        if (!user) { window.location.href = '/login'; return; }
        fetchAnalytics();
    }, [user, authLoading]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/analytics');
            const result = await res.json();
            if (!res.ok || !result.success) throw new Error(result.error || 'Failed to load analytics');
            setAnalytics(result.data);
        } catch (err) {
            setError(err.message || 'Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', background: 'var(--bg-body)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--primary-100)', borderTopColor: 'var(--primary-600)', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--slate-500)', fontWeight: 500 }}>Loading analytics...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (error) return (
        <div className="container" style={{ padding: '4rem 1rem', display: 'flex', justifyContent: 'center', background: 'var(--bg-body)', minHeight: '80vh' }}>
            <div className="card" style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '400px', width: '100%', background: '#ffffff' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2" style={{ margin: '0 auto 1rem' }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h3 style={{ color: 'var(--slate-800)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Failed to Load</h3>
                <p style={{ color: 'var(--slate-500)', marginBottom: '2rem' }}>{error}</p>
                <Link href="/dashboard" className="btn btn-primary">
                    ← Back to Dashboard
                </Link>
            </div>
        </div>
    );

    const stats = analytics?.stats || {};
    const presentations = analytics?.presentations || [];
    const topPresentations = analytics?.topPresentations || [];
    const chartData = analytics?.charts?.viewsByDay || [];

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem', paddingBottom: '4rem', background: 'var(--bg-body)', minHeight: '100vh' }}>
            <style>{`
                .overview-grid {
                    display: grid;
                    grid-template-columns: ${chartData.length > 0 ? '2fr 1fr' : '1fr'};
                    gap: 1.5rem;
                    align-items: start;
                }
                @media (max-width: 968px) {
                    .overview-grid {
                        grid-template-columns: 1fr;
                    }
                }
                
                /* Sticker Animations */
                .sticker-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
                }
                
                .anim-float {
                    animation: floatSticker 3s ease-in-out infinite;
                }
                .anim-bounce {
                    animation: bounceSticker 2s ease-in-out infinite;
                }
                .anim-pulse {
                    animation: pulseSticker 2.5s ease-in-out infinite;
                }

                @keyframes floatSticker {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(3deg); }
                }
                @keyframes bounceSticker {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15) translateY(-5px); }
                }
                @keyframes pulseSticker {
                    0%, 100% { transform: scale(1); filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
                    50% { transform: scale(1.05); filter: drop-shadow(0 8px 12px rgba(99,102,241,0.3)); }
                }
            `}</style>

            {/* Header */}
            <div className="dashboard-header" style={{ marginBottom: '2rem', background: '#ffffff', borderColor: 'var(--slate-200)' }}>
                <div>
                    <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--slate-500)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                        Back to Dashboard
                    </Link>
                    <h1 style={{ color: 'var(--slate-900)' }}>Analytics</h1>
                    <p style={{ color: 'var(--slate-500)', marginTop: '0.25rem' }}>Track your presentation performance and engagement.</p>
                </div>
                <button onClick={fetchAnalytics} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                    Refresh
                </button>
            </div>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard label="Total Views" value={stats.totalViews || 0} IconComponent={FcBinoculars} delay={0} animationClass="anim-float" />
                <StatCard label="Downloads" value={stats.totalDownloads || 0} IconComponent={FcDownload} delay={100} animationClass="anim-bounce" />
                <StatCard label="Presentations" value={stats.totalPresentations || 0} IconComponent={FcComboChart} delay={200} animationClass="anim-pulse" />
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--slate-200)' }}>
                {['overview', 'presentations'].map(tab => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)} 
                        style={{ 
                            padding: '0.75rem 1.5rem', 
                            background: 'none', 
                            border: 'none', 
                            borderBottom: `2px solid ${activeTab === tab ? 'var(--primary-600)' : 'transparent'}`,
                            color: activeTab === tab ? 'var(--primary-700)' : 'var(--slate-500)', 
                            fontWeight: 600, 
                            fontSize: '0.95rem', 
                            cursor: 'pointer', 
                            transition: 'all 0.2s' 
                        }}
                    >
                        {tab === 'overview' ? 'Overview' : 'All Presentations'}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="overview-grid">
                    {/* Line Chart */}
                    {chartData.length > 0 && (
                        <div className="card delay-100 animate-fade-in" style={{ padding: '1.5rem', background: '#ffffff', borderColor: 'var(--slate-200)' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--slate-800)' }}>Views Over Time</h2>
                            <LineChart data={chartData} />
                        </div>
                    )}

                    {/* Top Presentations */}
                    {topPresentations.length > 0 && (
                        <div className="card delay-200 animate-fade-in" style={{ padding: '1.5rem', background: '#ffffff', borderColor: 'var(--slate-200)' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--slate-800)' }}>Top Performing</h2>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {topPresentations.map((pres, idx) => (
                                    <TopRow key={pres.id} pres={pres} rank={idx} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty state for overview */}
                    {chartData.length === 0 && topPresentations.length === 0 && (
                        <div className="card delay-100 animate-fade-in" style={{ gridColumn: '1 / -1', padding: '4rem 2rem', textAlign: 'center', background: '#ffffff', borderColor: 'var(--slate-200)' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--slate-300)" strokeWidth="2" style={{ margin: '0 auto 1rem' }}>
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--slate-800)', marginBottom: '0.5rem' }}>No Data Yet</h3>
                            <p style={{ color: 'var(--slate-500)' }}>Share your presentations to start generating analytics!</p>
                            <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                                Go to Dashboard
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'presentations' && (
                <div className="table-container delay-100 animate-fade-in" style={{ background: '#ffffff', borderColor: 'var(--slate-200)' }}>
                    {presentations.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ background: 'var(--slate-50)' }}>Name</th>
                                    <th style={{ textAlign: 'center', background: 'var(--slate-50)' }}>Views</th>
                                    <th style={{ textAlign: 'center', background: 'var(--slate-50)' }}>Downloads</th>
                                    <th style={{ background: 'var(--slate-50)' }}>Last Viewed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {presentations.map((pres) => (
                                    <tr key={pres.id}>
                                        <td>
                                            <div style={{ fontWeight: 600, color: 'var(--slate-800)' }}>{pres.name}</div>
                                            <div style={{ color: 'var(--slate-500)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                                                Created {new Date(pres.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span style={{ background: 'var(--primary-50)', color: 'var(--primary-700)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600 }}>{pres.views}</span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600 }}>{pres.downloads}</span>
                                        </td>
                                        <td style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
                                            {new Date(pres.lastViewed).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--slate-300)" strokeWidth="2" style={{ margin: '0 auto 1rem' }}>
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <h3 style={{ fontSize: '1.25rem', color: 'var(--slate-800)', marginBottom: '0.5rem' }}>No Presentations Yet</h3>
                            <p style={{ color: 'var(--slate-500)' }}>Create your first presentation to get started.</p>
                            <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                                Create One
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
