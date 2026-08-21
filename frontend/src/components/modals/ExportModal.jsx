import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { X, Download, Printer, FileCode, FileText, Check, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { downloadDocxResume } from '../../services/api';

export default function ExportModal() {
  const {
    isExportModalOpen,
    setIsExportModalOpen,
    resumeData
  } = useResume();

  const [isExporting, setIsExporting] = useState(false);
  const [isWordExporting, setIsWordExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [wordSuccess, setWordSuccess] = useState(false);

  if (!isExportModalOpen) return null;

  // Direct Browser Print (Pixel Perfect PDF via browser print dialogue)
  const handlePrint = () => {
    window.print();
    setIsExportModalOpen(false);
  };

  // Direct Client-Side PDF Download via html2canvas & jsPDF
  const handleDownloadPDF = async () => {
    try {
      setIsExporting(true);
      const element = document.getElementById('resume-printable-area');
      if (!element) {
        alert('Resume element not found');
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2, // 2x resolution for crisp text
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      const filename = `${(resumeData.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_')}_CV.pdf`;
      pdf.save(filename);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('PDF export failed', err);
      // Fallback to print
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // Backend DOCX Download
  const handleDownloadWord = async () => {
    try {
      setIsWordExporting(true);
      await downloadDocxResume(resumeData);
      setWordSuccess(true);
      setTimeout(() => setWordSuccess(false), 3000);
    } catch (err) {
      alert(`Word export failed: ${err.message}`);
    } finally {
      setIsWordExporting(false);
    }
  };

  // Export JSON Schema Backup
  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${(resumeData.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_')}_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content export-modal animate-fade-in">
        <div className="modal-header">
          <div>
            <h2>Export & Download Resume</h2>
            <p className="modal-subtitle">
              Choose your preferred format for job applications or archival.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsExportModalOpen(false)}
            className="btn btn-ghost btn-sm"
          >
            <X size={18} />
          </button>
        </div>

        <div className="export-options-list">
          {/* PDF Direct Download */}
          <div className="export-option-card" onClick={handleDownloadPDF}>
            <div className="export-icon-box pdf-icon">
              <Download size={22} />
            </div>
            <div className="export-option-details">
              <h4>Download High-Resolution PDF</h4>
              <p>Standard vector layout formatted for ATS scanners and email applications.</p>
            </div>
            <button className="btn btn-primary btn-sm" disabled={isExporting}>
              {isExporting ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Rendering...
                </>
              ) : downloadSuccess ? (
                <>
                  <Check size={13} /> Saved!
                </>
              ) : (
                'Download .PDF'
              )}
            </button>
          </div>

          {/* Browser Print Dialog */}
          <div className="export-option-card" onClick={handlePrint}>
            <div className="export-icon-box print-icon">
              <Printer size={22} />
            </div>
            <div className="export-option-details">
              <h4>System Print / Save as PDF</h4>
              <p>Uses your browser's native print engine with 100% vector typography accuracy.</p>
            </div>
            <button className="btn btn-outline btn-sm">
              Print / Save
            </button>
          </div>

          {/* Word Format Download */}
          <div className="export-option-card" onClick={handleDownloadWord}>
            <div className="export-icon-box word-icon">
              <FileText size={22} />
            </div>
            <div className="export-option-details">
              <h4>Microsoft Word (.docx)</h4>
              <p>Formatted editable Word document generated natively by FastAPI backend.</p>
            </div>
            <button className="btn btn-outline btn-sm text-secondary" disabled={isWordExporting}>
              {isWordExporting ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Generating...
                </>
              ) : wordSuccess ? (
                <>
                  <Check size={13} /> Downloaded!
                </>
              ) : (
                'Download .DOCX'
              )}
            </button>
          </div>

          {/* JSON Backup */}
          <div className="export-option-card" onClick={handleDownloadJSON}>
            <div className="export-icon-box json-icon">
              <FileCode size={22} />
            </div>
            <div className="export-option-details">
              <h4>Export JSON Schema</h4>
              <p>Download the raw structured data backup to restore anytime.</p>
            </div>
            <button className="btn btn-outline btn-sm">
              Download JSON
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={() => setIsExportModalOpen(false)}
            className="btn btn-outline"
          >
            Close
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .export-modal {
          max-width: 640px;
        }

        .export-options-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 24px;
        }

        .export-option-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background-color: var(--color-surface);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .export-option-card:hover {
          border-color: var(--color-primary);
          background-color: var(--color-surface-subtle);
          transform: translateX(2px);
        }

        .export-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pdf-icon { background: var(--color-primary-light); color: var(--color-primary); }
        .print-icon { background: var(--color-surface-muted); color: var(--color-text-primary); }
        .word-icon { background: var(--color-secondary-light); color: var(--color-secondary); }
        .json-icon { background: #fef3c7; color: #b45309; }

        .export-option-details {
          flex: 1;
        }

        .export-option-details h4 {
          font-size: 0.95rem;
          margin-bottom: 2px;
        }

        .export-option-details p {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
