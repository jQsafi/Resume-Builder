import React, { useState, useRef, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { sendOtp, verifyOtp } from '../../services/api';
import { X, Mail, ShieldCheck, ArrowRight, ArrowLeft, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithToken } = useResume();

  // Step state: 1 = Email Input, 2 = OTP Verification
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [devOtpHint, setDevOtpHint] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(60);

  const digitRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Reset state on open/close
  useEffect(() => {
    if (isAuthModalOpen) {
      setStep(1);
      setEmail('shafayat.masum@example.com');
      setOtpDigits(['', '', '', '', '', '']);
      setDevOtpHint('');
      setErrorMessage('');
      setCountdown(60);
    }
  }, [isAuthModalOpen]);

  // Resend Countdown
  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  // Step 1: Request OTP
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      const res = await sendOtp(email.trim());
      if (res.dev_otp) {
        setDevOtpHint(res.dev_otp);
      }
      setStep(2);
      setCountdown(60);
      setTimeout(() => {
        if (digitRefs[0].current) digitRefs[0].current.focus();
      }, 100);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to send verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle 6-digit OTP Inputs
  const handleDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    if (value && index < 5) {
      digitRefs[index + 1].current?.focus();
    }

    const fullCode = newDigits.join('');
    if (fullCode.length === 6 && !newDigits.includes('')) {
      handleVerifyOtp(fullCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      digitRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtpDigits(digits);
      digitRefs[5].current?.focus();
      handleVerifyOtp(pasteData);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (codeToVerify) => {
    const code = codeToVerify || otpDigits.join('');
    if (code.length !== 6) {
      setErrorMessage('Please enter all 6 digits.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      const res = await verifyOtp(email.trim(), code);
      loginWithToken(res.token, res.user);
    } catch (err) {
      setErrorMessage(err.message || 'Invalid or expired verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click Demo Login
  const handleQuickDemo = async () => {
    setEmail('shafayat.masum@example.com');
    try {
      setIsLoading(true);
      setErrorMessage('');
      const res = await verifyOtp('shafayat.masum@example.com', '123456');
      loginWithToken(res.token, res.user);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-content auth-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-center gap-2">
            <div className="auth-icon-badge">
              <ShieldCheck size={18} color="#00685f" />
            </div>
            <div>
              <h3>{step === 1 ? 'Passwordless Sign In' : 'Enter Verification Code'}</h3>
              <p className="modal-subtitle">
                {step === 1 
                  ? 'We will send a 6-digit one-time code to your email.' 
                  : `Enter the 6-digit code sent to ${email}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="btn btn-ghost btn-sm"
          >
            <X size={18} />
          </button>
        </div>

        {errorMessage && (
          <div className="auth-error-banner animate-fade-in">
            <AlertCircle size={14} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: EMAIL ENTRY */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="auth-form-body">
            <div className="form-group">
              <label className="form-label">Work or Personal Email</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  className="form-input with-icon"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending Code...
                </>
              ) : (
                <>
                  Send 6-Digit Code <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="auth-divider">
              <span>OR 1-CLICK INSTANT DEMO</span>
            </div>

            <button
              type="button"
              onClick={handleQuickDemo}
              className="btn btn-outline w-full text-primary"
              disabled={isLoading}
            >
              <Sparkles size={14} /> Instant Demo Sign-In (Shafayat Masum)
            </button>
          </form>
        )}

        {/* STEP 2: 6-DIGIT OTP ENTRY */}
        {step === 2 && (
          <div className="auth-form-body">
            {devOtpHint && (
              <div className="dev-hint-pill animate-fade-in">
                <span>🔐 Dev Test Code: <strong>{devOtpHint}</strong> (or master <strong>123456</strong>)</span>
              </div>
            )}

            <div className="otp-box-group">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={digitRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`otp-digit-input ${digit ? 'filled' : ''}`}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleVerify()}
              className="btn btn-primary w-full mt-3"
              disabled={isLoading || otpDigits.some(d => !d)}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Verifying JWT...
                </>
              ) : (
                <>
                  Verify Code & Continue <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="otp-footer-row">
              <button
                type="button"
                className="text-btn"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={13} /> Change Email
              </button>

              <button
                type="button"
                className="text-btn"
                onClick={handleSendOtp}
                disabled={countdown > 0 || isLoading}
              >
                {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend Code'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-modal {
          max-width: 440px;
        }

        .auth-icon-badge {
          width: 36px;
          height: 36px;
          background: var(--color-primary-light);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .auth-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: var(--color-danger-light);
          color: var(--color-danger);
          font-size: 0.8rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(220, 38, 38, 0.2);
        }

        .auth-form-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--color-text-tertiary);
        }

        .form-input.with-icon {
          padding-left: 36px;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 10px 0 4px 0;
          color: var(--color-text-tertiary);
          font-size: 0.7rem;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }

        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--color-border);
        }

        .auth-divider span {
          padding: 0 10px;
        }

        .dev-hint-pill {
          background-color: var(--color-primary-light);
          border: 1px solid rgba(0, 104, 95, 0.25);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--color-primary);
          text-align: center;
          font-family: var(--font-mono);
        }

        .otp-box-group {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin: 10px 0;
        }

        .otp-digit-input {
          width: 50px;
          height: 56px;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-md);
          background-color: var(--color-surface-subtle);
          font-family: var(--font-mono);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-text-primary);
          text-align: center;
          transition: all var(--transition-fast);
        }

        .otp-digit-input:focus {
          outline: none;
          border-color: var(--color-primary);
          background-color: #ffffff;
          box-shadow: 0 0 0 3px var(--color-primary-glow);
        }

        .otp-digit-input.filled {
          border-color: var(--color-primary);
          background-color: #ffffff;
        }

        .otp-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .text-btn {
          border: none;
          background: transparent;
          color: var(--color-text-secondary);
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .text-btn:hover:not(:disabled) {
          color: var(--color-primary);
        }

        .text-btn:disabled {
          color: var(--color-text-tertiary);
          cursor: not-allowed;
        }
      `}} />
    </div>
  );
}
