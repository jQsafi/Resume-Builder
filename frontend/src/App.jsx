import React, { useState } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import LoggedOutHeader from './components/navigation/LoggedOutHeader';
import LoggedInHeader from './components/navigation/LoggedInHeader';
import LoggedOutFooter from './components/navigation/LoggedOutFooter';
import LoggedInFooter from './components/navigation/LoggedInFooter';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import TemplatesPage from './pages/TemplatesPage';
import DashboardPage from './pages/DashboardPage';
import TemplateModal from './components/modals/TemplateModal';
import ExportModal from './components/modals/ExportModal';
import AuthModal from './components/modals/AuthModal';

function MainAppLayout() {
  const { isAuthenticated } = useResume();
  const [activePage, setActivePage] = useState('home'); // 'home' | 'editor' | 'templates' | 'dashboard'

  return (
    <div className="app-container">
      {/* Dynamic Header: Logged Out vs. Signed In */}
      {isAuthenticated ? (
        <LoggedInHeader activePage={activePage} setActivePage={setActivePage} />
      ) : (
        <LoggedOutHeader setActivePage={setActivePage} />
      )}

      {/* Main Routed Content */}
      <main className="app-main-content">
        {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
        {activePage === 'editor' && <EditorPage />}
        {activePage === 'templates' && <TemplatesPage setActivePage={setActivePage} />}
        {activePage === 'dashboard' && <DashboardPage setActivePage={setActivePage} />}
      </main>

      {/* Dynamic Footer: Logged Out vs. Signed In */}
      {isAuthenticated ? (
        <LoggedInFooter setActivePage={setActivePage} />
      ) : (
        <LoggedOutFooter setActivePage={setActivePage} />
      )}

      {/* Modals */}
      <TemplateModal />
      <ExportModal />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <MainAppLayout />
      <style dangerouslySetInnerHTML={{ __html: `
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .app-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      `}} />
    </ResumeProvider>
  );
}
