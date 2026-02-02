'use client';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const UploadForm = ({ onUploadSuccess }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        presentationName: '',
        courseName: '',
        file: null
    });
    const [loading, setLoading] = useState(false);

    // Dropzone handler
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            setFormData(prev => ({ ...prev, file: acceptedFiles[0] }));
            toast.success('File attached successfully!');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.ms-powerpoint': ['.ppt'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
            'application/pdf': ['.pdf'],
            'application/vnd.oasis.opendocument.presentation': ['.odp'],
            'application/x-iwork-keynote-sffkey': ['.key']
        },
        multiple: false
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('You must be logged in to upload');
            return;
        }

        if (!formData.presentationName || !formData.courseName || !formData.file) {
            toast.error('Please fill in all fields and attach a file');
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            data.append('file', formData.file);
            data.append('userId', user.uid);
            data.append('userEmail', user.email);
            data.append('presentationName', formData.presentationName);
            data.append('courseName', formData.courseName);

            const response = await fetch('/api/presentations', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Upload failed');
            }

            // Reset form
            setFormData({ presentationName: '', courseName: '', file: null });
            toast.success('Presentation uploaded successfully!');

            if (onUploadSuccess) {
                onUploadSuccess(result.data);
            }
        } catch (err) {
            console.error("Upload Error:", err);
            toast.error('Upload failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card animate-fade-in" style={{ padding: '3rem', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Upload New Presentation</h2>
                <p style={{ color: 'var(--text-muted)' }}>Upload your slides to generate a classroom code</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ width: '4px', height: '16px', background: 'var(--primary-500)', borderRadius: '2px' }}></span>
                            Presentation Name
                        </label>
                        <input
                            type="text"
                            name="presentationName"
                            value={formData.presentationName}
                            onChange={handleChange}
                            placeholder="e.g., Final Project Defense"
                            style={{ padding: '1rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)' }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ width: '4px', height: '16px', background: 'var(--primary-500)', borderRadius: '2px' }}></span>
                            Course Name
                        </label>
                        <input
                            type="text"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            placeholder="e.g., CS 401 - Advanced Web Dev"
                            style={{ padding: '1rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)' }}
                        />
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ width: '4px', height: '16px', background: 'var(--primary-500)', borderRadius: '2px' }}></span>
                        Presentation File
                    </label>
                    <div
                        {...getRootProps()}
                        style={{
                            border: '2px dashed',
                            borderColor: isDragActive ? 'var(--primary-500)' : 'var(--slate-300)',
                            background: isDragActive ? 'var(--primary-50)' : 'var(--slate-50)',
                            borderRadius: '1rem',
                            padding: '3rem 2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <input {...getInputProps()} />
                        {formData.file ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '60px', height: '60px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                    <FiCheckCircle size={32} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: '600', color: 'var(--slate-800)', fontSize: '1.1rem' }}>{formData.file.name}</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <p style={{ color: 'var(--primary-600)', fontWeight: '500' }}>Click or drag to replace</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '64px', height: '64px', background: 'var(--primary-100)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-600)' }}>
                                    <FiUploadCloud size={32} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: '600', color: 'var(--slate-700)', fontSize: '1.1rem' }}>
                                        {isDragActive ? 'Drop your file here' : 'Click to Upload or Drag & Drop'}
                                    </p>
                                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                        Supports .PPT, .PPTX, .PDF, .KEY, .ODP
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1.1rem',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? (
                        <>
                            <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                            Uploading...
                        </>
                    ) : (
                        'Upload Presentation'
                    )}
                </button>
            </form>
        </div>
    );
};

export default UploadForm;
