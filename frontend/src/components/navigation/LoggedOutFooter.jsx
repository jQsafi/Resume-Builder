import React from 'react';
import { FileText, ShieldCheck, Heart } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/Icons';

export default function LoggedOutFooter({ setActivePage }) {
  return (
    <footer className="public-footer">
      <div className="public-footer-container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-logo">
              <div className="brand-logo-icon">
                <FileText size={18} color="#ffffff" />
              </div>
              <span className="brand-title">Resume<span className="brand-accent">Pro</span></span>
            </div>
            <p className="footer-mission">
              Algorithmic resume builder tailored for software engineers, tech leads, and digital executives to bypass ATS filters.
            </p>
            <div className="footer-social-strip">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon-btn">
                <GithubIcon size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn">
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {/* Col 1: Product */}
          <div className="footer-nav-col">
            <h5>Product</h5>
            <ul>
              <li><a href="#editor" onClick={(e) => { e.preventDefault(); setActivePage('editor'); }}>Resume Builder</a></li>
              <li><a href="#templates" onClick={(e) => { e.preventDefault(); setActivePage('templates'); }}>ATS Templates</a></li>
              <li><a href="#import" onClick={(e) => { e.preventDefault(); setActivePage('editor'); }}>PDF/DOCX Extraction</a></li>
              <li><a href="#export" onClick={(e) => { e.preventDefault(); setActivePage('editor'); }}>PDF & Word Export</a></li>
            </ul>
          </div>

          {/* Col 2: Resources */}
          <div className="footer-nav-col">
            <h5>Resources</h5>
            <ul>
              <li><a href="#ats-guide" onClick={(e) => e.preventDefault()}>ATS Checklist 2026</a></li>
              <li><a href="#examples" onClick={(e) => { e.preventDefault(); setActivePage('templates'); }}>Staff Engineer Resumes</a></li>
              <li><a href="#faq" onClick={(e) => e.preventDefault()}>Hiring Insights</a></li>
              <li><a href="#api" onClick={(e) => e.preventDefault()}>FastAPI Backend Docs</a></li>
            </ul>
          </div>

          {/* Col 3: Legal & Security */}
          <div className="footer-nav-col">
            <h5>Security & Legal</h5>
            <ul>
              <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
              <li><a href="#security" onClick={(e) => e.preventDefault()}>Data Encryption</a></li>
              <li><a href="#cookies" onClick={(e) => e.preventDefault()}>Cookie Preferences</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © 2026 ResumePro Technologies. All rights reserved.
          </div>
          <div className="footer-status-pill">
            <span className="status-indicator-green" /> All Systems Operational
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .public-footer {
          background-color: #0b1329;
          color: #94a3b8;
          border-top: 1px solid #1e293b;
          padding: 60px 24px 30px 24px;
        }

        .public-footer-container {
          max-width: 1240px;
          margin: 0 auto;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        @media (max-width: 840px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 540px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
          }
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-brand-logo .brand-title {
          color: #ffffff;
        }

        .footer-mission {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #94a3b8;
          max-width: 320px;
        }

        .footer-social-strip {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .social-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: #1e293b;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .social-icon-btn:hover {
          background: var(--color-primary);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .footer-nav-col h5 {
          font-family: var(--font-heading);
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 16px;
        }

        .footer-nav-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-nav-col a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.85rem;
          transition: color var(--transition-fast);
        }

        .footer-nav-col a:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        .footer-bottom-bar {
          border-top: 1px solid #1e293b;
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #1e293b;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #cbd5e1;
        }

        .status-indicator-green {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }
      `}} />
    </footer>
  );
}
