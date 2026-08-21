import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/Icons';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo(name, value);
  };

  return (
    <div className="form-section-card animate-fade-in">
      <div className="form-section-header">
        <User size={18} className="text-primary" />
        <h3>Personal Details & Contact</h3>
      </div>
      <p className="form-section-desc">
        Recruiters and hiring managers will use this information to contact you.
      </p>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            name="fullName"
            className="form-input"
            placeholder="e.g. Shafayat Hossain Masum"
            value={personalInfo.fullName || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Professional Title / Target Role *</label>
          <input
            type="text"
            name="jobTitle"
            className="form-input"
            placeholder="e.g. Principal Software Engineer"
            value={personalInfo.jobTitle || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            <span className="flex-center"><Mail size={13} /> Email Address *</span>
          </label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="e.g. yourname@example.com"
            value={personalInfo.email || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="flex-center"><Phone size={13} /> Phone Number</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            placeholder="e.g. +1 (555) 019-2834"
            value={personalInfo.phone || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            <span className="flex-center"><MapPin size={13} /> Location (City, Country)</span>
          </label>
          <input
            type="text"
            name="location"
            className="form-input"
            placeholder="e.g. San Francisco, CA"
            value={personalInfo.location || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="flex-center"><Globe size={13} /> Portfolio / Website</span>
          </label>
          <input
            type="url"
            name="website"
            className="form-input"
            placeholder="e.g. https://shafayat.dev"
            value={personalInfo.website || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            <span className="flex-center"><LinkedinIcon size={13} /> LinkedIn Profile</span>
          </label>
          <input
            type="text"
            name="linkedin"
            className="form-input"
            placeholder="e.g. linkedin.com/in/shafayat-masum"
            value={personalInfo.linkedin || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="flex-center"><GithubIcon size={13} /> GitHub Profile</span>
          </label>
          <input
            type="text"
            name="github"
            className="form-input"
            placeholder="e.g. github.com/shafayat-masum"
            value={personalInfo.github || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
