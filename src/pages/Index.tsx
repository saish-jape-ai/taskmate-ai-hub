
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AreaChart, Users, Settings, Info } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally: redirect authenticated users to dashboard.
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bloom-blue/30 to-bloom-purple/10">
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-20">
        {/* Hero */}
        <header className="flex flex-col items-center md:flex-row md:justify-between mb-8">
          <div className="flex items-center space-x-2">
            <AreaChart className="h-8 w-8 text-bloom-purple" />
            <span className="text-2xl font-bold">BloomTeam</span>
          </div>
          <Button onClick={() => navigate('/login')} variant="outline" className="mt-6 md:mt-0">
            Sign In
          </Button>
        </header>
        <main className="flex flex-col md:flex-row items-start md:gap-16">
          {/* Left: About Project */}
          <section className="md:w-2/3 space-y-7">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              AI-Powered <span className="text-bloom-purple">Team Management</span> & Performance
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-6">
              Optimize productivity and performance using intelligent task management, AI-driven analytics, notifications, and a robust chat system.
            </p>
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold mb-3">How to Use BloomTeam</h2>
              <ol className="list-decimal pl-7 space-y-2 text-base">
                <li>Sign in as Super Admin, Team Leader, or Employee.</li>
                <li>Super Admins access all teams, analytics, and system settings.</li>
                <li>Team Leaders create tasks with AI help, assign members, and monitor team performance.</li>
                <li>Employees view tasks, chat, receive notifications, and interact with their AI assistant.</li>
                <li>All users can track progress, chat, and receive AI-driven feedback and suggestions.</li>
              </ol>
            </div>
            <div className="space-y-3 mt-7">
              <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc pl-7 space-y-2">
                <li>AI-generated task creation, explanations, & performance ratings</li>
                <li>Role-based dashboards (Employee, Team Leader, Super Admin)</li>
                <li>Real-time notifications for tasks and messages</li>
                <li>Team comparison analytics, growth trends, and performance tracking</li>
                <li>Secure, role-based authentication</li>
                <li>Personal AI assistant/chatbot for every employee</li>
                <li>Group and private chat with tagging</li>
                <li>Settings page for user preferences</li>
                <li>Future: Voice & video calling features</li>
              </ul>
            </div>
          </section>
          {/* Right: Dashboard Preview & Links */}
          <section className="md:w-1/3 mt-12 md:mt-0 flex flex-col gap-8">
            <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 p-5">
              <img 
                src="https://placehold.co/600x400/f5f7ff/9b87f5?text=BloomTeam+Dashboard&font=montserrat" 
                alt="Dashboard preview" 
                className="rounded-lg mb-3"
              />
              <Button size="lg" className="w-full bg-bloom-purple mt-2"
                onClick={() => navigate('/login')}
              >Try Live Demo</Button>
            </div>
            <div className="rounded-lg bg-bloom-purple/10 px-4 py-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 font-semibold text-bloom-purple text-lg">
                <Info className="h-6 w-6" /> Project Overview
              </div>
              <div className="text-sm text-muted-foreground">
                BloomTeam is a unified platform for team management, analytics, and communication powered by AI.
                It lets you <b>organize teams</b>, <b>assign & track tasks</b>, <b>enjoy intelligent suggestions</b>, 
                and <b>compare performance</b>—all with a beautiful, role-aware interface. 
              </div>
              <div className="text-xs text-gray-500 pt-2">
                Designed for modern organizations who care about productivity & growth.
              </div>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-900 shadow px-4 py-5">
              <div className="flex items-center gap-3 font-semibold text-md mb-2">
                <Users className="h-5 w-5 text-bloom-purple" />
                User Roles
              </div>
              <ul className="list-disc ml-7 text-sm">
                <li><b>Super Admin:</b> Full visibility for all teams, analytics, and settings.</li>
                <li><b>Team Leader:</b> Create/assign tasks, manage members, track team stats, chat.</li>
                <li><b>Employee:</b> Work on assigned tasks, get feedback, notifications, and chat.</li>
              </ul>
            </div>
          </section>
        </main>
        <section className="mt-20 px-1 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Project Workflow & Future Plans</h2>
          <div className="space-y-5 text-base text-muted-foreground">
            <p>
              <b>AI Integration:</b> From intelligent task suggestions to evaluating performance, AI drives smart productivity at BloomTeam.
            </p>
            <p>
              <b>Notifications:</b> Never miss a deadline or a message—get rapid updates for key events.
            </p>
            <p>
              <b>Performance Tracking:</b> Track your progress over time, compare with teammates, and visualize team growth.
            </p>
            <p>
              <b>Security & Roles:</b> All content is securely tailored to your organization, with specific access per role.
            </p>
            <p>
              <b>Coming Soon:</b> Voice and video calls, extended integrations, and advanced analytics dashboards.
            </p>
          </div>
        </section>
        <footer className="text-center text-xs text-muted-foreground py-6 mt-12">
          © 2025 BloomTeam. For modern teams.
        </footer>
      </div>
    </div>
  );
};

export default Index;

