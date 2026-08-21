import React from 'react';
import { useResume } from '../../context/ResumeContext';
import TechnicalAuthorityTemplate from '../templates/TechnicalAuthorityTemplate';
import ModernTemplate from '../templates/ModernTemplate';

export default function ResumePreview() {
  const { resumeData, zoomLevel } = useResume();
  const { templateId } = resumeData;

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern-clean':
        return <ModernTemplate data={resumeData} />;
      case 'technical-authority':
      default:
        return <TechnicalAuthorityTemplate data={resumeData} />;
    }
  };

  const scale = zoomLevel / 100;

  return (
    <div className="preview-container">
      <div 
        className="preview-scaler"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out'
        }}
      >
        <div id="resume-printable-area" className="a4-sheet">
          {renderTemplate()}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .preview-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          min-height: 100%;
          padding: 24px 16px 80px 16px;
          overflow-y: auto;
          background-color: var(--color-surface-subtle);
        }

        .preview-scaler {
          display: flex;
          justify-content: center;
        }

        .a4-sheet {
          width: 794px;
          min-height: 1123px;
          background-color: #ffffff;
          box-shadow: var(--shadow-resume);
          border-radius: 2px;
          position: relative;
          box-sizing: border-box;
          transition: box-shadow 0.2s ease;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          #resume-printable-area, #resume-printable-area * {
            visibility: visible;
          }
          #resume-printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
        }
      `}} />
    </div>
  );
}
