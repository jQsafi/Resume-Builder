import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { FileText, Layout, FolderKanban, Download, Sparkles, ZoomIn, ZoomOut, Home, UserCheck, Plus } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const {
    zoomLevel,
    setZoomLevel,
    setIsExportModalOpen,
    setIsTemplateModalOpen
  } = useResume();

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 50), 150));
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand" onClick={() => setActivePage('home')}>
          <div className="brand-logo-icon">
            <FileText size={18} color="#ffffff" />
          </div>
          <div className="brand-text">
            <span className="brand-title">Resume<span className="brand-accent">Pro</span></span>
            <span className="brand-badge">ATS 2.0</span>
          </div>
        </div>

        <nav className="navbar-links">
          <button
            type="button"
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => setActivePage('home')}
          >
            <Home size={15} /> Home
          </button>
          <button
            type="button"
            className={`nav-link ${activePage === 'editor' ? 'active' : ''}`}
            onClick={() => setActivePage('editor')}
          >
            <Layout size={15} /> Workspace
          </button>
          <button
            type="button"
            className={`nav-link ${activePage === 'templates' ? 'active' : ''}`}
            onClick={() => setActivePage('templates')}
          >
            <Sparkles size={15} /> Templates
          </button>
          <button
            type="button"
            className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActivePage('dashboard')}
          >
            <FolderKanban size={15} /> My Resumes
          </button>
        </nav>
      </div>

      <div className="navbar-right">
        {activePage === 'editor' ? (
          <>
            <div className="zoom-controls">
              <button
                type="button"
                className="zoom-btn"
                onClick={() => handleZoom(-10)}
                title="Zoom out"
              >
                <ZoomOut size={14} />
              </button>
              <span className="zoom-label">{zoomLevel}%</span>
              <button
                type="button"
                className="zoom-btn"
                onClick={() => handleZoom(10)}
                title="Zoom in"
              >
                <ZoomIn size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsTemplateModalOpen(true)}
              className="btn btn-outline btn-sm"
            >
              <Sparkles size={13} /> Change Template
            </button>

            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="btn btn-primary btn-sm"
            >
              <Download size={14} /> Export / Download
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setActivePage('editor')}
              className="btn btn-primary btn-sm"
            >
              <Plus size={14} /> Create New Resume
            </button>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .navbar {
          height: 60px;
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
        }

        .brand-logo-icon {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--color-primary) 0%, #003632 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px var(--color-primary-glow);
        }

        .brand-text {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .brand-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
        }

        .brand-accent {
          color: var(--color-primary);
        }

        .brand-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          background-color: var(--color-primary-light);
          color: var(--color-primary);
          padding: 1px 5px;
          border-radius: var(--radius-xs);
          border: 1px solid rgba(0, 104, 95, 0.2);
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-md);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--color-text-primary);
          background-color: var(--color-surface-muted);
        }

        .nav-link.active {
          color: var(--color-primary);
          background-color: var(--color-primary-light);
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .zoom-controls {
          display: flex;
          align-items: center;
          gap: 2px;
          background-color: var(--color-surface-muted);
          border-radius: var(--radius-md);
          padding: 2px 4px;
        }

        .zoom-btn {
          border: none;
          background: transparent;
          color: var(--color-text-secondary);
          width: 24px;
          height: 24px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .zoom-btn:hover {
          background-color: #ffffff;
          color: var(--color-text-primary);
        }

        .zoom-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          padding: 0 4px;
        }
      `}} />
    </header>
  );
}
