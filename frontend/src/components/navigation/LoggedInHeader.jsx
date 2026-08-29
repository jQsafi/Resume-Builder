import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  FileText, 
  Layout, 
  FolderKanban, 
  Download, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  LogOut, 
  ChevronDown, 
  User, 
  Plus,
  Compass,
  Cloud,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

export default function LoggedInHeader({ activePage, setActivePage }) {
  const {
    zoomLevel,
    setZoomLevel,
    setIsExportModalOpen,
    setIsTemplateModalOpen,
    startTutorial,
    user,
    logout,
    saveCurrentResumeToDashboard,
    cloudSyncStatus,
    syncNow
  } = useResume();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 50), 150));
  };

  const handleNewResume = () => {
    saveCurrentResumeToDashboard('Untitled New Resume');
    setActivePage('editor');
  };

  return (
    <header className="app-navbar">
      <div className="app-navbar-left">
        <div className="app-brand" onClick={() => setActivePage('dashboard')}>
          <div className="brand-logo-icon">
            <FileText size={18} color="#ffffff" />
          </div>
          <div className="brand-text">
            <span className="brand-title">Resume<span className="brand-accent">Pro</span></span>
            <span className="brand-badge">PRO</span>
          </div>
        </div>

        <nav className="app-nav-links">
          <button
            type="button"
            className={`app-link ${activePage === 'editor' ? 'active' : ''}`}
            onClick={() => setActivePage('editor')}
          >
            <Layout size={15} /> Workspace
          </button>
          <button
            type="button"
            className={`app-link ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActivePage('dashboard')}
          >
            <FolderKanban size={15} /> My Resumes
          </button>
          <button
            type="button"
            className={`app-link ${activePage === 'templates' ? 'active' : ''}`}
            onClick={() => setActivePage('templates')}
          >
            <Sparkles size={15} /> Templates
          </button>
        </nav>
      </div>

      <div className="app-navbar-right">
        {activePage === 'editor' ? (
          <>
            {/* Zoom Controls */}
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
              onClick={syncNow}
              className={`btn btn-sm ${cloudSyncStatus === 'synced' ? 'btn-ghost text-success' : cloudSyncStatus === 'syncing' ? 'btn-ghost text-primary' : 'btn-outline'}`}
              title={cloudSyncStatus === 'synced' ? 'Synced to Cloud Database' : 'Save to Cloud Database'}
            >
              {cloudSyncStatus === 'syncing' ? (
                <>
                  <RefreshCw size={13} className="spin-fast" /> Syncing...
                </>
              ) : cloudSyncStatus === 'synced' ? (
                <>
                  <CheckCircle2 size={13} /> Cloud Synced
                </>
              ) : (
                <>
                  <Cloud size={13} /> Cloud Save
                </>
              )}
            </button>

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
          <button
            type="button"
            onClick={handleNewResume}
            className="btn btn-primary btn-sm"
          >
            <Plus size={14} /> New Resume
          </button>
        )}

        {/* User Profile Menu */}
        <div className="user-profile-menu">
          <button
            type="button"
            className="user-profile-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="user-avatar-circle">
              {user?.avatar || 'SM'}
            </div>
            <span className="user-name-label">{user?.name?.split(' ')[0] || 'User'}</span>
            <ChevronDown size={14} />
          </button>

          {isDropdownOpen && (
            <div className="user-dropdown-menu animate-fade-in">
              <div className="dropdown-user-info">
                <strong>{user?.name || 'Shafayat Masum'}</strong>
                <span>{user?.email || 'shafayat.masum@example.com'}</span>
              </div>
              <div className="dropdown-divider" />
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setActivePage('dashboard');
                }}
              >
                <FolderKanban size={14} /> My Resumes Dashboard
              </button>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setIsDropdownOpen(false);
                  startTutorial();
                }}
              >
                <Compass size={14} /> Guided Tour & Features
              </button>
              <button
                type="button"
                className="dropdown-item text-danger"
                onClick={() => {
                  setIsDropdownOpen(false);
                  logout();
                  setActivePage('home');
                }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .app-navbar {
          height: 60px;
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .app-navbar-left {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .app-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
        }

        .app-nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .app-link {
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

        .app-link:hover {
          color: var(--color-text-primary);
          background-color: var(--color-surface-muted);
        }

        .app-link.active {
          color: var(--color-primary);
          background-color: var(--color-primary-light);
        }

        .app-navbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-profile-menu {
          position: relative;
        }

        .user-profile-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          padding: 4px 10px 4px 4px;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .user-profile-btn:hover {
          border-color: var(--color-primary);
        }

        .user-avatar-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--color-primary);
          color: #ffffff;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-name-label {
          font-family: var(--font-heading);
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .user-dropdown-menu {
          position: absolute;
          top: 42px;
          right: 0;
          width: 220px;
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xl);
          padding: 8px;
          z-index: 200;
        }

        .dropdown-user-info {
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
        }

        .dropdown-user-info strong {
          font-size: 0.875rem;
          color: #0f172a;
        }

        .dropdown-user-info span {
          font-size: 0.75rem;
          color: #64748b;
        }

        .dropdown-divider {
          height: 1px;
          background-color: var(--color-border);
          margin: 6px 0;
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border: none;
          background: transparent;
          font-family: var(--font-heading);
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          border-radius: var(--radius-sm);
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .dropdown-item:hover {
          background-color: var(--color-surface-subtle);
          color: var(--color-text-primary);
        }

        .dropdown-item.text-danger:hover {
          background-color: var(--color-danger-light);
          color: var(--color-danger);
        }

        .spin-fast {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}} />
    </header>
  );
}
