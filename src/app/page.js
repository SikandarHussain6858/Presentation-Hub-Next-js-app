'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiUpload, FiMonitor, FiKey, FiArrowRight, FiCheck, FiStar } from 'react-icons/fi';

export default function Home() {
  const [stats, setStats] = useState({ average: 0, count: 0 });

  useEffect(() => {
    fetch('/api/feedback')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home animate-fade-in" style={{ backgroundColor: 'var(--slate-50)' }}>
      {/* 
        -----------------------------------------------------------------
        HERO SECTION - Dark Theme to match Auth/Brand
        -----------------------------------------------------------------
      */}
      <div className="home-hero-section" style={{
        backgroundColor: 'var(--slate-900)',
        color: 'white',
        padding: '6rem 0 8rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Background Effects - Unifying with Black Theme */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
          opacity: 1,
          borderRadius: '50%',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)',
          opacity: 1,
          borderRadius: '50%',
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>

            {/* Left Content */}
            <div style={{ flex: '1.2', minWidth: '300px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50px',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-100)' }}>v2.0 Now Available</span>
              </div>

              <h1 className="animate-fade-in delay-100" style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                fontFamily: "'Outfit', sans-serif",
                color: 'white'
              }}>
                Master Your <br />
                <span style={{ color: 'var(--slate-400)' }}>Classroom Slides.</span>
              </h1>

              <p className="animate-fade-in delay-200" style={{
                fontSize: '1.125rem',
                color: 'var(--slate-300)',
                maxWidth: '540px',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                opacity: 0.9
              }}>
                Seamlessly upload, manage, and present your university work with our secure 6-digit code system. No flash drives, no login hassles—just present.
              </p>

              <div className="home-links animate-fade-in delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/register">
                  <button className="btn" style={{
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    background: 'white',
                    color: 'black',
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: '0 4px 14px 0 rgba(255,255,255,0.2)'
                  }}>
                    Get Started Free
                  </button>
                </Link>
                <Link href="/classroom">
                  <button className="btn" style={{
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    background: 'transparent',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <FiMonitor size={20} />
                    Classroom Mode
                  </button>
                </Link>
              </div>

              <div className="trust-badges animate-fade-in delay-400" style={{ marginTop: '3rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '-10px' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      border: '3px solid var(--primary-900)',
                      background: `hsl(${220 + (i * 10)}, 70%, 80%)`,
                      marginLeft: i > 1 ? '-10px' : '0'
                    }}></div>
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>{stats.average ? stats.average.toFixed(1) : '5.0'}</span>
                    <div style={{ display: 'flex', gap: '0px' }}>
                      <FiStar size={14} fill="#F59E0B" color="#F59E0B" />
                      <FiStar size={14} fill="#F59E0B" color="#F59E0B" />
                      <FiStar size={14} fill="#F59E0B" color="#F59E0B" />
                      <FiStar size={14} fill="#F59E0B" color="#F59E0B" />
                      <FiStar size={14} fill="#F59E0B" color="#F59E0B" />
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--primary-200)' }}>
                    Based on {stats.count || 100}+ reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visuals - Hidden on small mobile */}
            <div className="hero-visuals" style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '500px', height: '400px' }}>
                {/* Main Card */}
                <div className="animate-fade-in delay-300" style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  right: '10%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '24px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  transform: 'rotate(-3deg)',
                  zIndex: 10
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>Active</div>
                  </div>
                  <div style={{ height: '8px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '0.75rem' }}></div>
                  <div style={{ height: '8px', width: '90%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '2rem' }}></div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, padding: '1rem', background: 'rgba(79, 70, 229, 0.2)', borderRadius: '12px', border: '1px solid rgba(79, 70, 229, 0.3)' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>856</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Code</div>
                    </div>
                    <div style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>CS 101</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Final Project.pptx</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="animate-scale-in delay-500" style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: '#4f46e5',
                  padding: '1rem',
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                  zIndex: 20,
                  transform: 'rotate(6deg)'
                }}>
                  <FiUpload size={24} color="white" />
                </div>

                <div className="animate-scale-in delay-700" style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '0',
                  background: 'white',
                  color: 'var(--primary-900)',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                  zIndex: 20,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transform: 'rotate(-4deg)'
                }}>
                  <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></span>
                  Ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        -----------------------------------------------------------------
        FEATURES SECTION
        -----------------------------------------------------------------
      */}
      <div className="features-section" style={{ padding: '6rem 0', background: 'var(--slate-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--slate-900)' }}>
              Why Students Love It
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--slate-500)', lineHeight: 1.6 }}>
              We've streamlined the entire presentation workflow so you can focus on delivering your best work, not fumbling with USB drives.
            </p>
          </div>

          <div className="feature-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* 1. Account */}
            <div className="feature-card animate-scale-in delay-100" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '24px',
              border: '1px solid var(--slate-200)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--primary-50)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-600)', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>1</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>Create Account</h3>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Sign up in seconds to get your own personal dashboard for managing all your presentation files in one place.
              </p>
            </div>

            {/* 2. Upload */}
            <div className="feature-card animate-scale-in delay-200" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '24px',
              border: '1px solid var(--slate-200)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--primary-50)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-600)', marginBottom: '1.5rem' }}>
                <FiUpload size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>Upload Files</h3>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Support for PowerPoint, PDF, and Media. Tag your presentations with course names for easy organization.
              </p>
            </div>

            {/* 3. Get Code */}
            <div className="feature-card animate-scale-in delay-300" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '24px',
              border: '1px solid var(--slate-200)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--primary-50)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-600)', marginBottom: '1.5rem' }}>
                <FiKey size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>Get Unique Code</h3>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Every upload generates a unique 6-digit access code (e.g. 856-992) that you can use instantly.
              </p>
            </div>

            {/* 4. Present */}
            <div className="feature-card animate-scale-in delay-400" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '24px',
              border: '1px solid var(--slate-200)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--primary-50)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-600)', marginBottom: '1.5rem' }}>
                <FiMonitor size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>Present Instantly</h3>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Enter the code on the classroom computer to instantly load your presentation without signing in.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Styles for hover effects */}
      <style jsx>{`
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
          border-color: var(--primary-200) !important;
        }
        @media (max-width: 900px) {
           .hero-visuals {
             display: none !important;
           }
           .home-hero-section {
             text-align: center;
             padding: 4rem 1rem !important;
           }
           .home-links, .trust-badges {
             justify-content: center;
           }
           h1 {
             font-size: 2.5rem !important;
           }
        }
      `}</style>
    </div>
  );
}
