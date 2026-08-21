import React from 'react';
import { useResume } from '../context/ResumeContext';
import { availableTemplates } from '../data/initialResume';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export default function TemplatesPage({ setActivePage }) {
  const { resumeData, setTemplateId } = useResume();
  const currentTemplate = resumeData.templateId;

  const handleSelect = (id) => {
    setTemplateId(id);
    setActivePage('editor');
  };

  return (
    <div className="templates-page animate-fade-in">
      <div className="templates-header">
        <span className="badge badge-teal mb-2">
          <Sparkles size={13} /> ATS-Optimized Architecture
        </span>
        <h1>Curated Resume Templates</h1>
        <p className="templates-desc">
          Engineered to pass Applicant Tracking Systems (ATS) while delivering maximum visual clarity to engineering managers and executive recruiters.
        </p>
      </div>

      <div className="templates-catalog-grid">
        {availableTemplates.map((tpl) => {
          const isSelected = currentTemplate === tpl.id;
          return (
            <div key={tpl.id} className={`template-catalog-card ${isSelected ? 'active-card' : ''}`}>
              <div className="catalog-preview" style={{ background: tpl.thumbnailBg }}>
                <div className="catalog-paper">
                  <div className="catalog-line-header" />
                  <div className="catalog-line-sub" />
                  <div className="catalog-section-block" />
                  <div className="catalog-section-block" />
                </div>
              </div>

              <div className="catalog-details">
                <div className="flex-between mb-1">
                  <h3>{tpl.name}</h3>
                  <span className="badge badge-blue">{tpl.badge}</span>
                </div>
                <p className="catalog-summary">{tpl.description}</p>

                <div className="catalog-features">
                  <span>✓ ATS Verified Structure</span>
                  <span>✓ High Typography Contrast</span>
                  <span>✓ Pixel-Perfect PDF Export</span>
                </div>

                <div className="catalog-footer">
                  <button
                    type="button"
                    onClick={() => handleSelect(tpl.id)}
                    className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'} w-full`}
                  >
                    {isSelected ? (
                      <>
                        <Check size={14} /> Currently Active (Open in Editor)
                      </>
                    ) : (
                      <>
                        Use This Template <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .templates-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
          width: 100%;
        }

        .templates-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 40px auto;
        }

        .templates-desc {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          margin-top: 8px;
          line-height: 1.5;
        }

        .templates-catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 28px;
        }

        .template-catalog-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
          display: flex;
          flex-direction: column;
        }

        .template-catalog-card:hover {
          box-shadow: var(--shadow-xl);
          transform: translateY(-4px);
          border-color: var(--color-primary);
        }

        .active-card {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 2px var(--color-primary-glow);
        }

        .catalog-preview {
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .catalog-paper {
          width: 150px;
          height: 190px;
          background: #ffffff;
          box-shadow: var(--shadow-lg);
          border-radius: 3px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .catalog-line-header { height: 8px; width: 65%; background: var(--color-primary); border-radius: 2px; }
        .catalog-line-sub { height: 5px; width: 45%; background: #94a3b8; border-radius: 2px; }
        .catalog-section-block { height: 35px; background: #f8fafc; border-radius: 2px; border-left: 3px solid var(--color-primary); }

        .catalog-details {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .catalog-summary {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.45;
          margin-bottom: 16px;
        }

        .catalog-features {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          margin-bottom: 20px;
          padding: 12px;
          background-color: var(--color-surface-subtle);
          border-radius: var(--radius-md);
        }

        .catalog-footer {
          margin-top: auto;
        }

        .w-full {
          width: 100%;
        }
      `}} />
    </div>
  );
}
