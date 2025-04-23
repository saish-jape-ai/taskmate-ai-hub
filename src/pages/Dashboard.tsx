
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/AppLayout';
import EmployeeDashboard from '@/components/dashboards/EmployeeDashboard';
import TeamLeaderDashboard from '@/components/dashboards/TeamLeaderDashboard';
import SuperAdminDashboard from '@/components/dashboards/SuperAdminDashboard';

const Dashboard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'employee':
        return <EmployeeDashboard />;
      case 'team_leader':
        return <TeamLeaderDashboard />;
      case 'super_admin':
        return <SuperAdminDashboard />;
      default:
        return <div>Unknown user role</div>;
    }
  };

  return <AppLayout title="Dashboard">{renderDashboard()}</AppLayout>;
};

export default Dashboard;
