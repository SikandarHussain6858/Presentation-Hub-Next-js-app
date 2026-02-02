'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                toast.success('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                toast.error('Failed to send message');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <div className="form-container animate-fade-in" style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 className="form-title">Contact Us</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        We'd love to hear from you. Send us a message!
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What is this regarding?"
                        />
                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Type your message here..."
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                border: '1px solid var(--slate-300)',
                                borderRadius: 'var(--radius-lg)',
                                fontFamily: 'inherit',
                                fontSize: '0.95rem',
                                minHeight: '150px',
                                resize: 'vertical',
                                backgroundColor: 'var(--slate-50)',
                                transition: 'var(--transition)'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'var(--primary-color)';
                                e.target.style.backgroundColor = 'white';
                                e.target.style.outline = 'none';
                                e.target.style.boxShadow = '0 0 0 3px var(--primary-100)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'var(--slate-300)';
                                e.target.style.backgroundColor = 'var(--slate-50)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Sending Message...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}
