import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Wrench, Plus, X } from 'lucide-react';

const CATEGORY_META = [
  { key: 'languages', label: 'Programming & Query Languages', placeholder: 'e.g. TypeScript, Python, Go, SQL' },
  { key: 'frameworks', label: 'Frameworks, Libraries & Databases', placeholder: 'e.g. React, Next.js, FastAPI, PostgreSQL, Redis' },
  { key: 'cloudDevops', label: 'Cloud, Infrastructure & DevOps', placeholder: 'e.g. AWS, Kubernetes, Docker, Terraform, Kafka' },
  { key: 'leadership', label: 'Architecture & Leadership Competencies', placeholder: 'e.g. System Design, Agile, Mentorship, RFC Reviews' }
];

export default function SkillsForm() {
  const { resumeData, addSkillItem, removeSkillItem } = useResume();
  const { skills = {} } = resumeData;

  const [inputValues, setInputValues] = useState({
    languages: '',
    frameworks: '',
    cloudDevops: '',
    leadership: ''
  });

  const handleKeyDown = (category, e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = inputValues[category];
      if (val && val.trim()) {
        addSkillItem(category, val.trim());
        setInputValues((prev) => ({ ...prev, [category]: '' }));
      }
    }
  };

  const handleAdd = (category) => {
    const val = inputValues[category];
    if (val && val.trim()) {
      addSkillItem(category, val.trim());
      setInputValues((prev) => ({ ...prev, [category]: '' }));
    }
  };

  return (
    <div className="form-section-card animate-fade-in">
      <div className="form-section-header">
        <Wrench size={18} className="text-primary" />
        <h3>Categorized Technical Skills</h3>
      </div>
      <p className="form-section-desc">
        Organize skills into distinct domains for maximum recruiter scanability and ATS parsing accuracy. Press <kbd className="kbd-hint">Enter</kbd> or comma to add tags.
      </p>

      <div className="skills-category-list">
        {CATEGORY_META.map(({ key, label, placeholder }) => {
          const list = skills[key] || [];
          return (
            <div key={key} className="skill-cat-card">
              <div className="skill-cat-header">
                <span className="skill-cat-label">{label}</span>
                <span className="skill-count">{list.length} skills</span>
              </div>

              {/* Tag Input */}
              <div className="tag-input-row">
                <input
                  type="text"
                  className="form-input tag-input"
                  placeholder={placeholder}
                  value={inputValues[key]}
                  onChange={(e) => setInputValues({ ...inputValues, [key]: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(key, e)}
                />
                <button
                  type="button"
                  onClick={() => handleAdd(key)}
                  className="btn btn-outline btn-sm"
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              {/* Tag List */}
              <div className="tag-chips-wrap">
                {list.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkillItem(key, skill)}
                      className="tag-remove-btn"
                      title="Remove"
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
                {list.length === 0 && (
                  <span className="empty-tag-note">No skills added yet in this category.</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .skills-category-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .skill-cat-card {
          background-color: var(--color-surface-subtle);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 14px;
        }

        .skill-cat-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .skill-cat-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--color-text-primary);
        }

        .skill-count {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-text-secondary);
        }

        .tag-input-row {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }

        .tag-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background-color: #ffffff;
          border: 1px solid var(--color-border);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          color: var(--color-text-primary);
          transition: all var(--transition-fast);
        }

        .skill-tag:hover {
          border-color: var(--color-primary);
        }

        .tag-remove-btn {
          border: none;
          background: transparent;
          color: var(--color-text-tertiary);
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .tag-remove-btn:hover {
          color: var(--color-danger);
        }

        .empty-tag-note {
          font-size: 0.8rem;
          color: var(--color-text-tertiary);
          font-style: italic;
        }

        .kbd-hint {
          background: #e2e8f0;
          padding: 1px 4px;
          border-radius: 3px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }
      `}} />
    </div>
  );
}
