'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import UploadForm from '../../components/UploadForm';
import PresentationList from '../../components/PresentationList';

const GridIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
);

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [presentations, setPresentations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) router.push('/login');
    }, [user, authLoading, router]);

    const fetchPresentations = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/presentations?userId=${user.uid}`);
            const result = await res.json();
            if (result.success) setPresentations(result.data);
        } catch (error) {
            console.error('Error fetching presentations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPresentations(); }, [user]);

    const handleUploadSuccess = (newP) => setPresentations(prev => [newP, ...prev]);
    const handleDelete = (id) => setPresentations(prev => prev.filter(p => p._id !== id));

    if (authLoading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid var(--slate-200)', borderTopColor: 'var(--slate-800)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading your dashboard...</p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
    if (!user) return null;

    const firstName = user.name?.split(' ')[0] || user.email?.split('@')[0] || 'there';

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--slate-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <GridIcon />
                        </div>
                        <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--slate-900)', margin: 0 }}>Dashboard</h1>
                    </div>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                        Welcome back, <strong style={{ color: 'var(--slate-700)' }}>{firstName}</strong> — manage your presentations below.
                    </p>
                </div>
                {/* Quick stats */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {[
                        { label: 'Total Files', value: presentations.length },
                        { label: 'Active Codes', value: presentations.filter(p => { const d = new Date(p.createdAt).getTime() + 86400000; return d > Date.now(); }).length },
                    ].map(({ label, value }) => (
                        <div key={label} style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: '12px', padding: '0.875rem 1.25rem', textAlign: 'center', minWidth: '100px' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)', margin: '0 0 0.1rem' }}>{value}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <UploadForm onUploadSuccess={handleUploadSuccess} />
            <PresentationList presentations={presentations} loading={loading} onDelete={handleDelete} />
        </div>
    );
}
