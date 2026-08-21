import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { availableTemplates } from '../../data/initialResume';
import { X, Check, Palette } from 'lucide-react';

const PALETTES = [
  { name: 'Deep Teal (Stitch)', color: '#00685f' },
  { name: 'Tech Blue', color: '#0051d5' },
  { name: 'Emerald', color: '#0d9488' },
  { name: 'Slate Charcoal', color: '#1e293b' },
  { name: 'Crimson', color: '#b91c1c' },
];

export default function TemplateModal() {
  const {
    isTemplateModalOpen,
    setIsTemplateModalOpen,
    resumeData,
    setTemplateId,
    setThemeColor
  } = useResume();

  if (!isTemplateModalOpen) return null;

  const currentTemplate = resumeData.templateId;
  const currentColor = resumeData.themeColor || '#00685f';

  return (
    <div className="modal-backdrop">
      <div className="modal-content template-modal animate-fade-in">
        <div className="modal-header">
          <div>
            <h2>Choose Resume Template</h2>
            <p className="modal-subtitle">
              Switch templates instantly. All your data is automatically preserved and reformatted.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsTemplateModalOpen(false)}
            className="btn btn-ghost btn-sm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Accent Color Picker */}
        <div className="color-picker-strip">
          <span className="color-strip-label">
            <Palette size={14} /> Theme Accent Color:
          </span>
          <div className="color-options">
            {PALETTES.map(({ name, color }) => (
              <button
                key={color}
                type="button"
                className={`color-swatch-btn ${currentColor === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                title={name}
                onClick={() => setThemeColor(color)}
              >
                {currentColor === color && <Check size={12} color="#ffffff" />}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="template-grid">
          {availableTemplates.map((tpl) => {
            const isSelected = currentTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                className={`template-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setTemplateId(tpl.id)}
              >
                <div
                  className="template-card-preview"
                  style={{ background: tpl.thumbnailBg }}
                >
                  <div className="preview-lines">
                    <div className="line line-title" />
                    <div className="line line-sub" />
                    <div className="line line-body" />
                    <div className="line line-body" />
                  </div>
                  {isSelected && (
                    <div className="selected-badge">
                      <Check size={14} /> Selected
                    </div>
                  )}
                </div>

                <div className="template-card-info">
                  <div className="flex-between">
                    <h4>{tpl.name}</h4>
                    <span className="badge badge-teal">{tpl.badge}</span>
                  </div>
                  <p>{tpl.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={() => setIsTemplateModalOpen(false)}
            className="btn btn-primary"
          >
            Done & Apply
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background-color: #ffffff;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          width: 100%;
          max-width: 840px;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-border);
        }

        .modal-subtitle {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          margin-top: 4px;
        }

        .color-picker-strip {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          background-color: var(--color-surface-subtle);
          border-bottom: 1px solid var(--color-border);
        }

        .color-strip-label {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--color-text-secondary);
        }

        .color-options {
          display: flex;
          gap: 8px;
        }

        .color-swatch-btn {
          width: 26px;
          height: 26px;
          border-radius: var(--radius-full);
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 1px var(--color-border);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--transition-fast);
        }

        .color-swatch-btn:hover {
          transform: scale(1.15);
        }

        .color-swatch-btn.active {
          box-shadow: 0 0 0 2px var(--color-primary);
          transform: scale(1.15);
        }

        .template-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 18px;
          padding: 24px;
        }

        .template-card {
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-normal);
          background-color: #ffffff;
        }

        .template-card:hover {
          border-color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .template-card.selected {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-glow);
        }

        .template-card-preview {
          height: 140px;
          position: relative;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .preview-lines {
          display: flex;
          flex-direction: column;
          gap: 6px;
          opacity: 0.6;
        }

        .line {
          background: rgba(255, 255, 255, 0.7);
          border-radius: 2px;
          height: 6px;
        }
        .line-title { width: 50%; height: 10px; }
        .line-sub { width: 35%; }
        .line-body { width: 85%; }

        .selected-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ffffff;
          color: var(--color-primary);
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.75rem;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: var(--shadow-sm);
        }

        .template-card-info {
          padding: 14px;
        }

        .template-card-info h4 {
          font-size: 0.95rem;
          margin-bottom: 4px;
        }

        .template-card-info p {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
          margin-top: 6px;
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--color-border);
          display: flex;
          justify-content: flex-end;
        }
      `}} />
    </div>
  );
}
