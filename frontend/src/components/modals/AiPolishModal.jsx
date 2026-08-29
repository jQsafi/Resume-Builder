import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Sparkles, 
  Check, 
  RefreshCw, 
  X, 
  Zap, 
  Cpu, 
  Award, 
  Copy, 
  Edit3, 
  CheckCheck
} from 'lucide-react';
import { polishBulletPointApi } from '../../services/api';

export default function AiPolishModal({
  isOpen,
  onClose,
  initialBullet = '',
  role = '',
  company = '',
  onApply
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [activeTab, setActiveTab] = useState('metrics');
  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const textToUse = (initialBullet && initialBullet.trim()) 
        ? initialBullet 
        : 'Engineered scalable backend microservices and optimized API throughput.';
      setIsEditing(false);
      setCopied(false);
      handlePolish(textToUse);
    }
  }, [isOpen, initialBullet]);

  // Keyboard shortcuts (Escape to close, Cmd/Ctrl+Enter to apply)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        handleApply();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, editedText, onApply, onClose]);

  const handlePolish = async (textToPolish) => {
    const text = (textToPolish && textToPolish.trim()) || initialBullet || 'Engineered scalable backend microservices and optimized API throughput.';
    setLoading(true);
    setError(null);
    try {
      const data = await polishBulletPointApi(text, role, company);
      setResultData(data);
      
      const variations = data.variations || [];
      const currentVar = variations.find(v => v.type === activeTab) || variations[0];
      const initialText = currentVar?.text || data.polished || text;
      setEditedText(initialText);
      if (currentVar?.type) {
        setActiveTab(currentVar.type);
      }
    } catch (err) {
      console.error('AI Polish error:', err);
      setError(err.message || 'Failed to polish bullet with Groq AI');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (type) => {
    setActiveTab(type);
    if (resultData?.variations) {
      const targetVar = resultData.variations.find(v => v.type === type);
      if (targetVar?.text) {
        setEditedText(targetVar.text);
      }
    }
    setIsEditing(false);
  };

  const handleCopy = () => {
    if (editedText) {
      navigator.clipboard.writeText(editedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApply = () => {
    if (onApply && editedText.trim()) {
      onApply(editedText.trim());
    }
    onClose();
  };

  if (!isOpen) return null;

  const currentVariation = resultData?.variations?.find(v => v.type === activeTab) || resultData?.variations?.[0];

  const tabOptions = [
    { type: 'metrics', label: 'Metrics & ROI', icon: <Zap size={13} /> },
    { type: 'technical', label: 'Technical Depth', icon: <Cpu size={13} /> },
    { type: 'leadership', label: 'Leadership & Scale', icon: <Award size={13} /> },
  ];

  const modalContent = (
    <div className="portal-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="portal-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Compact Header */}
        <div className="portal-header">
          <div className="header-left">
            <div className="ai-icon-chip">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="flex-center gap-1">
                <h4>AI Bullet Optimizer</h4>
                <span className="groq-tag">Groq Llama 3.3 70B</span>
              </div>
              <span className="header-sub">Recruiter-approved Google XYZ formula</span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="portal-close-btn" title="Close (Esc)">
            <X size={16} />
          </button>
        </div>

        {/* Modal Body - ZERO SCROLL */}
        <div className="portal-body">
          
          {/* 3 Horizontal Angle Tabs */}
          <div className="compact-tabs-bar">
            {tabOptions.map((tab) => (
              <button
                key={tab.type}
                type="button"
                className={`compact-tab-btn ${activeTab === tab.type ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.type)}
                disabled={loading}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Area */}
          {loading ? (
            <div className="compact-loading-box">
              <RefreshCw size={24} className="spin-fast text-primary" />
              <p>Optimizing with Groq Llama 3.3 70B...</p>
            </div>
          ) : error ? (
            <div className="compact-error-box">
              <span>⚠️ {error}</span>
              <button type="button" onClick={() => handlePolish(initialBullet)} className="btn btn-outline btn-xs mt-1">
                <RefreshCw size={11} /> Retry
              </button>
            </div>
          ) : (
            <div className="compact-content-flow">
              {/* Polished Hero Card */}
              <div className="compact-hero-card">
                <div className="hero-top-bar">
                  <span className="hero-tag">
                    <Sparkles size={12} className="text-primary" /> Polished Accomplishment
                  </span>
                  <div className="hero-actions">
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className={`pill-btn ${isEditing ? 'active' : ''}`}
                      title="Edit text before applying"
                    >
                      <Edit3 size={11} /> {isEditing ? 'Done' : 'Tweak'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="pill-btn"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <>
                          <CheckCheck size={11} className="text-success" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={11} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    rows={3}
                    className="form-textarea compact-editor"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <div className="compact-text-display" onClick={() => setIsEditing(true)} title="Click to edit">
                    <span className="bullet-dot">•</span>
                    <p>{editedText}</p>
                  </div>
                )}
              </div>

              {/* XYZ 3-Column Strip */}
              {currentVariation?.breakdown && (
                <div className="compact-xyz-grid">
                  <div className="xyz-pill pill-x" title="Accomplished [X]">
                    <span className="xyz-badge">[X] Accomplished</span>
                    <span className="xyz-val">{currentVariation.breakdown.accomplished_x || 'Key technical outcome'}</span>
                  </div>
                  <div className="xyz-pill pill-y" title="Measured By [Y]">
                    <span className="xyz-badge">[Y] Measured ROI</span>
                    <span className="xyz-val">{currentVariation.breakdown.measured_by_y || 'Quantified metric'}</span>
                  </div>
                  <div className="xyz-pill pill-z" title="By Doing [Z]">
                    <span className="xyz-badge">[Z] By Doing</span>
                    <span className="xyz-val">{currentVariation.breakdown.by_doing_z || 'Execution method'}</span>
                  </div>
                </div>
              )}

              {/* Subtle Original Draft Reference */}
              <div className="compact-original-strip">
                <span className="original-label">Draft:</span>
                <span className="original-snippet">"{initialBullet || 'No draft provided'}"</span>
                {role && <span className="original-role">({role})</span>}
              </div>
            </div>
          )}
        </div>

        {/* Compact Footer */}
        <div className="portal-footer">
          <button
            type="button"
            onClick={() => handlePolish(initialBullet)}
            disabled={loading}
            className="btn btn-ghost btn-sm"
            title="Re-generate with AI"
          >
            <RefreshCw size={12} className={loading ? 'spin-fast' : ''} /> Regenerate
          </button>

          <div className="flex-center gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={loading || !editedText.trim()}
              className="btn btn-primary btn-sm flex-center gap-1"
            >
              <Check size={14} /> Apply to Resume
            </button>
          </div>
        </div>

        {/* Dedicated Portal CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          .portal-modal-backdrop {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: rgba(15, 23, 42, 0.65) !important;
            backdrop-filter: blur(4px) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 999999 !important;
            margin: 0 !important;
            padding: 16px !important;
            box-sizing: border-box !important;
          }

          .portal-modal-card {
            width: 100% !important;
            max-width: 580px !important;
            background: #ffffff !important;
            border-radius: 12px !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35) !important;
            border: 1px solid #e2e8f0 !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
          }

          .portal-header {
            padding: 12px 16px;
            background: #ffffff;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .header-left {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .ai-icon-chip {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #00685f, #0051d5);
            color: #ffffff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .portal-header h4 {
            margin: 0;
            font-size: 0.95rem;
            color: #0f172a;
          }

          .groq-tag {
            font-size: 0.65rem;
            font-weight: 700;
            background: rgba(0, 104, 95, 0.08);
            color: #00685f;
            padding: 1px 6px;
            border-radius: 10px;
            font-family: var(--font-mono, monospace);
          }

          .header-sub {
            font-size: 0.72rem;
            color: #64748b;
            display: block;
          }

          .portal-close-btn {
            border: none;
            background: transparent;
            color: #94a3b8;
            padding: 4px;
            border-radius: 4px;
            cursor: pointer;
          }

          .portal-close-btn:hover {
            background-color: #f1f5f9;
            color: #0f172a;
          }

          .portal-body {
            padding: 14px 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-sizing: border-box;
          }

          .compact-tabs-bar {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            background: #f8fafc;
            padding: 3px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }

          .compact-tab-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: transparent;
            border: none;
            padding: 6px 8px;
            border-radius: 6px;
            font-size: 0.76rem;
            font-weight: 600;
            color: #64748b;
            cursor: pointer;
            transition: all 0.15s ease;
          }

          .compact-tab-btn:hover {
            color: #0f172a;
            background: rgba(255,255,255,0.7);
          }

          .compact-tab-btn.active {
            background: #ffffff;
            color: #00685f;
            font-weight: 700;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          }

          .compact-content-flow {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .compact-hero-card {
            background: #ffffff;
            border: 1.5px solid rgba(0, 104, 95, 0.2);
            border-radius: 8px;
            padding: 10px 12px;
            box-shadow: 0 2px 6px rgba(0, 104, 95, 0.04);
          }

          .hero-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
          }

          .hero-tag {
            font-size: 0.68rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #00685f;
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .hero-actions {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .pill-btn {
            display: inline-flex;
            align-items: center;
            gap: 3px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            color: #475569;
            font-size: 0.68rem;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 4px;
            cursor: pointer;
          }

          .pill-btn:hover, .pill-btn.active {
            background: #e6f5f3;
            color: #00685f;
          }

          .compact-text-display {
            display: flex;
            align-items: flex-start;
            gap: 6px;
            background: #f8fafc;
            padding: 8px 10px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            cursor: pointer;
          }

          .compact-text-display:hover {
            background: #f1f5f9;
          }

          .bullet-dot {
            font-size: 1.2rem;
            color: #00685f;
            line-height: 1.2;
          }

          .compact-text-display p {
            margin: 0;
            font-size: 0.85rem;
            line-height: 1.45;
            color: #0f172a;
            font-weight: 500;
          }

          .compact-editor {
            font-size: 0.85rem;
            line-height: 1.4;
            min-height: 52px;
          }

          .compact-xyz-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }

          .xyz-pill {
            border-radius: 6px;
            padding: 6px 8px;
            display: flex;
            flex-direction: column;
            gap: 1px;
          }

          .pill-x { background: #f0f9ff; border: 1px solid #bae6fd; }
          .pill-y { background: #fefce8; border: 1px solid #fef08a; }
          .pill-z { background: #f0fdf4; border: 1px solid #bbf7d0; }

          .xyz-badge {
            font-size: 0.62rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .pill-x .xyz-badge { color: #0284c7; }
          .pill-y .xyz-badge { color: #ca8a04; }
          .pill-z .xyz-badge { color: #16a34a; }

          .xyz-val {
            font-size: 0.67rem;
            color: #334155;
            line-height: 1.25;
            font-weight: 500;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .compact-original-strip {
            display: flex;
            align-items: center;
            gap: 6px;
            background: #f8fafc;
            padding: 4px 8px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            font-size: 0.7rem;
            color: #64748b;
          }

          .original-label {
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            font-size: 0.62rem;
          }

          .original-snippet {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-style: italic;
          }

          .original-role {
            color: #94a3b8;
            font-size: 0.65rem;
          }

          .compact-loading-box {
            text-align: center;
            padding: 24px 16px;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px dashed #cbd5e1;
          }

          .compact-loading-box p {
            margin: 6px 0 0 0;
            font-size: 0.8rem;
            color: #64748b;
          }

          .compact-error-box {
            padding: 8px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 6px;
            color: #b91c1c;
            text-align: center;
            font-size: 0.76rem;
          }

          .portal-footer {
            padding: 10px 16px;
            background: #ffffff;
            border-top: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}} />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
