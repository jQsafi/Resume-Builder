import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialResumeData } from '../data/initialResume';
import { markTutorialCompletedApi } from '../services/api';

const ResumeContext = createContext();

const LOCAL_STORAGE_KEY = 'resumepro_current_data';
const RESUME_LIST_KEY = 'resumepro_saved_resumes';

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialResumeData;
    } catch (e) {
      console.error('Failed to load resume from localStorage', e);
      return initialResumeData;
    }
  });

  const [savedResumes, setSavedResumes] = useState(() => {
    try {
      const saved = localStorage.getItem(RESUME_LIST_KEY);
      return saved ? JSON.parse(saved) : [initialResumeData];
    } catch (e) {
      return [initialResumeData];
    }
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [zoomLevel, setZoomLevel] = useState(100); // 100% default
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // Authentication & JWT State
  const [token, setToken] = useState(() => {
    return localStorage.getItem('resumepro_jwt_token') || null;
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('resumepro_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!token && !!user;

  const loginWithToken = (jwtToken, userPayload, isNewUser = false) => {
    setToken(jwtToken);
    setUser(userPayload);
    localStorage.setItem('resumepro_jwt_token', jwtToken);
    localStorage.setItem('resumepro_user', JSON.stringify(userPayload));
    setIsAuthModalOpen(false);

    // If new user or tutorial not completed, auto trigger onboarding tutorial
    if (isNewUser || userPayload?.has_completed_tutorial === false) {
      setIsTutorialOpen(true);
    }
  };

  const completeTutorial = () => {
    setIsTutorialOpen(false);
    if (user) {
      const updatedUser = { ...user, has_completed_tutorial: true };
      setUser(updatedUser);
      localStorage.setItem('resumepro_user', JSON.stringify(updatedUser));
    }
    if (token) {
      markTutorialCompletedApi(token);
    }
  };

  const startTutorial = () => {
    setIsTutorialOpen(true);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsTutorialOpen(false);
    localStorage.removeItem('resumepro_jwt_token');
    localStorage.removeItem('resumepro_user');
  };

  // Sync current resume to localStorage on edit
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.error('Could not save to localStorage', e);
    }
  }, [resumeData]);

  // Sync resume list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(RESUME_LIST_KEY, JSON.stringify(savedResumes));
    } catch (e) {
      console.error('Could not save resume list to localStorage', e);
    }
  }, [savedResumes]);

  // Update Personal Info
  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Update Summary
  const updateSummary = (value) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      summary: value
    }));
  };

  // Update Skills category
  const updateSkillCategory = (category, skillsArray) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      skills: {
        ...prev.skills,
        [category]: skillsArray
      }
    }));
  };

  // Add Skill Item
  const addSkillItem = (category, skillText) => {
    if (!skillText.trim()) return;
    setResumeData((prev) => {
      const currentList = prev.skills[category] || [];
      if (currentList.includes(skillText.trim())) return prev;
      return {
        ...prev,
        lastModified: new Date().toISOString(),
        skills: {
          ...prev.skills,
          [category]: [...currentList, skillText.trim()]
        }
      };
    });
  };

  // Remove Skill Item
  const removeSkillItem = (category, skillText) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      skills: {
        ...prev.skills,
        [category]: (prev.skills[category] || []).filter((s) => s !== skillText)
      }
    }));
  };

  // Experience Handlers
  const addExperience = () => {
    const newEntry = {
      id: 'exp-' + Date.now(),
      role: 'Software Engineer',
      company: 'Company Name',
      location: 'City, Country',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      highlights: ['Key accomplishment or impact bullet point.']
    };
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      experience: [newEntry, ...prev.experience]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const deleteExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      experience: prev.experience.filter((exp) => exp.id !== id)
    }));
  };

  // Education Handlers
  const addEducation = () => {
    const newEntry = {
      id: 'edu-' + Date.now(),
      degree: 'B.S. in Computer Science',
      institution: 'University Name',
      location: 'City, Country',
      startDate: '2018',
      endDate: '2022',
      details: 'Relevant coursework & achievements.'
    };
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      education: [newEntry, ...prev.education]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const deleteEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      education: prev.education.filter((edu) => edu.id !== id)
    }));
  };

  // Projects Handlers
  const addProject = () => {
    const newEntry = {
      id: 'proj-' + Date.now(),
      name: 'Project Title',
      techStack: 'React, Node.js',
      link: 'github.com/example/project',
      description: 'Describe key impact and technical implementation.'
    };
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      projects: [...prev.projects, newEntry]
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const deleteProject = (id) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      projects: prev.projects.filter((proj) => proj.id !== id)
    }));
  };

  // Change Template & Color
  const setTemplateId = (id) => {
    setResumeData((prev) => ({ ...prev, templateId: id }));
  };

  const setThemeColor = (color) => {
    setResumeData((prev) => ({ ...prev, themeColor: color }));
  };

  // Reset to initial
  const resetToSample = () => {
    setResumeData(initialResumeData);
  };

  // Save as new version to Dashboard
  const saveCurrentResumeToDashboard = (title) => {
    const newResume = {
      ...resumeData,
      id: 'resume-' + Date.now(),
      title: title || resumeData.title || 'My Resume',
      lastModified: new Date().toISOString()
    };
    setSavedResumes((prev) => [newResume, ...prev]);
    return newResume;
  };

  // Load a resume from dashboard
  const loadResume = (resume) => {
    setResumeData(resume);
  };

  // Delete resume from dashboard
  const deleteSavedResume = (id) => {
    setSavedResumes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        savedResumes,
        activeTab,
        setActiveTab,
        zoomLevel,
        setZoomLevel,
        isExportModalOpen,
        setIsExportModalOpen,
        isTemplateModalOpen,
        setIsTemplateModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isTutorialOpen,
        setIsTutorialOpen,
        completeTutorial,
        startTutorial,
        user,
        token,
        isAuthenticated,
        loginWithToken,
        logout,
        updatePersonalInfo,
        updateSummary,
        updateSkillCategory,
        addSkillItem,
        removeSkillItem,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addProject,
        updateProject,
        deleteProject,
        setTemplateId,
        setThemeColor,
        resetToSample,
        saveCurrentResumeToDashboard,
        loadResume,
        deleteSavedResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
