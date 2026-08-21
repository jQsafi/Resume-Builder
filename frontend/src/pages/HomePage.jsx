import React from 'react';
import { useResume } from '../context/ResumeContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck2, 
  Cpu, 
  Download, 
  ShieldCheck, 
  Zap, 
  Layout, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function HomePage({ setActivePage }) {
  const { setTemplateId } = useResume();

  const handleStartBuilding = (templateId = 'technical-authority') => {
    setTemplateId(templateId);
    setActivePage('editor');
  };

  return (
    <div className="landing-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={13} className="hero-badge-icon" />
              <span>Algorithmic ATS 2.0 Optimization</span>
            </div>

            <h1 className="hero-title">
              Build a resume that <span className="hero-highlight">beats the algorithm.</span>
            </h1>

            <p className="hero-subtitle">
              Precision-engineered templates designed by technical hiring managers to ensure your experience gets noticed by top-tier tech companies.
            </p>

            <div className="hero-cta-group">
              <button 
                type="button" 
                onClick={() => handleStartBuilding('technical-authority')}
                className="btn btn-primary btn-lg pulse-glow"
              >
                Create Your Resume <ArrowRight size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => setActivePage('templates')}
                className="btn btn-outline btn-lg"
              >
                Explore Templates
              </button>
            </div>

            <div className="hero-trust-metrics">
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-primary" />
                <span>100% ATS Scannable</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-primary" />
                <span>No Paywalls for PDF</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-primary" />
                <span>Auto PDF/Word Parsing</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="hero-visual">
            <div className="mockup-tilt-card">
              <div className="mockup-header-bar">
                <div className="mockup-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="mockup-url-pill">resumepro.dev/workspace/live-preview</div>
                <div className="badge badge-teal"><Zap size={11} /> 99 ATS Score</div>
              </div>

              <div className="mockup-paper">
                <div className="mockup-paper-header">
                  <div>
                    <div className="mockup-name">Shafayat Hossain Masum</div>
                    <div className="mockup-role">Principal Software Engineer & Cloud Architect</div>
                  </div>
                  <div className="mockup-badge">ATS MATCH: HIGH</div>
                </div>

                <div className="mockup-summary-box">
                  <div className="mockup-summary-line w-full" />
                  <div className="mockup-summary-line w-85" />
                </div>

                <div className="mockup-section-title">Core Technical Competencies</div>
                <div className="mockup-skills-grid">
                  <span className="mockup-chip">TypeScript</span>
                  <span className="mockup-chip">Python (FastAPI)</span>
                  <span className="mockup-chip">Go</span>
                  <span className="mockup-chip">Kubernetes</span>
                  <span className="mockup-chip">PostgreSQL</span>
                  <span className="mockup-chip">Kafka</span>
                </div>

                <div className="mockup-section-title mt-2">Professional Experience</div>
                <div className="mockup-exp-item">
                  <div className="flex-between mb-1">
                    <strong className="text-xs">Principal Engineer at Apex Cloud</strong>
                    <span className="text-mono-xs">2022 – Present</span>
                  </div>
                  <div className="mockup-bullet" />
                  <div className="mockup-bullet w-90" />
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="floating-stat-card animate-float">
                <div className="stat-icon-wrap">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <div className="stat-value">3.4x More Interviews</div>
                  <div className="stat-label">Verified candidate callback rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="social-proof-strip">
        <div className="strip-container">
          <p className="strip-label">TRUSTED BY TECH PROFESSIONALS HIRED AT</p>
          <div className="strip-logos">
            <span className="company-logo">Google</span>
            <span className="company-logo">Meta</span>
            <span className="company-logo">Amazon</span>
            <span className="company-logo">Netflix</span>
            <span className="company-logo">Stripe</span>
            <span className="company-logo">Apple</span>
            <span className="company-logo">Uber</span>
          </div>
        </div>
      </section>

      {/* 3 Core Pillar Features */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-heading text-center">
            <span className="badge badge-teal mb-2">Engineered For Precision</span>
            <h2>Why Tech Professionals Choose ResumePro</h2>
            <p className="section-sub">
              Unlike generic resume builders that break under enterprise applicant tracking systems, every layout in ResumePro is mathematically tuned for parsability.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box bg-teal-light">
                <FileCheck2 size={24} className="text-primary" />
              </div>
              <h3>Recruiter-Approved Layouts</h3>
              <p>
                Rigorously validated against Taleo, Workday, Greenhouse, and Lever algorithms so your resume never gets filtered out before human eyes see it.
              </p>
              <ul className="feature-checklist">
                <li><CheckCircle2 size={14} className="text-primary" /> Strict standard margins & font scaling</li>
                <li><CheckCircle2 size={14} className="text-primary" /> Multi-column 2-tier skill matrix</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box bg-blue-light">
                <Cpu size={24} className="text-secondary" />
              </div>
              <h3>Automated PDF & Word Extraction</h3>
              <p>
                Upload any existing `.pdf` or `.docx` resume and our parsing engine will automatically populate your career milestones into structured sections.
              </p>
              <ul className="feature-checklist">
                <li><CheckCircle2 size={14} className="text-primary" /> Zero manual retyping required</li>
                <li><CheckCircle2 size={14} className="text-primary" /> One-click section reordering</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box bg-amber-light">
                <Download size={24} className="text-amber" />
              </div>
              <h3>High-Fidelity Document Export</h3>
              <p>
                Export pixel-perfect vector PDFs, editable Microsoft Word (`.docx`) files, or raw JSON schema backups for complete ownership of your career data.
              </p>
              <ul className="feature-checklist">
                <li><CheckCircle2 size={14} className="text-primary" /> Pixel-crisp vector typography</li>
                <li><CheckCircle2 size={14} className="text-primary" /> Direct browser & printer sync</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Precision Templates Showcase */}
      <section className="showcase-section">
        <div className="section-container">
          <div className="flex-between mb-8 flex-wrap gap-4">
            <div>
              <span className="badge badge-blue mb-2">Curated Gallery</span>
              <h2>Precision Technical Templates</h2>
              <p className="section-sub">
                Select a starting design engineered specifically for your domain and seniority level.
              </p>
            </div>
            <button 
              type="button" 
              onClick={() => setActivePage('templates')} 
              className="btn btn-outline"
            >
              View All Templates <ChevronRight size={16} />
            </button>
          </div>

          <div className="showcase-grid">
            <div className="showcase-card" onClick={() => handleStartBuilding('technical-authority')}>
              <div className="showcase-preview bg-teal-grad">
                <div className="showcase-paper">
                  <div className="paper-line h-teal w-60" />
                  <div className="paper-line h-slate w-40" />
                  <div className="paper-block" />
                  <div className="paper-block" />
                </div>
                <div className="showcase-overlay">
                  <span className="btn btn-primary btn-sm">Use Blueprint</span>
                </div>
              </div>
              <div className="showcase-info">
                <div className="flex-between mb-1">
                  <h4>Technical Authority</h4>
                  <span className="badge badge-teal">Stitch Blueprint</span>
                </div>
                <p>Designed for Senior/Principal Engineers, Tech Leads, and Cloud Architects.</p>
              </div>
            </div>

            <div className="showcase-card" onClick={() => handleStartBuilding('modern-clean')}>
              <div className="showcase-preview bg-blue-grad">
                <div className="showcase-paper">
                  <div className="paper-line h-blue w-60" />
                  <div className="paper-line h-slate w-40" />
                  <div className="paper-block" />
                  <div className="paper-block" />
                </div>
                <div className="showcase-overlay">
                  <span className="btn btn-primary btn-sm">Use Blueprint</span>
                </div>
              </div>
              <div className="showcase-info">
                <div className="flex-between mb-1">
                  <h4>Modern Executive</h4>
                  <span className="badge badge-blue">Leadership</span>
                </div>
                <p>Balanced single-column layout emphasizing metrics, executive strategy, and vision.</p>
              </div>
            </div>

            <div className="showcase-card" onClick={() => handleStartBuilding('minimal-classic')}>
              <div className="showcase-preview bg-slate-grad">
                <div className="showcase-paper">
                  <div className="paper-line h-dark w-60" />
                  <div className="paper-line h-slate w-40" />
                  <div className="paper-block" />
                  <div className="paper-block" />
                </div>
                <div className="showcase-overlay">
                  <span className="btn btn-primary btn-sm">Use Blueprint</span>
                </div>
              </div>
              <div className="showcase-info">
                <div className="flex-between mb-1">
                  <h4>Minimalist Academic</h4>
                  <span className="badge badge-mono">Classic ATS</span>
                </div>
                <p>Zero decoration, ultra-dense information architecture for strict screening gates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section">
        <div className="section-container">
          <div className="section-heading text-center">
            <span className="badge badge-teal mb-2">Streamlined Workflow</span>
            <h2>Create Your Dream Resume in 3 Steps</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h4>Pick an ATS Template</h4>
              <p>Browse our curated templates crafted to highlight technical depth, architecture skills, or management experience.</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h4>Auto-Import or Enter Data</h4>
              <p>Upload your existing resume file for instant extraction or use our step-by-step form with live preview feedback.</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h4>Export Pixel-Perfect PDF</h4>
              <p>Download clean, recruiter-ready PDF and Word documents ready to submit to any job portal with 100% formatting fidelity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="cta-banner">
        <div className="cta-container">
          <h2>Ready to land your next high-impact role?</h2>
          <p>
            Stop fighting broken resume builders and unformatted templates. Build your ATS-optimized technical resume in minutes.
          </p>
          <button 
            type="button" 
            onClick={() => handleStartBuilding('technical-authority')}
            className="btn btn-cta btn-lg"
          >
            Get Started for Free <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .landing-page {
          background-color: var(--color-bg);
          color: var(--color-text-primary);
        }

        /* Hero */
        .hero-section {
          padding: 60px 24px 80px 24px;
          background: radial-gradient(circle at 10% 20%, rgba(0, 104, 95, 0.05) 0%, transparent 50%),
                      radial-gradient(circle at 90% 80%, rgba(0, 81, 213, 0.05) 0%, transparent 50%);
          border-bottom: 1px solid var(--color-border);
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 960px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-cta-group, .hero-trust-metrics {
            justify-content: center;
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background-color: var(--color-primary-light);
          color: var(--color-primary);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          border: 1px solid rgba(0, 104, 95, 0.25);
          margin-bottom: 18px;
        }

        .hero-title {
          font-size: 3.1rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 18px;
          color: #0f172a;
        }

        .hero-highlight {
          color: var(--color-primary);
          position: relative;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
          max-width: 540px;
        }

        .hero-cta-group {
          display: flex;
          gap: 14px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .hero-trust-metrics {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        /* Mockup Tilt Card */
        .hero-visual {
          display: flex;
          justify-content: center;
          position: relative;
        }

        .mockup-tilt-card {
          width: 100%;
          max-width: 460px;
          background-color: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.15);
          overflow: hidden;
          position: relative;
          transform: perspective(1000px) rotateY(-4deg) rotateX(2deg);
          transition: transform var(--transition-slow);
        }

        .mockup-tilt-card:hover {
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
        }

        .mockup-header-bar {
          background-color: var(--color-surface-subtle);
          border-bottom: 1px solid var(--color-border);
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mockup-dots {
          display: flex;
          gap: 5px;
        }

        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #f59e0b; }
        .dot-green { background: #10b981; }

        .mockup-url-pill {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-text-tertiary);
          background: #ffffff;
          padding: 2px 10px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
        }

        .mockup-paper {
          padding: 20px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mockup-paper-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid var(--color-border-subtle);
          padding-bottom: 10px;
        }

        .mockup-name {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
        }

        .mockup-role {
          font-size: 0.78rem;
          color: var(--color-primary);
          font-weight: 600;
        }

        .mockup-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          background: var(--color-primary-light);
          color: var(--color-primary);
          padding: 2px 6px;
          border-radius: 2px;
        }

        .mockup-summary-box {
          background: #f8fafc;
          border-left: 2px solid var(--color-primary);
          padding: 6px 8px;
          border-radius: 2px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mockup-summary-line {
          height: 5px;
          background: #cbd5e1;
          border-radius: 2px;
        }
        .w-full { width: 100%; }
        .w-85 { width: 85%; }
        .w-90 { width: 90%; }
        .w-60 { width: 60%; }
        .w-40 { width: 40%; }

        .mockup-section-title {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-primary);
        }

        .mockup-skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .mockup-chip {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          background: #f1f5f9;
          padding: 2px 5px;
          border-radius: 2px;
          border: 1px solid #e2e8f0;
        }

        .mockup-exp-item {
          font-size: 0.75rem;
        }
        .text-xs { font-size: 0.75rem; }
        .text-mono-xs { font-family: var(--font-mono); font-size: 0.65rem; color: #64748b; }

        .mockup-bullet {
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          margin-top: 4px;
        }

        .floating-stat-card {
          position: absolute;
          bottom: -15px;
          right: -15px;
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .stat-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--color-primary-light);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-value {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          color: #0f172a;
        }

        .stat-label {
          font-size: 0.7rem;
          color: var(--color-text-secondary);
        }

        /* Social Proof Strip */
        .social-proof-strip {
          padding: 28px 24px;
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
        }

        .strip-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .strip-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--color-text-tertiary);
          font-weight: 600;
        }

        .strip-logos {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .company-logo {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: #64748b;
          opacity: 0.65;
          transition: all var(--transition-fast);
        }

        .company-logo:hover {
          opacity: 1;
          color: var(--color-primary);
          transform: translateY(-1px);
        }

        /* Features */
        .features-section, .showcase-section, .steps-section {
          padding: 80px 24px;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-heading {
          max-width: 680px;
          margin: 0 auto 50px auto;
        }

        .section-heading h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .section-sub {
          font-size: 1rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 28px;
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 30px;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--color-primary);
        }

        .feature-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .bg-teal-light { background: var(--color-primary-light); }
        .bg-blue-light { background: var(--color-secondary-light); }
        .bg-amber-light { background: #fef3c7; }
        .text-amber { color: #d97706; }

        .feature-card h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        .feature-card p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 18px;
        }

        .feature-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .feature-checklist li {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Showcase Grid */
        .showcase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 28px;
        }

        .showcase-card {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .showcase-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--color-primary);
        }

        .showcase-preview {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .bg-teal-grad { background: linear-gradient(135deg, #00685f 0%, #002e2a 100%); }
        .bg-blue-grad { background: linear-gradient(135deg, #0051d5 0%, #001f5c 100%); }
        .bg-slate-grad { background: linear-gradient(135deg, #334155 0%, #0f172a 100%); }

        .showcase-paper {
          width: 140px;
          height: 170px;
          background: #ffffff;
          border-radius: 2px;
          box-shadow: var(--shadow-lg);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .paper-line { height: 6px; border-radius: 2px; }
        .h-teal { background: var(--color-primary); }
        .h-blue { background: var(--color-secondary); }
        .h-dark { background: #0f172a; }
        .h-slate { background: #94a3b8; height: 4px; }
        .paper-block { height: 30px; background: #f8fafc; border-left: 2px solid var(--color-primary); border-radius: 2px; }

        .showcase-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast);
        }

        .showcase-card:hover .showcase-overlay {
          opacity: 1;
        }

        .showcase-info {
          padding: 20px;
        }

        .showcase-info h4 {
          font-size: 1.05rem;
        }

        .showcase-info p {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
          margin-top: 6px;
        }

        /* Steps */
        .steps-section {
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .step-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .step-number {
          font-family: var(--font-mono);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--color-primary);
          line-height: 1;
          opacity: 0.85;
        }

        .step-card h4 {
          font-size: 1.15rem;
        }

        .step-card p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        /* CTA Banner */
        .cta-banner {
          background: linear-gradient(135deg, var(--color-primary) 0%, #003632 100%);
          color: #ffffff;
          padding: 80px 24px;
          text-align: center;
        }

        .cta-container {
          max-width: 720px;
          margin: 0 auto;
        }

        .cta-banner h2 {
          color: #ffffff;
          font-size: 2.4rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .cta-banner p {
          font-size: 1.1rem;
          opacity: 0.9;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .btn-cta {
          background-color: #ffffff;
          color: var(--color-primary);
          font-weight: 700;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-cta:hover {
          background-color: var(--color-primary-light);
          color: var(--color-primary-hover);
          transform: translateY(-2px);
        }

        /* Footer */
        .landing-footer {
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
          padding: 30px 24px;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
        }

        .footer-links {
          display: flex;
          gap: 20px;
          font-size: 0.85rem;
        }

        .footer-links a {
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--color-primary);
        }
      `}} />
    </div>
  );
}
