const API_BASE_URL = 'http://localhost:8000';

function getAuthHeaders() {
  const token = localStorage.getItem('resumepro_jwt_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Request a 6-digit OTP for passwordless login
 */
export async function sendOtp(email) {
  const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || 'Failed to send OTP code');
  }

  return await response.json();
}

/**
 * Verifies 6-digit OTP and returns signed JWT access token
 */
export async function verifyOtp(email, otp, name = '') {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp, name })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || 'Invalid or expired verification code');
  }

  return await response.json();
}

/**
 * Validates current JWT session
 */
export async function getCurrentUser(token) {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Session expired');
  }

  return await response.json();
}

/**
 * Notifies backend that user completed the onboarding tutorial
 */
export async function markTutorialCompletedApi(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/tutorial-completed`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  } catch (err) {
    console.warn('Failed to sync tutorial completion to server', err);
    return { success: false };
  }
}

/**
 * Uploads a .pdf or .docx resume file and extracts structured JSON.
 */
export async function parseResumeFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('resumepro_jwt_token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/parse/file`, {
    method: 'POST',
    headers,
    body: formData
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || 'Failed to parse resume file');
  }

  return await response.json();
}

/**
 * Sends current resume data to backend and downloads formatted .docx file.
 */
export async function downloadDocxResume(resumeData) {
  const response = await fetch(`${API_BASE_URL}/api/export/docx`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(resumeData)
  });

  if (!response.ok) {
    throw new Error('Failed to generate Word document');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(resumeData.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_')}_CV.docx`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

/**
 * Save resume to backend database
 */
export async function saveResumeToCloud(resumeData) {
  const response = await fetch(`${API_BASE_URL}/api/resumes`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(resumeData)
  });

  if (!response.ok) {
    throw new Error('Failed to save resume to cloud');
  }

  return await response.json();
}
