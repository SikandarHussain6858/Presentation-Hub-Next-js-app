import Link from 'next/link';
import { FiUpload, FiMonitor, FiKey, FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="home animate-fade-in">
      <div className="container">

        {/* HERO SECTION */}
        <div className="home-hero centered-hero">
          <h1 className="animate-fade-in delay-100">
            Your University Presentations, <br />
            <span className="text-primary-700">Simplified</span>
          </h1>

          <p className="animate-fade-in delay-200">
            Seamlessly upload, manage, and present your work in the classroom with our secure 6-digit code system. No more flash drives or login hassles.
          </p>

          <div className="home-links animate-fade-in delay-300">
            <div className="cta-row">
              <Link href="/register">
                <button className="btn btn-primary btn-lg">
                  <FiArrowRight />
                  Get Started
                </button>
              </Link>
              <Link href="/classroom">
                <button className="btn btn-secondary btn-lg">
                  <FiMonitor />
                  Classroom Mode
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div style={{ padding: '8rem 0' }}>
          <div className="feature-grid">
            {/* 1. Create Account */}
            <div className="feature-card animate-scale-in delay-700">
              <div className="feature-icon feature-icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>1. Create Account</h3>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Sign up in seconds to get your own personal dashboard for managing presentation files.
              </p>
            </div>

            {/* 2. Upload Files */}
            <div className="feature-card animate-scale-in delay-700" style={{ transitionDelay: '100ms' }}>
              <div className="feature-icon feature-icon-blue">
                <FiUpload />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>2. Upload Files</h3>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Support for all major formats. Tag your presentations with course names for easy organization.
              </p>
            </div>

            {/* 3. Get Code */}
            <div className="feature-card animate-scale-in delay-700" style={{ transitionDelay: '200ms' }}>
              <div className="feature-icon feature-icon-blue">
                <FiKey />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>3. Get Code</h3>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Receive a unique 6-digit access code instantly for every presentation you upload.
              </p>
            </div>

            {/* 4. Present */}
            <div className="feature-card animate-scale-in delay-700" style={{ transitionDelay: '300ms' }}>
              <div className="feature-icon feature-icon-blue">
                <FiMonitor />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>4. Present</h3>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Enter the code on the classroom computer to instantly load your presentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
