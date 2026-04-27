'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

const contactInfo = [
    { label: 'Email', value: 'support@presentationhub.app', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    )},
    { label: 'Response Time', value: 'Within 24 hours', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    )},
    { label: 'Availability', value: 'Mon – Fri, 9am – 6pm', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    )},
];

export default function ContactUs() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
            const data = await res.json();
            if (data.success) {
                toast.success('Message sent! We\'ll get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error('Failed to send message. Please try again.');
            }
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--slate-200)', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.9rem', background: 'var(--slate-50)', color: 'var(--slate-900)', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' };

    return (
        <div style={{ background: 'var(--slate-50)', minHeight: '100vh', padding: '4rem 1.5rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                {/* Page header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--primary-600)', marginBottom: '0.75rem' }}>Get in Touch</p>
                    <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1rem' }}>We&apos;re here to help</h1>
                    <p style={{ color: 'var(--slate-500)', fontSize: '1rem', maxWidth: '440px', margin: '0 auto' }}>
                        Have a question, feature request, or just want to say hi? Drop us a message and we&apos;ll respond promptly.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
                    {/* Left info panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {contactInfo.map(({ label, value, icon }) => (
                            <div key={label} style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: '14px', padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--slate-600)', flexShrink: 0 }}>
                                    {icon}
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.2rem' }}>{label}</p>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--slate-800)', margin: 0 }}>{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right form */}
                    <div style={{ background: 'white', border: '1px solid var(--slate-200)', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.375rem' }}>Send us a message</h2>
                        <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem', marginBottom: '2rem' }}>Fill out the form and our team will respond within 24 hours.</p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" style={inputStyle}
                                        onFocus={e => { e.target.style.borderColor = 'var(--slate-400)'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)'; }}
                                        onBlur={e => { e.target.style.borderColor = 'var(--slate-200)'; e.target.style.background = 'var(--slate-50)'; e.target.style.boxShadow = 'none'; }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle}
                                        onFocus={e => { e.target.style.borderColor = 'var(--slate-400)'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)'; }}
                                        onBlur={e => { e.target.style.borderColor = 'var(--slate-200)'; e.target.style.background = 'var(--slate-50)'; e.target.style.boxShadow = 'none'; }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Subject</label>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this regarding?" style={inputStyle}
                                    onFocus={e => { e.target.style.borderColor = 'var(--slate-400)'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'var(--slate-200)'; e.target.style.background = 'var(--slate-50)'; e.target.style.boxShadow = 'none'; }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe your question or feedback in detail..." rows={5}
                                    style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                                    onFocus={e => { e.target.style.borderColor = 'var(--slate-400)'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'var(--slate-200)'; e.target.style.background = 'var(--slate-50)'; e.target.style.boxShadow = 'none'; }} />
                            </div>
                            <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', borderRadius: '10px', background: 'var(--slate-900)', color: 'white', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}
                                onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#000'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
                                onMouseLeave={e => { e.currentTarget.style.background = 'var(--slate-900)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                {loading ? 'Sending...' : <><SendIcon /> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .container > div[style*="grid-template-columns: 1fr 2fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
