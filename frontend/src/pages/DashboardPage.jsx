import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, FileText, Trash2, Edit3, Calendar, Download } from 'lucide-react';

export default function DashboardPage({ setActivePage }) {
  const {
    savedResumes,
    loadResume,
    deleteSavedResume,
    saveCurrentResumeToDashboard,
    setIsExportModalOpen
  } = useResume();

  const handleEdit = (resume) => {
    loadResume(resume);
    setActivePage('editor');
  };

  const handleCreateNew = () => {
    saveCurrentResumeToDashboard('Untitled New Resume');
    setActivePage('editor');
  };

  const handleExport = (resume) => {
    loadResume(resume);
    setIsExportModalOpen(true);
  };

  return (
    <div className="dashboard-page animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>My Resumes & Documents</h1>
          <p className="dashboard-desc">
            Manage your tailored resume versions for different tech roles and companies.
          </p>
        </div>
        <button type="button" onClick={handleCreateNew} className="btn btn-primary">
          <Plus size={16} /> Create New Resume
        </button>
      </div>

      <div className="resumes-grid">
        {savedResumes.map((res) => (
          <div key={res.id} className="resume-grid-card">
            <div className="resume-grid-preview" onClick={() => handleEdit(res)}>
              <div className="mini-paper">
                <div className="mini-header-line" />
                <div className="mini-sub-line" />
                <div className="mini-block" />
                <div className="mini-block" />
              </div>
              <div className="preview-overlay">
                <span className="btn btn-primary btn-sm"><Edit3 size={13} /> Edit in Workspace</span>
              </div>
            </div>

            <div className="resume-grid-info">
              <div className="flex-between mb-1">
                <h4>{res.title || 'Untitled Resume'}</h4>
                <span className="badge badge-teal">{res.templateId || 'Technical'}</span>
              </div>

              <div className="resume-meta-date">
                <Calendar size={12} /> Last edited {new Date(res.lastModified || Date.now()).toLocaleDateString()}
              </div>

              <div className="resume-card-actions">
                <button
                  type="button"
                  onClick={() => handleEdit(res)}
                  className="btn btn-outline btn-sm"
                >
                  <Edit3 size={13} /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleExport(res)}
                  className="btn btn-ghost btn-sm"
                  title="Export"
                >
                  <Download size={13} /> Export
                </button>
                <button
                  type="button"
                  onClick={() => deleteSavedResume(res.id)}
                  className="btn btn-ghost btn-sm text-danger"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px;
          width: 100%;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
        }

        .dashboard-desc {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-top: 4px;
        }

        .resumes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .resume-grid-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .resume-grid-card:hover {
          box-shadow: var(--shadow-lg);
          border-color: var(--color-primary);
          transform: translateY(-3px);
        }

        .resume-grid-preview {
          height: 180px;
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
        }

        .mini-paper {
          width: 120px;
          height: 155px;
          background: #ffffff;
          box-shadow: var(--shadow-md);
          border-radius: 2px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mini-header-line { height: 6px; width: 60%; background: var(--color-primary); border-radius: 2px; }
        .mini-sub-line { height: 4px; width: 40%; background: #94a3b8; border-radius: 2px; }
        .mini-block { height: 28px; background: #f8fafc; border-radius: 2px; border-left: 2px solid var(--color-primary); }

        .preview-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast);
        }

        .resume-grid-preview:hover .preview-overlay {
          opacity: 1;
        }

        .resume-grid-info {
          padding: 16px;
        }

        .resume-grid-info h4 {
          font-size: 0.95rem;
        }

        .resume-meta-date {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          margin: 6px 0 14px 0;
        }

        .resume-card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--color-border-subtle);
          padding-top: 12px;
        }
      `}} />
    </div>
  );
}
