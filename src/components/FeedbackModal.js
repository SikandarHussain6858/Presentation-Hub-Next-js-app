'use client';
import React, { useState, useEffect } from 'react';
import { FiStar, FiMessageSquare, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FeedbackModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }
        if (!comment.trim()) {
            toast.error('Please verify your experience');
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, comment })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Thank you for your feedback!');
                setIsOpen(false);
                setRating(0);
                setComment('');
            } else {
                toast.error(data.error || 'Failed to submit feedback');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="btn glass"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 40,
                    borderRadius: '50px',
                    padding: '0.75rem 1.25rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(8px)',
                    background: 'var(--slate-900)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <FiMessageSquare />
                Feedback
            </button>

            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div className="animate-scale-in" style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '1.5rem',
                        maxWidth: '400px',
                        width: '100%',
                        position: 'relative',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.5rem'
                            }}
                        >
                            <FiX size={20} color="var(--slate-400)" />
                        </button>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>
                            Rate Your Experience
                        </h3>
                        <p style={{ color: 'var(--slate-500)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            Your feedback helps us improve Presentation Hub.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transform: (hoverRating || rating) >= star ? 'scale(1.1)' : 'scale(1)',
                                            transition: 'transform 0.1s'
                                        }}
                                    >
                                        <FiStar
                                            size={32}
                                            fill={(hoverRating || rating) >= star ? "#F59E0B" : "transparent"}
                                            color={(hoverRating || rating) >= star ? "#F59E0B" : "#CBD5E1"}
                                        />
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell us what you like or what we can improve..."
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid var(--slate-200)',
                                    marginBottom: '1.5rem',
                                    minHeight: '100px',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                            />

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%', borderRadius: '50px' }}
                                disabled={submitting}
                            >
                                {submitting ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FeedbackModal;
