'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import UploadForm from '../../components/UploadForm';
import PresentationList from '../../components/PresentationList';

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [presentations, setPresentations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Auth Protection
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    // Fetch Data
    const fetchPresentations = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/presentations?userId=${user.uid}`);
            const result = await res.json();
            if (result.success) {
                setPresentations(result.data);
            }
        } catch (error) {
            console.error("Error fetching presentations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPresentations();
    }, [user]);

    const handleUploadSuccess = (newPresentation) => {
        setPresentations(prev => [newPresentation, ...prev]);
    };

    const handleDelete = (presentationId) => {
        setPresentations(prev => prev.filter(p => p._id !== presentationId));
    };

    if (authLoading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
    if (!user) return null; // Router will redirect

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user.email}</p>
                </div>
            </div>

            <UploadForm onUploadSuccess={handleUploadSuccess} />
            <PresentationList presentations={presentations} loading={loading} onDelete={handleDelete} />
        </div>
    );
}
