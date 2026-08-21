import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { FileText, LogIn, ArrowRight, Sparkles } from 'lucide-react';

export default function LoggedOutHeader({ setActivePage }) {
  const { setIsAuthModalOpen } = useResume();

  return (
    <header className="public-navbar">
      <div className="public-navbar-container">
        {/* Left: Brand Logo */}
        <div className="public-brand" onClick={() => setActivePage('home')}>
          <div className="brand-logo-icon">
            <FileText size={18} color="#ffffff" />
          </div>
          <span className="brand-title">Resume<span className="brand-accent">Pro</span></span>
        </div>

        {/* Center: Public Links */}
        <nav className="public-nav-links">
          <button 
            type="button" 
            className="public-link"
            onClick={() => setActivePage('templates')}
          >
            <Sparkles size={14} /> Templates
          </button>
          <a 
            href="#features" 
            className="public-link"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
              const el = document.querySelector('.features-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="public-link"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
              const el = document.querySelector('.steps-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            How It Works
          </a>
        </nav>

        {/* Right: Auth Actions */}
        <div className="public-nav-actions">
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="btn btn-ghost btn-sm"
          >
            <LogIn size={14} /> Sign In
          </button>

          <button
            type="button"
            onClick={() => setActivePage('editor')}
            className="btn btn-primary btn-sm"
          >
            Create Resume Free <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .public-navbar {
          height: 68px;
          background-color: #ffffff;
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .public-navbar-container {
          max-width: 1240px;
          height: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .public-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .public-nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        @media (max-width: 768px) {
          .public-nav-links {
            display: none;
          }
        }

        .public-link {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          text-decoration: none;
          background: transparent;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: color var(--transition-fast);
        }

        .public-link:hover {
          color: var(--color-primary);
        }

        .public-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
      `}} />
    </header>
  );
}
