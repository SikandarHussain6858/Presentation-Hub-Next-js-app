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
    const maxV = Math.max(...data.map(d => d.views), 1);
    const pts = data.map((d, i) => ({
        x: PAD + (i / Math.max(data.length - 1, 1)) * (W - PAD * 2),
        y: PAD + (1 - d.views / maxV) * (H - PAD * 2),
        d,
    }));
    const polyline = pts.map(p => `${p.x},${p.y}`).join(' ');
    const area = `M${pts[0].x},${H - PAD} ` + pts.map(p => `L${p.x},${p.y}`).join(' ') + ` L${pts[pts.length - 1].x},${H - PAD} Z`;

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
                <path d={area} fill="url(#chartGrad)" />
                {/* Line */}
                <polyline points={polyline} fill="none" stroke="var(--primary-500)" strokeWidth="3" strokeLinejoin="round" />
                {/* Dots */}
                {pts.map((p, i) => (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="5" fill="var(--bg-card)" stroke="var(--primary-500)" strokeWidth="2.5" />
                    </g>
                ))}
                {/* X labels */}
                {pts.filter((_, i) => i % Math.ceil(pts.length / 7) === 0 || i === pts.length - 1).map((p, i) => (
                    <text key={i} x={p.x} y={H - 10} textAnchor="middle" fontSize="12" fill="var(--slate-500)" fontWeight="500">
                        {new Date(p.d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </text>
                ))}
            </svg>
        </div>
    );
}

/* ── Stat Card ── */
function StatCard({ label, value, icon, delay = 0 }) {
    const animated = useCountUp(value, 1000);
    return (
        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', animation: `fadeInUp 0.5s ${delay}ms both` }}>
            <div style={{ 
                width: '3.5rem', height: '3.5rem', 
                background: 'var(--primary-50)', 
                color: 'var(--primary-600)', 
                borderRadius: 'var(--radius-lg)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '1.5rem', flexShrink: 0 
            }}>
                {icon}
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
            borderBottom: '1px solid var(--border-color)',
            transition: 'background 0.2s',
        }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
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
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--primary-100)', borderTopColor: 'var(--primary-600)', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--slate-500)', fontWeight: 500 }}>Loading analytics...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (error) return (
        <div className="container" style={{ padding: '4rem 1rem', display: 'flex', justifyContent: 'center' }}>
            <div className="card" style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
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
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem', paddingBottom: '4rem' }}>
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
            `}</style>

            {/* Header */}
            <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
                <div>
                    <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--slate-500)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                        Back to Dashboard
                    </Link>
                    <h1>Analytics</h1>
                    <p style={{ color: 'var(--slate-500)', marginTop: '0.25rem' }}>Track your presentation performance and engagement.</p>
                </div>
                <button onClick={fetchAnalytics} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                    Refresh
                </button>
            </div>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatCard label="Total Views" value={stats.totalViews || 0} icon="👁️" delay={0} />
                <StatCard label="Downloads" value={stats.totalDownloads || 0} icon="📥" delay={100} />
                <StatCard label="Live Sessions" value={stats.totalLiveSessions || 0} icon="📡" delay={200} />
                <StatCard label="Presentations" value={stats.totalPresentations || 0} icon="📊" delay={300} />
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
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
                        <div className="card delay-100 animate-fade-in" style={{ padding: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--slate-800)' }}>Views Over Time</h2>
                            <LineChart data={chartData} />
                        </div>
                    )}

                    {/* Top Presentations */}
                    {topPresentations.length > 0 && (
                        <div className="card delay-200 animate-fade-in" style={{ padding: '1.5rem' }}>
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
                        <div className="card delay-100 animate-fade-in" style={{ gridColumn: '1 / -1', padding: '4rem 2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📊</div>
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
                <div className="table-container delay-100 animate-fade-in">
                    {presentations.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th style={{ textAlign: 'center' }}>Views</th>
                                    <th style={{ textAlign: 'center' }}>Downloads</th>
                                    <th style={{ textAlign: 'center' }}>Live Sessions</th>
                                    <th>Last Viewed</th>
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
                                        <td style={{ textAlign: 'center' }}>
                                            <span style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600 }}>{pres.liveSessions}</span>
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
                            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📂</div>
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
