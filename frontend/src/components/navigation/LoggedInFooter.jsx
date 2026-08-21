import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Check, Cloud, Keyboard, HelpCircle } from 'lucide-react';

export default function LoggedInFooter({ setActivePage }) {
  const { resumeData } = useResume();

  return (
    <footer className="workspace-footer">
      <div className="workspace-footer-container">
        {/* Left: Autosave Status & Active Template */}
        <div className="footer-status-left">
          <div className="status-item text-success">
            <Cloud size={13} />
            <span>Saved locally & synced</span>
          </div>
          <span className="footer-dot">•</span>
          <div className="status-item">
            <span className="badge badge-teal">{resumeData.templateId || 'Technical Authority'}</span>
          </div>
          <span className="footer-dot">•</span>
          <div className="status-item text-muted">
            Last edited {new Date(resumeData.lastModified || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Right: Workspace Utilities & Shortcuts */}
        <div className="footer-status-right">
          <button 
            type="button" 
            className="footer-btn"
            onClick={() => setActivePage('templates')}
          >
            Switch Template
          </button>
          <span className="footer-dot">•</span>
          <span className="footer-version">v1.0.0 (FastAPI Ready)</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .workspace-footer {
          height: 34px;
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          padding: 0 18px;
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          z-index: 50;
        }

        .workspace-footer-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-status-left, .footer-status-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
        }

        .text-success {
          color: var(--color-success);
        }

        .text-muted {
          color: var(--color-text-tertiary);
        }

        .footer-dot {
          color: var(--color-border);
        }

        .footer-btn {
          border: none;
          background: transparent;
          color: var(--color-text-secondary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .footer-btn:hover {
          color: var(--color-primary);
          text-decoration: underline;
        }

        .footer-version {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-text-tertiary);
        }
      `}} />
    </footer>
  );
}
