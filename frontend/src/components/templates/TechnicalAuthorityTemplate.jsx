import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/Icons';

export default function TechnicalAuthorityTemplate({ data }) {
  const { personalInfo, summary, skills, experience, education, projects, themeColor } = data;
  const primaryColor = themeColor || '#00685f';

  return (
    <div className="cv-document technical-authority">
      {/* Header Section */}
      <header className="cv-header">
        <h1 className="cv-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="cv-role" style={{ color: primaryColor }}>
          {personalInfo.jobTitle || 'Your Professional Title'}
        </div>

        {/* Contact Strip */}
        <div className="cv-contacts">
          {personalInfo.email && (
            <span className="cv-contact-item">
              <Mail size={12} style={{ color: primaryColor }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="cv-contact-item">
              <Phone size={12} style={{ color: primaryColor }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="cv-contact-item">
              <MapPin size={12} style={{ color: primaryColor }} />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="cv-contact-item">
              <Globe size={12} style={{ color: primaryColor }} />
              {personalInfo.website.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="cv-contact-item">
              <LinkedinIcon size={12} color={primaryColor} />
              {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
          {personalInfo.github && (
            <span className="cv-contact-item">
              <GithubIcon size={12} color={primaryColor} />
              {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
        </div>
      </header>

      {/* Summary Box */}
      {summary && (
        <section className="cv-section cv-summary-block">
          <p className="cv-summary-text">{summary}</p>
        </section>
      )}

      {/* Categorized Skills (2-Column Grid as in Stitch) */}
      {skills && (
        <section className="cv-section">
          <div className="cv-section-title-wrap">
            <h2 className="cv-section-title" style={{ color: primaryColor }}>Core Technical Competencies</h2>
            <div className="cv-section-line" style={{ backgroundColor: primaryColor }} />
          </div>

          <div className="cv-skills-grid">
            {skills.languages && skills.languages.length > 0 && (
              <div className="cv-skill-category">
                <span className="cv-skill-cat-title">Languages:</span>
                <div className="cv-chips-wrap">
                  {skills.languages.map((skill, idx) => (
                    <span key={idx} className="cv-chip">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {skills.frameworks && skills.frameworks.length > 0 && (
              <div className="cv-skill-category">
                <span className="cv-skill-cat-title">Frameworks & DBs:</span>
                <div className="cv-chips-wrap">
                  {skills.frameworks.map((skill, idx) => (
                    <span key={idx} className="cv-chip">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {skills.cloudDevops && skills.cloudDevops.length > 0 && (
              <div className="cv-skill-category">
                <span className="cv-skill-cat-title">Cloud & Infrastructure:</span>
                <div className="cv-chips-wrap">
                  {skills.cloudDevops.map((skill, idx) => (
                    <span key={idx} className="cv-chip">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {skills.leadership && skills.leadership.length > 0 && (
              <div className="cv-skill-category">
                <span className="cv-skill-cat-title">Architecture & Leadership:</span>
                <div className="cv-chips-wrap">
                  {skills.leadership.map((skill, idx) => (
                    <span key={idx} className="cv-chip">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className="cv-section">
          <div className="cv-section-title-wrap">
            <h2 className="cv-section-title" style={{ color: primaryColor }}>Professional Experience</h2>
            <div className="cv-section-line" style={{ backgroundColor: primaryColor }} />
          </div>

          <div className="cv-timeline">
            {experience.map((item) => (
              <div key={item.id} className="cv-exp-item">
                <div className="cv-exp-header">
                  <div className="cv-exp-role-company">
                    <span className="cv-exp-role">{item.role}</span>
                    <span className="cv-exp-at">at</span>
                    <span className="cv-exp-company" style={{ color: primaryColor }}>{item.company}</span>
                    {item.location && <span className="cv-exp-loc">• {item.location}</span>}
                  </div>
                  <span className="cv-exp-date">
                    {item.startDate} — {item.current ? 'Present' : item.endDate}
                  </span>
                </div>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="cv-bullets">
                    {item.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="cv-bullet-item">
                        <span className="cv-bullet-marker" style={{ backgroundColor: primaryColor }} />
                        <span className="cv-bullet-text">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="cv-section">
          <div className="cv-section-title-wrap">
            <h2 className="cv-section-title" style={{ color: primaryColor }}>Key Projects & Open Source</h2>
            <div className="cv-section-line" style={{ backgroundColor: primaryColor }} />
          </div>

          <div className="cv-projects-list">
            {projects.map((proj) => (
              <div key={proj.id} className="cv-project-item">
                <div className="cv-proj-header">
                  <span className="cv-proj-name">{proj.name}</span>
                  {proj.techStack && (
                    <span className="cv-proj-tech">[{proj.techStack}]</span>
                  )}
                  {proj.link && (
                    <span className="cv-proj-link" style={{ color: primaryColor }}>{proj.link}</span>
                  )}
                </div>
                {proj.description && (
                  <p className="cv-proj-desc">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="cv-section">
          <div className="cv-section-title-wrap">
            <h2 className="cv-section-title" style={{ color: primaryColor }}>Education & Academic Background</h2>
            <div className="cv-section-line" style={{ backgroundColor: primaryColor }} />
          </div>

          <div className="cv-edu-list">
            {education.map((edu) => (
              <div key={edu.id} className="cv-edu-item">
                <div className="cv-edu-header">
                  <div className="cv-edu-degree-inst">
                    <span className="cv-edu-degree">{edu.degree}</span>
                    <span className="cv-edu-inst">, {edu.institution}</span>
                    {edu.location && <span className="cv-edu-loc"> ({edu.location})</span>}
                  </div>
                  <span className="cv-edu-date">{edu.startDate} — {edu.endDate}</span>
                </div>
                {edu.details && <p className="cv-edu-details">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .technical-authority {
          font-family: var(--font-body);
          color: #191c1e;
          line-height: 1.45;
          padding: 32px 38px;
          background: #ffffff;
          box-sizing: border-box;
        }

        .cv-header {
          margin-bottom: 18px;
        }

        .cv-name {
          font-family: var(--font-heading);
          font-size: 26px;
          font-weight: 800;
          color: #191c1e;
          letter-spacing: -0.02em;
          margin-bottom: 3px;
        }

        .cv-role {
          font-family: var(--font-heading);
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-bottom: 10px;
        }

        .cv-contacts {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 16px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #545c72;
        }

        .cv-contact-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .cv-summary-block {
          background-color: #f8fafc;
          border-left: 3px solid ${primaryColor};
          padding: 10px 14px;
          border-radius: 4px;
          margin-bottom: 16px;
        }

        .cv-summary-text {
          font-size: 12.5px;
          color: #2d3748;
          line-height: 1.5;
        }

        .cv-section {
          margin-bottom: 18px;
        }

        .cv-section-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .cv-section-title {
          font-family: var(--font-heading);
          font-size: 13.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        .cv-section-line {
          height: 1.5px;
          flex: 1;
          opacity: 0.35;
        }

        .cv-skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px 16px;
        }

        .cv-skill-category {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cv-skill-cat-title {
          font-family: var(--font-heading);
          font-size: 11px;
          font-weight: 700;
          color: #4a5568;
        }

        .cv-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .cv-chip {
          font-family: var(--font-mono);
          font-size: 10px;
          background-color: #f1f5f9;
          color: #1e293b;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid #e2e8f0;
        }

        .cv-timeline {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cv-exp-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cv-exp-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .cv-exp-role-company {
          font-size: 12.5px;
        }

        .cv-exp-role {
          font-family: var(--font-heading);
          font-weight: 700;
          color: #0f172a;
        }

        .cv-exp-at {
          margin: 0 4px;
          color: #64748b;
          font-size: 11.5px;
        }

        .cv-exp-company {
          font-family: var(--font-heading);
          font-weight: 600;
        }

        .cv-exp-loc {
          color: #64748b;
          font-size: 11px;
          margin-left: 4px;
        }

        .cv-exp-date {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #64748b;
          font-weight: 500;
        }

        .cv-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 3px;
          padding-left: 2px;
        }

        .cv-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 11.5px;
          color: #334155;
          line-height: 1.45;
        }

        .cv-bullet-marker {
          width: 4px;
          height: 4px;
          border-radius: 1px;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .cv-proj-header {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: 12px;
          margin-bottom: 2px;
        }

        .cv-proj-name {
          font-family: var(--font-heading);
          font-weight: 700;
          color: #0f172a;
        }

        .cv-proj-tech {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #64748b;
        }

        .cv-proj-link {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-decoration: underline;
        }

        .cv-proj-desc {
          font-size: 11.5px;
          color: #475569;
          margin-bottom: 6px;
        }

        .cv-edu-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 12px;
        }

        .cv-edu-degree {
          font-family: var(--font-heading);
          font-weight: 700;
          color: #0f172a;
        }

        .cv-edu-inst {
          font-weight: 500;
          color: #334155;
        }

        .cv-edu-date {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #64748b;
        }

        .cv-edu-details {
          font-size: 11px;
          color: #64748b;
          margin-top: 2px;
        }
      `}} />
    </div>
  );
}
