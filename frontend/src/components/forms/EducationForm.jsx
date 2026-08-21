import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, deleteEducation } = useResume();
  const { education = [] } = resumeData;

  return (
    <div className="form-section-card animate-fade-in">
      <div className="flex-between mb-2">
        <div className="form-section-header">
          <GraduationCap size={18} className="text-primary" />
          <h3>Education & Academics</h3>
        </div>
        <button type="button" onClick={addEducation} className="btn btn-primary btn-sm">
          <Plus size={14} /> Add Degree
        </button>
      </div>
      <p className="form-section-desc">
        Add your academic qualifications, degrees, and notable honors.
      </p>

      <div className="items-list">
        {education.map((edu, index) => (
          <div key={edu.id} className="item-card">
            <div className="item-card-header">
              <span className="item-index-badge">#{index + 1}</span>
              <span className="item-title-preview">
                <strong>{edu.degree || 'Degree'}</strong>, {edu.institution || 'Institution'}
              </span>
              <button
                type="button"
                onClick={() => deleteEducation(edu.id)}
                className="btn btn-danger btn-sm"
                title="Delete Education"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Degree / Certificate *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. M.S. in Computer Science"
                  value={edu.degree || ''}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Institution / University *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Georgia Institute of Technology"
                  value={edu.institution || ''}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Atlanta, GA"
                  value={edu.location || ''}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Start Year</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2014"
                  value={edu.startDate || ''}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">End / Graduation Year</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2016"
                  value={edu.endDate || ''}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Academic Details / Honors (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. GPA 3.9/4.0 • Research in Distributed Consensus"
                value={edu.details || ''}
                onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
