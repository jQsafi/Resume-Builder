import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import SummaryForm from '../components/forms/SummaryForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import SkillsForm from '../components/forms/SkillsForm';
import EducationForm from '../components/forms/EducationForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import ResumePreview from '../components/preview/ResumePreview';
import { parseResumeFile } from '../services/api';
import { User, FileText, Briefcase, Wrench, GraduationCap, FolderGit2, ArrowLeft, ArrowRight, Upload, RotateCcw, Save, Loader2, CheckCircle2 } from 'lucide-react';

const SECTIONS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'projects', label: 'Projects', icon: FolderGit2 }
];

export default function EditorPage() {
  const {
    activeTab,
    setActiveTab,
    resetToSample,
    saveCurrentResumeToDashboard,
    resumeData,
    setResumeData
  } = useResume();

  const [isParsing, setIsParsing] = useState(false);
  const [parseSuccessMsg, setParseSuccessMsg] = useState('');

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeTab);

  const handleNext = () => {
    if (currentIndex < SECTIONS.length - 1) {
      setActiveTab(SECTIONS[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveTab(SECTIONS[currentIndex - 1].id);
    }
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'skills':
        return <SkillsForm />;
      case 'education':
        return <EducationForm />;
      case 'projects':
        return <ProjectsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  // Real Backend Resume File Parser Call
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsParsing(true);
      setParseSuccessMsg('');
      const parsed = await parseResumeFile(file);
      
      // Preserve current template preference
      setResumeData({
        ...parsed,
        templateId: resumeData.templateId || 'technical-authority',
        themeColor: resumeData.themeColor || '#00685f'
      });

      setParseSuccessMsg(`Extracted info from "${file.name}"!`);
      setTimeout(() => setParseSuccessMsg(''), 4000);
    } catch (err) {
      alert(`Parsing failed: ${err.message}`);
    } finally {
      setIsParsing(false);
    }
  };

  const handleSaveDraft = () => {
    saveCurrentResumeToDashboard(resumeData.personalInfo?.fullName ? `${resumeData.personalInfo.fullName}'s Resume` : 'My Resume');
    alert('Resume draft saved to Dashboard successfully!');
  };

  return (
    <div className="editor-layout">
      {/* Left Workspace (Form Controls) */}
      <aside className="editor-sidebar">
        {/* Quick Toolbar */}
        <div className="sidebar-top-bar">
          <label className="upload-btn-label btn btn-outline btn-sm">
            {isParsing ? (
              <>
                <Loader2 size={13} className="animate-spin text-primary" /> Parsing with AI...
              </>
            ) : (
              <>
                <Upload size={13} /> Upload PDF/Word
              </>
            )}
            <input 
              type="file" 
              accept=".pdf,.docx" 
              onChange={handleFileUpload} 
              disabled={isParsing}
              style={{ display: 'none' }} 
            />
          </label>

          <div className="flex-gap-2">
            <button type="button" onClick={resetToSample} className="btn btn-ghost btn-sm" title="Reset to Sample">
              <RotateCcw size={13} /> Reset
            </button>
            <button type="button" onClick={handleSaveDraft} className="btn btn-outline btn-sm text-primary" title="Save Draft">
              <Save size={13} /> Save Draft
            </button>
          </div>
        </div>

        {parseSuccessMsg && (
          <div className="parse-success-banner animate-fade-in">
            <CheckCircle2 size={14} />
            <span>{parseSuccessMsg}</span>
          </div>
        )}

        {/* Section Tabs */}
        <div className="section-tabs-strip">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                className={`sec-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(sec.id)}
              >
                <Icon size={14} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Form Body */}
        <div className="editor-form-scroll">
          {renderActiveSection()}
        </div>

        {/* Step Navigation Footer */}
        <div className="editor-footer">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ArrowLeft size={14} /> Previous
          </button>

          <span className="step-counter">
            Step {currentIndex + 1} of {SECTIONS.length}
          </span>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleNext}
            disabled={currentIndex === SECTIONS.length - 1}
          >
            Next <ArrowRight size={14} />
          </button>
        </div>
      </aside>

      {/* Right Workspace (Live Document Preview) */}
      <main className="editor-preview-pane">
        <ResumePreview />
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .editor-layout {
          display: grid;
          grid-template-columns: 520px 1fr;
          height: calc(100vh - 60px);
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .editor-layout {
            grid-template-columns: 1fr;
            height: auto;
            overflow: visible;
          }
        }

        .editor-sidebar {
          background-color: var(--color-surface);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }

        .sidebar-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid var(--color-border-subtle);
          background-color: var(--color-surface-subtle);
        }

        .upload-btn-label {
          cursor: pointer;
        }

        .parse-success-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: var(--color-success-light);
          color: var(--color-success);
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(22, 163, 74, 0.2);
        }

        .flex-gap-2 {
          display: flex;
          gap: 6px;
        }

        .section-tabs-strip {
          display: flex;
          overflow-x: auto;
          padding: 8px 12px;
          gap: 6px;
          border-bottom: 1px solid var(--color-border);
          background-color: #ffffff;
        }

        .sec-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          background: transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .sec-tab-btn:hover {
          color: var(--color-text-primary);
          background-color: var(--color-surface-muted);
        }

        .sec-tab-btn.active {
          color: var(--color-primary);
          background-color: var(--color-primary-light);
          border-color: rgba(0, 104, 95, 0.2);
        }

        .editor-form-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 20px 18px;
        }

        .form-section-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-section-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-section-header h3 {
          font-size: 1.05rem;
        }

        .form-section-desc {
          font-size: 0.825rem;
          color: var(--color-text-secondary);
          margin-bottom: 6px;
        }

        .form-helper {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          font-style: italic;
          margin-top: 4px;
        }

        .flex-between {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .flex-center {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .text-primary {
          color: var(--color-primary);
        }

        .editor-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 18px;
          border-top: 1px solid var(--color-border);
          background-color: var(--color-surface);
        }

        .step-counter {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--color-text-secondary);
        }

        .editor-preview-pane {
          background-color: #f1f5f9;
          height: 100%;
          overflow-y: auto;
          display: flex;
          justify-content: center;
        }
      `}} />
    </div>
  );
}
