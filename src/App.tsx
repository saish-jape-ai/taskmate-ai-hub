import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Teams from './pages/Teams';
import TeamMembers from './pages/TeamMembers';
import MemberProfile from './pages/MemberProfile';
import AddTeamMember from './pages/AddTeamMember';
import CreateTeam from './pages/CreateTeam';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';
import EOD from './pages/EOD';
import AiChat from './pages/AiChat';
import Reminders from './pages/Reminders';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Index from './pages/Index';
import KnowledgeHub from './pages/KnowledgeHub';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-taskmate-purple"></span>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Index />} />
      <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={currentUser ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/*" element={currentUser ? <AuthenticatedRoutes /> : <Navigate to="/login" />} />
    </Routes>
  );
};

// Update the AuthenticatedRoutes component to include the Knowledge Hub route
const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/team-members" element={<TeamMembers />} />
      <Route path="/member/:id" element={<MemberProfile />} />
      <Route path="/add-team-member" element={<AddTeamMember />} />
      <Route path="/create-team" element={<CreateTeam />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/eod" element={<EOD />} />
      <Route path="/ai-chat" element={<AiChat />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/knowledge-hub" element={<KnowledgeHub />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
