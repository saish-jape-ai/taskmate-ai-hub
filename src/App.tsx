
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "sonner";

import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Teams from './pages/Teams';
import TeamMembers from './pages/TeamMembers';
import AddTeamMember from './pages/AddTeamMember';
import MemberProfile from './pages/MemberProfile';
import EOD from './pages/EOD';
import Reminders from './pages/Reminders';

import { SidebarProvider } from './components/ui/sidebar';

import './App.css';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <Router>
          <SidebarProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/team-members" element={<TeamMembers />} />
              <Route path="/add-team-member" element={<AddTeamMember />} />
              <Route path="/member-profile/:id" element={<MemberProfile />} />
              <Route path="/eod" element={<EOD />} />
              <Route path="/reminders" element={<Reminders />} />
            </Routes>
          </SidebarProvider>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
