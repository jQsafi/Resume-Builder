import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  LayoutTemplate, 
  FileText, 
  Zap, 
  Download, 
  Sliders, 
  Eye, 
  Cpu, 
  Compass,
  FileCode,
  ShieldCheck
} from 'lucide-react';

export default function TutorialModal() {
  const { isTutorialOpen, completeTutorial, setIsTutorialOpen } = useResume();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      badge: 'Step 1 • Templates & Design',
      title: 'Precision Templates & Visual Themes',
      description: 'Switch between Google Stitch "Technical Authority" and "Modern Executive" templates in 1 click. Choose custom accent colors and monospace fonts while preserving all your content.',
      icon: <LayoutTemplate size={28} color="#00685f" />,
      features: [
        'Curated ATS-optimized layouts tailored for technical & engineering roles',
        'Dynamic accent color palette switcher (Deep Teal, Tech Blue, Slate)',
        'Automatic typography scaling and structured monospace skills matrix'
      ],
      previewType: 'templates'
    },
    {
      badge: 'Step 2 • Automated Parsing',
      title: 'Upload & Auto-Extract Existing Resumes',
      description: 'Already have a resume? Upload your PDF or DOCX file. Our Python parsing engine automatically categorizes your technical skills, work history, and contact details in seconds.',
      icon: <Zap size={28} color="#0051d5" />,
      features: [
        'Multi-column PDF parsing via pypdf and pdfplumber fallbacks',
        'Automatic technical skills categorization (Languages, Frameworks, Cloud, Tools)',
        'Zero manual re-typing: instant form field auto-population'
      ],
      previewType: 'parser'
    },
    {
      badge: 'Step 3 • Dual-Pane Editor',
      title: 'Keystroke-Reactive Live Dual Pane',
      description: 'Edit on the left, preview on the right with real-time A4 rendering. Track your ATS score live and use zoom scaling (50% - 150%) for pixel-perfect adjustments.',
      icon: <Sliders size={28} color="#0d9488" />,
      features: [
        'Keystroke-reactive live re-rendering on standard A4 paper canvas',
        'Interactive accordion form sections with dynamic achievement bullets',
        'Continuous local auto-save so your work is never lost'
      ],
      previewType: 'editor'
    },
    {
      badge: 'Step 4 • Instant Export',
      title: 'Recruiter-Approved Multi-Format Exports',
      description: 'Ready to apply? Export your resume instantly in native Microsoft Word (.docx), high-fidelity vector PDF, or JSON backup format.',
      icon: <Download size={28} color="#00685f" />,
      features: [
        'Native .DOCX export streaming from Python backend with proper styling',
        'Vector-sharp PDF export formatted for browser printing and ATS scanners',
        '100% data portability with JSON backup & restore'
      ],
      previewType: 'export'
    }
  ];

  // Reset to step 0 when opened
  useEffect(() => {
    if (isTutorialOpen) {
      setCurrentStep(0);
    }
  }, [isTutorialOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isTutorialOpen) return;
      if (e.key === 'ArrowRight' && currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      } else if (e.key === 'Escape') {
        completeTutorial();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTutorialOpen, currentStep, steps.length]);

  if (!isTutorialOpen) return null;

  const current = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      completeTutorial();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="modal-backdrop" onClick={completeTutorial}>
      <div 
        className="modal-content tutorial-modal animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header tutorial-header">
          <div className="flex-center gap-2">
            <div className="tutorial-badge-icon">
              <Compass size={18} color="#00685f" />
            </div>
            <div>
              <div className="tutorial-step-tag">{current.badge}</div>
              <h3 className="tutorial-title">{current.title}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={completeTutorial}
            className="btn btn-ghost btn-sm"
            title="Skip & Close Tutorial"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="tutorial-body">
          {/* Main Description */}
          <p className="tutorial-description">{current.description}</p>

          {/* Interactive Feature Preview Card */}
          <div className="tutorial-visual-card">
            {current.previewType === 'templates' && (
              <div className="preview-templates-grid">
                <div className="template-mockup active">
                  <div className="mockup-header-bar" />
                  <div className="mockup-body-lines">
                    <div className="mockup-line w-75" />
                    <div className="mockup-line w-50" />
                    <div className="mockup-tags">
                      <span className="mockup-tag">TypeScript</span>
                      <span className="mockup-tag">Python</span>
                      <span className="mockup-tag">Docker</span>
                    </div>
                  </div>
                  <div className="mockup-label">Technical Authority</div>
                </div>
                <div className="template-mockup">
                  <div className="mockup-header-banner" />
                  <div className="mockup-body-lines">
                    <div className="mockup-line w-60" />
                    <div className="mockup-line w-80" />
                    <div className="mockup-line w-40" />
                  </div>
                  <div className="mockup-label">Modern Executive</div>
                </div>
              </div>
            )}

            {current.previewType === 'parser' && (
              <div className="preview-parser-flow">
                <div className="parser-node">
                  <FileText size={24} color="#0051d5" />
                  <span>resume.pdf / .docx</span>
                </div>
                <div className="parser-arrow">
                  <Zap size={18} color="#0d9488" className="pulse-glow-icon" />
                  <span>AI Extractor</span>
                </div>
                <div className="parser-node active">
                  <FileCode size={24} color="#00685f" />
                  <span>Structured Form</span>
                </div>
              </div>
            )}

            {current.previewType === 'editor' && (
              <div className="preview-editor-split">
                <div className="split-pane left">
                  <div className="pane-title">📝 Accordion Form</div>
                  <div className="pane-item">✔ Personal Info</div>
                  <div className="pane-item">✔ Categorized Skills</div>
                  <div className="pane-item">✔ Work Experience</div>
                </div>
                <div className="split-pane right">
                  <div className="pane-title">👁️ Live A4 Preview</div>
                  <div className="mini-resume-doc">
                    <div className="doc-bar primary" />
                    <div className="doc-bar secondary" />
                    <div className="doc-tags" />
                  </div>
                </div>
              </div>
            )}

            {current.previewType === 'export' && (
              <div className="preview-export-badges">
                <div className="export-chip word">
                  <span className="ext">DOCX</span>
                  <span>Microsoft Word</span>
                </div>
                <div className="export-chip pdf">
                  <span className="ext">PDF</span>
                  <span>Vector ATS PDF</span>
                </div>
                <div className="export-chip print">
                  <span className="ext">PRINT</span>
                  <span>High-Res Paper</span>
                </div>
              </div>
            )}
          </div>

          {/* Key Benefits List */}
          <div className="tutorial-features-list">
            {current.features.map((feat, idx) => (
              <div key={idx} className="tutorial-feature-item">
                <CheckCircle2 size={16} className="feature-check-icon" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="modal-footer tutorial-footer">
          <div className="tutorial-progress-dots">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`dot-btn ${idx === currentStep ? 'active' : ''}`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
            <span className="step-count-text">
              {currentStep + 1} of {steps.length}
            </span>
          </div>

          <div className="flex-center gap-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="btn btn-outline btn-sm"
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary btn-sm"
            >
              {isLastStep ? (
                <>
                  <Sparkles size={14} /> Launch Workspace
                </>
              ) : (
                <>
                  Next <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tutorial-modal {
          max-width: 620px;
        }

        .tutorial-header {
          padding: 16px 20px;
        }

        .tutorial-badge-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: var(--color-primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tutorial-step-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-primary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tutorial-title {
          font-size: 1.1rem;
          margin-top: 2px;
          color: var(--color-text-primary);
        }

        .tutorial-body {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tutorial-description {
          font-size: 0.92rem;
          color: var(--color-text-secondary);
          line-height: 1.55;
        }

        .tutorial-visual-card {
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 18px;
          min-height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-templates-grid {
          display: flex;
          gap: 16px;
          width: 100%;
          justify-content: center;
        }

        .template-mockup {
          background: #ffffff;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-sm);
          width: 130px;
          height: 110px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: var(--shadow-sm);
        }

        .template-mockup.active {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 2px var(--color-primary-glow);
        }

        .mockup-header-bar {
          height: 6px;
          background: var(--color-primary);
          border-radius: 2px;
          width: 60%;
        }

        .mockup-header-banner {
          height: 12px;
          background: var(--color-secondary);
          border-radius: 2px;
          width: 100%;
        }

        .mockup-line {
          height: 4px;
          background: var(--color-border);
          border-radius: 2px;
          margin-bottom: 4px;
        }

        .mockup-line.w-75 { width: 75%; }
        .mockup-line.w-50 { width: 50%; }
        .mockup-line.w-60 { width: 60%; }
        .mockup-line.w-80 { width: 80%; }
        .mockup-line.w-40 { width: 40%; }

        .mockup-tags {
          display: flex;
          gap: 4px;
          margin-top: 4px;
        }

        .mockup-tag {
          font-size: 0.55rem;
          font-family: var(--font-mono);
          background: var(--color-surface-muted);
          padding: 1px 4px;
          border-radius: 2px;
          color: var(--color-text-secondary);
        }

        .mockup-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--color-text-primary);
          text-align: center;
          margin-top: auto;
        }

        .preview-parser-flow {
          display: flex;
          align-items: center;
          gap: 14px;
          justify-content: center;
          width: 100%;
        }

        .parser-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .parser-node.active {
          border-color: var(--color-primary);
          background: var(--color-primary-light);
        }

        .parser-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          color: var(--color-text-tertiary);
          font-family: var(--font-mono);
        }

        .preview-editor-split {
          display: flex;
          gap: 12px;
          width: 100%;
        }

        .split-pane {
          flex: 1;
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 10px;
        }

        .split-pane.left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pane-title {
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--color-text-primary);
        }

        .pane-item {
          font-size: 0.7rem;
          color: var(--color-text-secondary);
        }

        .mini-resume-doc {
          background: var(--color-bg);
          border: 1px dashed var(--color-border);
          border-radius: 4px;
          height: 60px;
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .doc-bar {
          height: 4px;
          border-radius: 2px;
        }
        .doc-bar.primary { background: var(--color-primary); width: 60%; }
        .doc-bar.secondary { background: var(--color-text-tertiary); width: 85%; }

        .preview-export-badges {
          display: flex;
          gap: 12px;
          justify-content: center;
          width: 100%;
        }

        .export-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 16px;
          border-radius: var(--radius-md);
          background: #ffffff;
          border: 1px solid var(--color-border);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .export-chip .ext {
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 0.85rem;
        }

        .export-chip.word .ext { color: var(--color-secondary); }
        .export-chip.pdf .ext { color: var(--color-primary); }
        .export-chip.print .ext { color: #d97706; }

        .tutorial-features-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tutorial-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--color-text-primary);
        }

        .feature-check-icon {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .tutorial-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
        }

        .tutorial-progress-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dot-btn {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          border: none;
          background-color: var(--color-border);
          cursor: pointer;
          transition: all var(--transition-fast);
          padding: 0;
        }

        .dot-btn.active {
          width: 22px;
          background-color: var(--color-primary);
        }

        .step-count-text {
          font-size: 0.75rem;
          color: var(--color-text-tertiary);
          font-family: var(--font-mono);
          margin-left: 6px;
        }
      `}} />
    </div>
  );
}
