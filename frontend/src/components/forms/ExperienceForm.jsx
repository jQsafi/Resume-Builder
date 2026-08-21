import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Briefcase, Plus, Trash2, PlusCircle, MinusCircle } from 'lucide-react';

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, deleteExperience } = useResume();
  const { experience = [] } = resumeData;

  const handleAddHighlight = (expId, currentHighlights = []) => {
    const updated = [...currentHighlights, 'Achieved X resulting in Y measured by Z.'];
    updateExperience(expId, 'highlights', updated);
  };

  const handleUpdateHighlight = (expId, index, text, currentHighlights = []) => {
    const updated = [...currentHighlights];
    updated[index] = text;
    updateExperience(expId, 'highlights', updated);
  };

  const handleRemoveHighlight = (expId, index, currentHighlights = []) => {
    const updated = currentHighlights.filter((_, i) => i !== index);
    updateExperience(expId, 'highlights', updated);
  };

  return (
    <div className="form-section-card animate-fade-in">
      <div className="flex-between mb-2">
        <div className="form-section-header">
          <Briefcase size={18} className="text-primary" />
          <h3>Work Experience</h3>
        </div>
        <button type="button" onClick={addExperience} className="btn btn-primary btn-sm">
          <Plus size={14} /> Add Position
        </button>
      </div>
      <p className="form-section-desc">
        List your relevant work history in reverse-chronological order. Focus on accomplishments rather than routine responsibilities.
      </p>

      <div className="items-list">
        {experience.map((exp, index) => (
          <div key={exp.id} className="item-card">
            <div className="item-card-header">
              <span className="item-index-badge">#{index + 1}</span>
              <span className="item-title-preview">
                <strong>{exp.role || 'Job Role'}</strong> at {exp.company || 'Company'}
              </span>
              <button
                type="button"
                onClick={() => deleteExperience(exp.id)}
                className="btn btn-danger btn-sm"
                title="Delete Experience"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Job Title / Role *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Principal Software Engineer"
                  value={exp.role || ''}
                  onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company / Organization *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Apex Cloud Technologies"
                  value={exp.company || ''}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. San Francisco, CA or Remote"
                  value={exp.location || ''}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2022 or Jan 2022"
                  value={exp.startDate || ''}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Present or Dec 2023"
                  value={exp.endDate || ''}
                  disabled={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="checkbox-row mb-2">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={!!exp.current}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                />
                Currently work here
              </label>
            </div>

            {/* Bullet Points / Highlights */}
            <div className="highlights-section">
              <div className="flex-between mb-1">
                <label className="form-label">Key Achievements & Impact Bullets</label>
                <button
                  type="button"
                  onClick={() => handleAddHighlight(exp.id, exp.highlights)}
                  className="btn btn-ghost btn-sm text-primary"
                >
                  <PlusCircle size={13} /> Add Bullet
                </button>
              </div>

              {(exp.highlights || []).map((bullet, bIdx) => (
                <div key={bIdx} className="bullet-input-row">
                  <span className="bullet-dot">•</span>
                  <textarea
                    rows={2}
                    className="form-textarea bullet-input"
                    value={bullet}
                    placeholder="Describe specific impact with metrics..."
                    onChange={(e) => handleUpdateHighlight(exp.id, bIdx, e.target.value, exp.highlights)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(exp.id, bIdx, exp.highlights)}
                    className="btn btn-ghost btn-sm text-danger"
                    title="Remove bullet"
                  >
                    <MinusCircle size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {experience.length === 0 && (
          <div className="empty-state-box">
            <p>No work experience added yet.</p>
            <button type="button" onClick={addExperience} className="btn btn-outline btn-sm mt-1">
              Add First Position
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .items-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .item-card {
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 16px;
        }

        .item-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .item-index-badge {
          background-color: var(--color-primary-light);
          color: var(--color-primary);
          font-weight: 700;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: 3px;
        }

        .item-title-preview {
          flex: 1;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .checkbox-row {
          display: flex;
          align-items: center;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.825rem;
          color: var(--color-text-secondary);
          cursor: pointer;
        }

        .highlights-section {
          background-color: #ffffff;
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border-subtle);
        }

        .bullet-input-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 8px;
        }

        .bullet-dot {
          font-size: 1.2rem;
          color: var(--color-primary);
          line-height: 1.5;
        }

        .bullet-input {
          min-height: 50px;
          font-size: 0.85rem;
        }

        .empty-state-box {
          text-align: center;
          padding: 30px;
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-text-tertiary);
        }
      `}} />
    </div>
  );
}
