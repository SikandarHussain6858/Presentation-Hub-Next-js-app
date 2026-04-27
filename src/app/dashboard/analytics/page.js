'use client';
import React, { useState, useEffect, useRef } from 'react';
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
    const W = 700, H = 200, PAD = 40;
    const maxV = Math.max(...data.map(d => d.views), 1);
    const pts = data.map((d, i) => ({
        x: PAD + (i / Math.max(data.length - 1, 1)) * (W - PAD * 2),
        y: PAD + (1 - d.views / maxV) * (H - PAD * 2),
        d,
    }));
    const polyline = pts.map(p => `${p.x},${p.y}`).join(' ');
    const area = `M${pts[0].x},${H - PAD} ` + pts.map(p => `L${p.x},${p.y}`).join(' ') + ` L${pts[pts.length - 1].x},${H - PAD} Z`;

    return (
        <div style={{ overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', minWidth: '300px', height: 'auto' }}>
                <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map(t => {
                    const y = PAD + t * (H - PAD * 2);
                    return <line key={t} x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="rgba(148,163,184,0.15)" strokeWidth="1" />;
                })}
                {/* Area fill */}
                <path d={area} fill="url(#chartGrad)" />
                {/* Line */}
                <polyline points={polyline} fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinejoin="round" filter="url(#glow)" />
                {/* Dots */}
                {pts.map((p, i) => (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="5" fill="#6366f1" stroke="white" strokeWidth="2" />
                    </g>
                ))}
                {/* X labels */}
                {pts.filter((_, i) => i % Math.ceil(pts.length / 7) === 0 || i === pts.length - 1).map((p, i) => (
                    <text key={i} x={p.x} y={H - 6} textAnchor="middle" fontSize="10" fill="rgba(148,163,184,0.8)">
                        {new Date(p.d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </text>
                ))}
            </svg>
        </div>
    );
}

/* ── Stat Card with AI glow theme ── */
function StatCard({ label, value, icon, gradient, delay = 0 }) {
    const animated = useCountUp(value, 1000);
    return (
        <div style={{
            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
            borderRadius: '20px',
            padding: '1.75rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: `0 8px 32px ${gradient[0]}44`,
            animation: `fadeSlideUp 0.5s ${delay}ms both`,
            cursor: 'default',
            transition: 'transform 0.3s, box-shadow 0.3s',
        }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 48px ${gradient[0]}66`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 32px ${gradient[0]}44`; }}
        >
            {/* Glow blob */}
            <div style={{ position: 'absolute', top: '-30%', right: '-15%', width: '120px', height: '120px', background: `radial-gradient(circle, ${gradient[0]}66, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
            <div style={{ fontSize: '2.25rem', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {animated.toLocaleString()}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', fontWeight: 500, marginTop: '0.375rem' }}>
                {label}
            </div>
        </div>
    );
}

/* ── Top Presentation Row ── */
function TopRow({ pres, rank, colors }) {
    const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1rem 1.25rem',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.06)',
            transition: 'background 0.2s, transform 0.2s',
            cursor: 'default',
        }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateX(0)'; }}
        >
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: rankColors[rank] + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                {rank === 0 ? '🥇' : rank === 1 ? '🥈' : '🥉'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {pres.name}
                </div>
                <div style={{ color: 'rgba(148,163,184,0.8)', fontSize: '0.78rem', marginTop: '0.15rem' }}>
                    {pres.views} views · {pres.downloads} downloads
                </div>
            </div>
            <div style={{ background: `${colors[rank]}22`, color: colors[rank], padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0 }}>
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
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', animation: 'spin 0.9s linear infinite' }} />
                <div style={{ position: 'absolute', inset: '8px', borderRadius: '50%', border: '3px solid rgba(139,92,246,0.15)', borderBottomColor: '#8b5cf6', animation: 'spin 1.4s linear infinite reverse' }} />
            </div>
            <p style={{ color: 'rgba(148,163,184,0.8)', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', letterSpacing: '0.05em' }}>Initializing AI Analytics...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (error) return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '16px', padding: '2rem', textAlign: 'center', maxWidth: '420px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
                <p style={{ color: '#fca5a5', marginBottom: '1.5rem' }}>{error}</p>
                <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#6366f1', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>← Back to Dashboard</Link>
            </div>
        </div>
    );

    const stats = analytics?.stats || {};
    const presentations = analytics?.presentations || [];
    const topPresentations = analytics?.topPresentations || [];
    const chartData = analytics?.charts?.viewsByDay || [];
    const accentColors = ['#818cf8', '#34d399', '#fb923c'];

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', fontFamily: "'Inter', sans-serif", color: 'white' }}>
            {/* Animated background particles */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${['rgba(99,102,241,0.08)', 'rgba(139,92,246,0.06)', 'rgba(168,85,247,0.05)'][i % 3]}, transparent 70%)`,
                        width: `${300 + i * 80}px`, height: `${300 + i * 80}px`,
                        top: `${[10, 60, 30, 80, 5, 50][i]}%`,
                        left: `${[70, 10, 85, 5, 40, 90][i]}%`,
                        transform: 'translate(-50%, -50%)',
                        animation: `float ${8 + i * 2}s ease-in-out infinite alternate`,
                    }} />
                ))}
            </div>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
                {/* Header */}
                <div style={{ marginBottom: '2.5rem', animation: 'fadeSlideUp 0.5s both' }}>
                    <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(148,163,184,0.8)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1.5rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(148,163,184,0.8)'}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                        Back to Dashboard
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                                </div>
                                <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, margin: 0, background: 'linear-gradient(135deg, #e2e8f0, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }}>
                                    AI Analytics
                                </h1>
                            </div>
                            <p style={{ color: 'rgba(148,163,184,0.7)', margin: 0, fontSize: '0.9rem' }}>
                                Real-time intelligence on your presentation performance
                            </p>
                        </div>

                        <button onClick={fetchAnalytics} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '10px', color: '#818cf8', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.25)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                    <StatCard label="Total Views" value={stats.totalViews || 0} icon="👁️" gradient={['#4f46e5', '#7c3aed']} delay={0} />
                    <StatCard label="Downloads" value={stats.totalDownloads || 0} icon="⬇️" gradient={['#059669', '#0d9488']} delay={80} />
                    <StatCard label="Live Sessions" value={stats.totalLiveSessions || 0} icon="📡" gradient={['#d97706', '#b45309']} delay={160} />
                    <StatCard label="Presentations" value={stats.totalPresentations || 0} icon="🗂️" gradient={['#7c3aed', '#6d28d9']} delay={240} />
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '0.375rem', border: '1px solid rgba(255,255,255,0.06)', width: 'fit-content' }}>
                    {['overview', 'presentations'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '0.5rem 1.25rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.25s', background: activeTab === tab ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent', color: activeTab === tab ? 'white' : 'rgba(148,163,184,0.7)', boxShadow: activeTab === tab ? '0 4px 15px rgba(99,102,241,0.3)' : 'none' }}>
                            {tab === 'overview' ? '📊 Overview' : '📋 All Presentations'}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: chartData.length > 0 ? '1fr 340px' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
                        {/* Line Chart */}
                        {chartData.length > 0 && (
                            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '1.75rem', animation: 'fadeSlideUp 0.5s 0.2s both' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px #6366f1' }} />
                                    <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Views Over Time</h2>
                                </div>
                                <LineChart data={chartData} />
                            </div>
                        )}

                        {/* Top Presentations */}
                        {topPresentations.length > 0 && (
                            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '1.75rem', animation: 'fadeSlideUp 0.5s 0.3s both' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                                    <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Top Performing</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {topPresentations.map((pres, idx) => (
                                        <TopRow key={pres.id} pres={pres} rank={idx} colors={accentColors} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty state for overview */}
                        {chartData.length === 0 && topPresentations.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '4rem 2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔮</div>
                                <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: '1rem' }}>No data yet. Share your presentations to start generating analytics!</p>
                                <Link href="/dashboard" style={{ display: 'inline-flex', marginTop: '1.25rem', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '10px', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Go to Dashboard</Link>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'presentations' && (
                    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden', animation: 'fadeSlideUp 0.4s both' }}>
                        {presentations.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                                            {['Name', 'Views', 'Downloads', 'Live Sessions', 'Last Viewed'].map(h => (
                                                <th key={h} style={{ padding: '1rem 1.25rem', textAlign: h === 'Name' ? 'left' : 'center', fontWeight: 600, fontSize: '0.8rem', color: 'rgba(148,163,184,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {presentations.map((pres, i) => (
                                            <tr key={pres.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.06)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: '1rem 1.25rem' }}>
                                                    <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '0.2rem' }}>{pres.name}</div>
                                                    <div style={{ color: 'rgba(148,163,184,0.6)', fontSize: '0.78rem' }}>Created {new Date(pres.createdAt).toLocaleDateString()}</div>
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <span style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 700 }}>{pres.views}</span>
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <span style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 700 }}>{pres.downloads}</span>
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <span style={{ background: 'rgba(251,146,60,0.15)', color: '#fb923c', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 700 }}>{pres.liveSessions}</span>
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'center', color: 'rgba(148,163,184,0.6)', fontSize: '0.85rem' }}>
                                                    {new Date(pres.lastViewed).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
                                <p style={{ color: 'rgba(148,163,184,0.7)' }}>No presentations yet.</p>
                                <Link href="/dashboard" style={{ display: 'inline-flex', marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '10px', color: 'white', textDecoration: 'none', fontWeight: 600 }}>Create One</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    from { transform: translate(-50%, -50%) scale(1); }
                    to { transform: translate(-50%, -50%) scale(1.15); }
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
