import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon } from '../common/Icons';

export default function ModernTemplate({ data }) {
  const { personalInfo, summary, skills, experience, education, projects, themeColor } = data;
  const primaryColor = themeColor || '#0051d5';

  return (
    <div className="cv-document modern-executive">
      {/* Top Banner Header */}
      <header className="mod-header">
        <div className="mod-header-content">
          <h1 className="mod-name">{personalInfo.fullName || 'Your Name'}</h1>
          <div className="mod-role" style={{ color: primaryColor }}>
            {personalInfo.jobTitle || 'Your Professional Title'}
          </div>
          <div className="mod-contacts">
            {personalInfo.email && <span><Mail size={11} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span><Phone size={11} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span><MapPin size={11} /> {personalInfo.location}</span>}
            {personalInfo.website && <span><Globe size={11} /> {personalInfo.website}</span>}
            {personalInfo.linkedin && <span><LinkedinIcon size={11} color={primaryColor} /> {personalInfo.linkedin}</span>}
          </div>
        </div>
      </header>

      <div className="mod-body">
        {summary && (
          <section className="mod-section">
            <h2 className="mod-sec-title" style={{ color: primaryColor }}>Executive Profile</h2>
            <p className="mod-summary">{summary}</p>
          </section>
        )}

        {experience && experience.length > 0 && (
          <section className="mod-section">
            <h2 className="mod-sec-title" style={{ color: primaryColor }}>Experience & Leadership</h2>
            <div className="mod-list">
              {experience.map((item) => (
                <div key={item.id} className="mod-item">
                  <div className="mod-item-top">
                    <div>
                      <strong className="mod-item-role">{item.role}</strong>
                      <span className="mod-item-company"> — {item.company}</span>
                      {item.location && <span className="mod-item-loc"> ({item.location})</span>}
                    </div>
                    <span className="mod-item-date">{item.startDate} – {item.current ? 'Present' : item.endDate}</span>
                  </div>
                  {item.highlights && (
                    <ul className="mod-bullets">
                      {item.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {skills && (
          <section className="mod-section">
            <h2 className="mod-sec-title" style={{ color: primaryColor }}>Key Skills & Technologies</h2>
            <div className="mod-skills-wrap">
              {Object.entries(skills).map(([cat, list]) => (
                list && list.length > 0 && (
                  <div key={cat} className="mod-skill-group">
                    <span className="mod-skill-group-name">{cat.toUpperCase()}: </span>
                    <span className="mod-skill-items">{list.join(' • ')}</span>
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {education && education.length > 0 && (
          <section className="mod-section">
            <h2 className="mod-sec-title" style={{ color: primaryColor }}>Education</h2>
            <div className="mod-list">
              {education.map((edu) => (
                <div key={edu.id} className="mod-item">
                  <div className="mod-item-top">
                    <div>
                      <strong className="mod-item-role">{edu.degree}</strong>
                      <span className="mod-item-company">, {edu.institution}</span>
                    </div>
                    <span className="mod-item-date">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  {edu.details && <p className="mod-details">{edu.details}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .modern-executive {
          font-family: var(--font-body);
          color: #1e293b;
          padding: 36px;
          background: #ffffff;
        }
        .mod-header {
          border-bottom: 2px solid ${primaryColor};
          padding-bottom: 14px;
          margin-bottom: 18px;
        }
        .mod-name {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .mod-role {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .mod-contacts {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          font-size: 11.5px;
          color: #64748b;
        }
        .mod-contacts span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .mod-section {
          margin-bottom: 16px;
        }
        .mod-sec-title {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .mod-summary {
          font-size: 12px;
          line-height: 1.5;
          color: #334155;
        }
        .mod-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mod-item-top {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 3px;
        }
        .mod-item-role {
          color: #0f172a;
          font-weight: 700;
        }
        .mod-item-date {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #64748b;
        }
        .mod-bullets {
          padding-left: 16px;
          font-size: 11.5px;
          color: #475569;
          line-height: 1.45;
        }
        .mod-skills-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 11.5px;
        }
        .mod-skill-group-name {
          font-family: var(--font-heading);
          font-weight: 700;
          color: #334155;
          font-size: 10.5px;
        }
        .mod-skill-items {
          color: #475569;
        }
        .mod-details {
          font-size: 11px;
          color: #64748b;
          margin-top: 2px;
        }
      `}} />
    </div>
  );
}
