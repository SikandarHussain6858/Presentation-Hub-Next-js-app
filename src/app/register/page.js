'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import AuthLayout from '../../components/AuthLayout';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('Please fill in all fields');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            console.log('Sending registration request...');
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            console.log('Response status:', res.status);
            const data = await res.json();
            console.log('Response data:', data);

            if (res.ok && data.success) {
                toast.success('Registration successful! Redirecting...');
                console.log('Registration successful, redirecting to dashboard...');
                console.log('Cookies after registration:', document.cookie);
                // Wait a moment for cookie to be set, then redirect
                setTimeout(() => {
                    console.log('Redirecting now...');
                    window.location.href = '/dashboard';
                }, 1000);
            } else {
                console.error('Registration failed:', data.error);
                toast.error(data.error || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            toast.error('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Get started with Presentation Hub today."
            isLogin={false}
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
                    borderRadius: '2rem',
                    marginBottom: '1.5rem',
                    fontWeight: '600'
                }}
            >
                <FcGoogle size={20} />
                Sign up with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Or sign up with email</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder=""
                            style={{ borderRadius: '0.5rem', background: '#f8fafc' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
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

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder=""
                            style={{ borderRadius: '0.5rem', background: '#f8fafc' }}
                        />
                    </div>
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
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
