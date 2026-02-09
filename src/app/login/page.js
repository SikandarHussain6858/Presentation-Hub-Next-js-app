'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/AuthLayout';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok && data.success) {
                toast.success('Login successful! Redirecting...');
                // Wait for cookie to be set, then redirect
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 500);
            } else {
                toast.error(data.error || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Log in to Presentation Hub"
            subtitle="Looking for your next presentation? Enter your details below."
            isLogin={true}
        >
            <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="btn"
                style={{
                    width: '100%',
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    color: 'var(--slate-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '2rem', // Match example pill shape
                    marginBottom: '1.5rem',
                    fontWeight: '600'
                }}
            >
                <FcGoogle size={20} />
                Sign in with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Or sign in with email</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder=""
                            style={{ borderRadius: '0.5rem', background: '#f8fafc' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder=""
                            style={{ borderRadius: '0.5rem', background: '#f8fafc' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--slate-500)', cursor: 'pointer' }}>
                        Forgot Password?
                    </span>
                </div>

                <button
                    type="submit"
                    className="btn"
                    style={{
                        width: '100%',
                        background: 'var(--slate-900)',
                        color: 'white',
                        borderRadius: '2rem',
                        padding: '0.875rem'
                    }}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Log in'}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Login;
