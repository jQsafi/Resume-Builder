import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { FileText, Sparkles, RefreshCw } from 'lucide-react';
import { suggestSummaryAiApi } from '../../services/api';

export default function SummaryForm() {
  const { resumeData, updateSummary } = useResume();
  const [generating, setGenerating] = useState(false);

  const handleSuggest = async () => {
    setGenerating(true);
    try {
      const allSkills = [
        ...(resumeData.skills?.languages || []),
        ...(resumeData.skills?.frameworks || []),
        ...(resumeData.skills?.cloudDevops || [])
      ];
      const role = resumeData.personalInfo?.jobTitle || 'Principal Software Engineer';
      const data = await suggestSummaryAiApi(role, allSkills);
      if (data.summary) {
        updateSummary(data.summary);
      }
    } catch (err) {
      console.error('Failed to generate summary with AI:', err);
      // Fallback
      const fallback = `High-impact ${resumeData.personalInfo?.jobTitle || 'Engineering Professional'} with extensive experience in designing resilient systems and driving cross-functional technical leadership to deliver scalable business outcomes.`;
      updateSummary(fallback);
    } finally {
      setGenerating(false);
    }
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
          <button
            type="button"
            onClick={handleSuggest}
            disabled={generating}
            className="btn btn-ghost btn-sm text-primary flex-center gap-1"
            title="Generate AI Summary using Groq Llama 3.3 70B"
          >
            {generating ? (
              <>
                <RefreshCw size={13} className="spin-fast" /> Generating...
              </>
            ) : (
              <>
                <Sparkles size={13} /> AI Executive Summary
              </>
            )}
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

      <style dangerouslySetInnerHTML={{ __html: `
        .spin-fast {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
