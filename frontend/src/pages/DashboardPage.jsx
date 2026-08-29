import React, { useState, useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { initialResumeData } from '../data/initialResume';
import { parseResumeFile } from '../services/api';
import { 
  Plus, 
  FileText, 
  Trash2, 
  Edit3, 
  Calendar, 
  Download, 
  UploadCloud, 
  Sparkles, 
  PlusCircle, 
  LayoutTemplate, 
  ArrowRight, 
  Loader2, 
  Layers, 
  Compass, 
  Zap,
  CheckCircle2,
  FileCode,
  Cloud,
  RefreshCw
} from 'lucide-react';

export default function DashboardPage({ setActivePage }) {
  const {
    savedResumes,
    loadResume,
    deleteSavedResume,
    saveCurrentResumeToDashboard,
    setIsExportModalOpen,
    startTutorial,
    cloudSyncStatus,
    syncNow
  } = useResume();

  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const handleEdit = (resume) => {
    loadResume(resume);
    setActivePage('editor');
  };

  const handleCreateNew = () => {
    const blankResume = {
      id: 'resume-' + Date.now(),
      title: 'Untitled Resume',
      lastModified: new Date().toISOString(),
      templateId: 'technical-authority',
      themeColor: '#00685f',
      personalInfo: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: ''
      },
      summary: '',
      skills: {
        languages: [],
        frameworks: [],
        cloudDevops: [],
        leadership: []
      },
      experience: [],
      education: [],
      projects: []
    };
    loadResume(blankResume);
    saveCurrentResumeToDashboard('Untitled Resume');
    setActivePage('editor');
  };

  const handleLoadSample = () => {
    const sample = {
      ...initialResumeData,
      id: 'resume-' + Date.now(),
      title: 'Principal Engineer (Sample)',
      lastModified: new Date().toISOString()
    };
    loadResume(sample);
    saveCurrentResumeToDashboard('Principal Engineer (Sample)');
    setActivePage('editor');
  };

  const handleExport = (resume) => {
    loadResume(resume);
    setIsExportModalOpen(true);
  };

  const handleFileProcess = async (file) => {
    if (!file) return;
    try {
      setIsUploading(true);
      setUploadError('');
      const parsed = await parseResumeFile(file);
      
      const newResume = {
        ...parsed,
        id: 'resume-' + Date.now(),
        title: parsed.personalInfo?.fullName ? `${parsed.personalInfo.fullName}'s Resume` : file.name.replace(/\.[^/.]+$/, ''),
        lastModified: new Date().toISOString(),
        templateId: 'technical-authority',
        themeColor: '#00685f'
      };

      loadResume(newResume);
      saveCurrentResumeToDashboard(newResume.title);
      setActivePage('editor');
    } catch (err) {
      setUploadError(err.message || 'Failed to parse resume file. Please try another file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const hasResumes = savedResumes && savedResumes.length > 0;

  return (
    <div className="dashboard-page animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>My Resumes & Documents</h1>
          <p className="dashboard-desc">
            Manage your tailored resume versions for different tech roles, companies, and seniority levels.
          </p>
        </div>
        {hasResumes && (
          <div className="flex-center gap-2">
            <button
              type="button"
              onClick={syncNow}
              className={`btn btn-sm ${cloudSyncStatus === 'synced' ? 'btn-ghost text-success' : 'btn-outline'}`}
              title="Sync with cloud database"
            >
              {cloudSyncStatus === 'syncing' ? (
                <>
                  <RefreshCw size={14} className="spin-fast" /> Syncing...
                </>
              ) : (
                <>
                  <Cloud size={14} /> {cloudSyncStatus === 'synced' ? 'Cloud Synced' : 'Sync Cloud'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCreateNew}
              className="btn btn-primary btn-sm"
            >
              <Plus size={15} /> Create New Resume
            </button>
          </div>
        )}
      </div>

      {/* Hidden file input for resume parser */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        style={{ display: 'none' }}
      />

      {/* When Resumes Exist: Display Grid */}
      {hasResumes ? (
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
                  <span className="btn btn-primary btn-sm">
                    <Edit3 size={13} /> Edit in Workspace
                  </span>
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
      ) : (
        /* Rich Interactive Empty State Placeholder */
        <div className="empty-state-container animate-fade-in">
          {/* Main Hero Card */}
          <div 
            className={`empty-state-hero ${dragActive ? 'drag-over' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {/* Visual 3D floating blueprint graphic */}
            <div className="empty-graphic-wrapper">
              <div className="empty-graphic-pulse" />
              <div className="empty-graphic-canvas">
                <div className="empty-graphic-header" />
                <div className="empty-graphic-sub" />
                <div className="empty-graphic-row">
                  <div className="empty-graphic-chip" />
                  <div className="empty-graphic-chip" />
                  <div className="empty-graphic-chip" />
                </div>
                <div className="empty-graphic-lines">
                  <div className="line l1" />
                  <div className="line l2" />
                </div>
              </div>
              <div className="empty-graphic-floating-icon">
                <Sparkles size={20} color="#00685f" />
              </div>
            </div>

            <div className="empty-state-content">
              <h2>No Resumes in Your Workspace Yet</h2>
              <p>
                Get started by creating your first ATS-optimized tech resume. Pick one of our fast-track onboarding methods below or drag & drop an existing file.
              </p>
            </div>

            {uploadError && (
              <div className="upload-error-pill animate-fade-in">
                <span>⚠️ {uploadError}</span>
              </div>
            )}

            {/* 3 Interactive Action Option Cards */}
            <div className="interactive-options-grid">
              {/* Option 1: Upload & Auto-Parse */}
              <div 
                className="interactive-action-card primary-accent"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="action-card-icon upload-icon">
                  {isUploading ? (
                    <Loader2 size={24} className="animate-spin text-primary" />
                  ) : (
                    <UploadCloud size={24} color="#00685f" />
                  )}
                </div>
                <div className="action-card-text">
                  <div className="action-tag">AI Auto-Extract</div>
                  <h3>{isUploading ? 'Parsing Document...' : 'Upload Existing Resume'}</h3>
                  <p>Drop or select your PDF or DOCX file to extract skills, history & contact details automatically.</p>
                </div>
                <button type="button" className="btn btn-primary btn-sm w-full mt-auto" disabled={isUploading}>
                  {isUploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
                  {isUploading ? 'Extracting with AI...' : 'Upload .PDF / .DOCX'}
                </button>
              </div>

              {/* Option 2: Pre-filled Tech Sample */}
              <div 
                className="interactive-action-card secondary-accent"
                onClick={handleLoadSample}
              >
                <div className="action-card-icon sample-icon">
                  <Sparkles size={24} color="#0051d5" />
                </div>
                <div className="action-card-text">
                  <div className="action-tag blue">1-Click Fast Start</div>
                  <h3>Load Pre-Filled Sample</h3>
                  <p>Explore a complete Principal Engineer sample with categorized skills, timeline bullets, and cloud projects.</p>
                </div>
                <button type="button" className="btn btn-secondary btn-sm w-full mt-auto">
                  <FileCode size={14} /> Use Tech Lead Sample
                </button>
              </div>

              {/* Option 3: Blank Canvas */}
              <div 
                className="interactive-action-card neutral-accent"
                onClick={handleCreateNew}
              >
                <div className="action-card-icon blank-icon">
                  <PlusCircle size={24} color="#545c72" />
                </div>
                <div className="action-card-text">
                  <div className="action-tag neutral">Blank Canvas</div>
                  <h3>Build From Scratch</h3>
                  <p>Start with a clean slate and fill in your technical experience using our step-by-step accordion editor.</p>
                </div>
                <button type="button" className="btn btn-outline btn-sm w-full mt-auto">
                  <Plus size={14} /> Start Fresh
                </button>
              </div>
            </div>

            {/* Quick Tour Banner */}
            <div className="empty-state-footer-strip">
              <div className="flex-center gap-2">
                <Compass size={16} color="#00685f" />
                <span>New to ResumePro? Learn how to craft high-scoring ATS resumes.</span>
              </div>
              <button
                type="button"
                onClick={startTutorial}
                className="text-link-btn"
              >
                Launch 4-Step Guided Tour <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

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

        /* --- Rich Interactive Empty State --- */
        .empty-state-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .empty-state-hero {
          width: 100%;
          background: #ffffff;
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-xl);
          padding: 48px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .empty-state-hero.drag-over {
          border-color: var(--color-primary);
          background-color: var(--color-primary-light);
          transform: scale(1.01);
        }

        /* Floating Graphic */
        .empty-graphic-wrapper {
          position: relative;
          width: 100px;
          height: 120px;
          margin-bottom: 24px;
        }

        .empty-graphic-pulse {
          position: absolute;
          inset: -10px;
          background: radial-gradient(circle, rgba(0, 104, 95, 0.15) 0%, rgba(0, 104, 95, 0) 70%);
          border-radius: 50%;
          animation: pulseGlow 3s infinite;
        }

        .empty-graphic-canvas {
          position: relative;
          width: 100%;
          height: 100%;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .empty-graphic-header { height: 6px; width: 65%; background: var(--color-primary); border-radius: 2px; }
        .empty-graphic-sub { height: 4px; width: 45%; background: #94a3b8; border-radius: 2px; }

        .empty-graphic-row {
          display: flex;
          gap: 4px;
          margin: 4px 0;
        }

        .empty-graphic-chip {
          height: 8px;
          width: 20px;
          background: var(--color-primary-light);
          border: 1px solid rgba(0, 104, 95, 0.2);
          border-radius: 2px;
        }

        .empty-graphic-lines {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .empty-graphic-lines .line {
          height: 3px;
          background: #e2e8f0;
          border-radius: 2px;
        }
        .empty-graphic-lines .l1 { width: 85%; }
        .empty-graphic-lines .l2 { width: 70%; }

        .empty-graphic-floating-icon {
          position: absolute;
          bottom: -6px;
          right: -8px;
          background: #ffffff;
          border: 1.5px solid var(--color-primary);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }

        .empty-state-content {
          max-width: 580px;
          margin-bottom: 32px;
        }

        .empty-state-content h2 {
          font-size: 1.45rem;
          margin-bottom: 8px;
          color: var(--color-text-primary);
        }

        .empty-state-content p {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .upload-error-pill {
          background-color: var(--color-danger-light);
          color: var(--color-danger);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 20px;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }

        /* 3 Interactive Cards */
        .interactive-options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 960px;
          margin-bottom: 32px;
        }

        .interactive-action-card {
          background-color: var(--color-surface);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-normal);
          position: relative;
        }

        .interactive-action-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .interactive-action-card.primary-accent:hover {
          border-color: var(--color-primary);
          box-shadow: 0 12px 24px -6px var(--color-primary-glow);
        }

        .interactive-action-card.secondary-accent:hover {
          border-color: var(--color-secondary);
          box-shadow: 0 12px 24px -6px var(--color-secondary-glow);
        }

        .interactive-action-card.neutral-accent:hover {
          border-color: var(--color-text-secondary);
        }

        .action-card-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .upload-icon { background: var(--color-primary-light); }
        .sample-icon { background: var(--color-secondary-light); }
        .blank-icon { background: var(--color-surface-muted); }

        .action-card-text {
          margin-bottom: 20px;
          flex: 1;
        }

        .action-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--color-primary);
          text-transform: uppercase;
          margin-bottom: 6px;
          letter-spacing: 0.04em;
        }
        .action-tag.blue { color: var(--color-secondary); }
        .action-tag.neutral { color: var(--color-text-secondary); }

        .action-card-text h3 {
          font-size: 1.05rem;
          margin-bottom: 6px;
        }

        .action-card-text p {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        /* Strip */
        .empty-state-footer-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 960px;
          padding: 14px 20px;
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: var(--color-text-primary);
        }

        .text-link-btn {
          border: none;
          background: transparent;
          color: var(--color-primary);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap var(--transition-fast);
        }

        .text-link-btn:hover {
          text-decoration: underline;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .empty-state-footer-strip {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }
      `}} />
    </div>
  );
}
