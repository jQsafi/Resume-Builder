import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { FileText, Sparkles } from 'lucide-react';

export default function SummaryForm() {
  const { resumeData, updateSummary } = useResume();

  const handleSuggest = () => {
    const suggestion = 'Dynamic, high-impact engineering professional with comprehensive experience in architecting resilient distributed systems, modern web platforms, and driving cross-functional technical leadership to deliver scalable business outcomes.';
    updateSummary(suggestion);
  };

  return (
    <div className="form-section-card animate-fade-in">
      <div className="form-section-header">
        <FileText size={18} className="text-primary" />
        <h3>Executive / Professional Summary</h3>
      </div>
      <p className="form-section-desc">
        A concise 2-4 sentence overview highlighting your core strengths, years of experience, and highest-impact achievements.
      </p>

      <div className="form-group">
        <div className="flex-between mb-1">
          <label className="form-label">Summary Overview</label>
          <button type="button" onClick={handleSuggest} className="btn btn-ghost btn-sm text-primary">
            <Sparkles size={13} /> Auto-Polish Example
          </button>
        </div>
        <textarea
          className="form-textarea"
          rows={5}
          placeholder="Write a compelling summary of your career background..."
          value={resumeData.summary || ''}
          onChange={(e) => updateSummary(e.target.value)}
        />
        <div className="form-helper">
          Pro-tip: Include measurable metrics (e.g. "Scaled from 0 to 10M users", "Reduced latency by 40%").
        </div>
      </div>
    </div>
  );
}
