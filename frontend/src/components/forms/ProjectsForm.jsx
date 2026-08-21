import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, deleteProject } = useResume();
  const { projects = [] } = resumeData;

  return (
    <div className="form-section-card animate-fade-in">
      <div className="flex-between mb-2">
        <div className="form-section-header">
          <FolderGit2 size={18} className="text-primary" />
          <h3>Key Projects & Open Source</h3>
        </div>
        <button type="button" onClick={addProject} className="btn btn-primary btn-sm">
          <Plus size={14} /> Add Project
        </button>
      </div>
      <p className="form-section-desc">
        Highlight technical projects, open-source repositories, or architecture prototypes.
      </p>

      <div className="items-list">
        {projects.map((proj, index) => (
          <div key={proj.id} className="item-card">
            <div className="item-card-header">
              <span className="item-index-badge">#{index + 1}</span>
              <span className="item-title-preview">
                <strong>{proj.name || 'Project Name'}</strong>
              </span>
              <button
                type="button"
                onClick={() => deleteProject(proj.id)}
                className="btn btn-danger btn-sm"
                title="Delete Project"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. OmniStream: High-Throughput Broker"
                  value={proj.name || ''}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tech Stack</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Go, Kafka, Docker"
                  value={proj.techStack || ''}
                  onChange={(e) => updateProject(proj.id, 'techStack', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Project Link / Repo</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. github.com/username/project"
                value={proj.link || ''}
                onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description & Key Impact</label>
              <textarea
                rows={3}
                className="form-textarea"
                placeholder="Describe what the project does and key achievements..."
                value={proj.description || ''}
                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
