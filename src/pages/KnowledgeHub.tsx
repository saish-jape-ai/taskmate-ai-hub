
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';  // Changed from named import to default import
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KnowledgeCard } from '@/components/knowledge/KnowledgeCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  ListTodo, 
  MessageSquare, 
  Users, 
  CalendarDays, 
  Bot, 
  Bell, 
  FileText,
  BarChart,
  FileHeart, 
  Download 
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const KnowledgeHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AppLayout>
      <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">📘 Project Overview</h1>
            <p className="text-muted-foreground">Complete guide to the TaskMate application</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleTheme}
              className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="roles">Role-Based Guide</TabsTrigger>
            <TabsTrigger value="ai">AI Features</TabsTrigger>
            <TabsTrigger value="quickstart">Quick Start Guide</TabsTrigger>
          </TabsList>
          
          <ScrollArea className={`h-[calc(100vh-200px)] rounded-md border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} p-4`}>
            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Welcome to TaskMate</h2>
                <p className="mb-4">
                  TaskMate is a comprehensive AI-powered team management platform designed to streamline workflow, 
                  enhance collaboration, and boost productivity across organizations of all sizes.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <KnowledgeCard 
                    title="Platform Overview" 
                    description="Understand the core components of TaskMate"
                    icon={<LayoutDashboard className="h-5 w-5" />}
                    variant="highlight"
                  >
                    <p>
                      TaskMate combines task management, team collaboration, performance analytics, 
                      and AI assistance in one unified platform. The system adapts to different roles, 
                      providing tailored experiences for Super Admins, Team Leaders, and Employees.
                    </p>
                    <div className="mt-4 p-3 bg-blue-50 rounded-md dark:bg-blue-950">
                      <p className="text-sm font-medium">Key Components:</p>
                      <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                        <li>Task assignment and tracking</li>
                        <li>Team communication channels</li>
                        <li>End-of-Day (EOD) reporting</li>
                        <li>Performance analytics and insights</li>
                        <li>AI-powered assistance and productivity tools</li>
                      </ul>
                    </div>
                  </KnowledgeCard>
                  
                  <KnowledgeCard 
                    title="How Data Flows" 
                    description="Understand how information moves through TaskMate"
                    icon={<Bot className="h-5 w-5" />}
                  >
                    <div className="border rounded p-3 bg-gray-50 dark:bg-gray-800">
                      <p className="text-center font-medium mb-2">TaskMate Data Flow</p>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="bg-blue-100 dark:bg-blue-900 rounded p-2 w-full text-center">
                          Task Creation &amp; Assignment
                        </div>
                        <div className="text-center">↓</div>
                        <div className="bg-green-100 dark:bg-green-900 rounded p-2 w-full text-center">
                          Work Tracking &amp; Progress Updates
                        </div>
                        <div className="text-center">↓</div>
                        <div className="bg-purple-100 dark:bg-purple-900 rounded p-2 w-full text-center">
                          EOD Reporting &amp; Documentation
                        </div>
                        <div className="text-center">↓</div>
                        <div className="bg-amber-100 dark:bg-amber-900 rounded p-2 w-full text-center">
                          Analytics &amp; AI-Powered Insights
                        </div>
                        <div className="text-center">↓</div>
                        <div className="bg-red-100 dark:bg-red-900 rounded p-2 w-full text-center">
                          Performance Review &amp; Optimization
                        </div>
                      </div>
                    </div>
                  </KnowledgeCard>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="modules" className="space-y-8">
              <h2 className="text-2xl font-semibold mb-4">Application Modules</h2>
              <p className="mb-6">TaskMate consists of several interconnected modules that work together to provide a complete team management solution:</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <KnowledgeCard 
                  title="Dashboard" 
                  icon={<LayoutDashboard className="h-5 w-5" />}
                  description="Your productivity command center"
                >
                  <div className="space-y-3">
                    <p><strong>Purpose:</strong> Provides an overview of tasks, activities, and key metrics.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Role-based dashboard views</li>
                      <li>Activity summaries and notifications</li>
                      <li>Performance metrics and charts</li>
                      <li>Quick access to critical tasks</li>
                    </ul>
                    <p><strong>Integration:</strong> Connected to all other modules for data aggregation.</p>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="Tasks" 
                  icon={<ListTodo className="h-5 w-5" />}
                  description="Manage and track work items"
                >
                  <div className="space-y-3">
                    <p><strong>Purpose:</strong> Create, assign, and track tasks across teams.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Task creation and assignment</li>
                      <li>Priority levels and deadlines</li>
                      <li>Status tracking and updates</li>
                      <li>AI-powered task suggestions</li>
                    </ul>
                    <p><strong>Integration:</strong> Linked with Calendar, EOD, and Analytics modules.</p>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="Chat" 
                  icon={<MessageSquare className="h-5 w-5" />}
                  description="Team communication platform"
                >
                  <div className="space-y-3">
                    <p><strong>Purpose:</strong> Facilitate real-time communication between team members.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Individual and group messaging</li>
                      <li>File sharing and collaboration</li>
                      <li>Message search and history</li>
                      <li>Integration with tasks and projects</li>
                    </ul>
                    <p><strong>Integration:</strong> Connected with Tasks for context-based discussions.</p>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="Calendar" 
                  icon={<CalendarDays className="h-5 w-5" />}
                  description="Schedule and time management"
                >
                  <div className="space-y-3">
                    <p><strong>Purpose:</strong> Track deadlines, meetings, and work schedules.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Multiple calendar views (day, week, month)</li>
                      <li>Task deadline integration</li>
                      <li>Time tracking capabilities</li>
                      <li>AI-generated daily summaries</li>
                    </ul>
                    <p><strong>Integration:</strong> Works with Tasks, EOD, and Reminders modules.</p>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="EOD Reports" 
                  icon={<FileText className="h-5 w-5" />}
                  description="End-of-day activity documentation"
                >
                  <div className="space-y-3">
                    <p><strong>Purpose:</strong> Document daily accomplishments and plan for the next day.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Structured reporting templates</li>
                      <li>Accomplishment tracking</li>
                      <li>Blockers and challenges documentation</li>
                      <li>Next-day planning assistance</li>
                    </ul>
                    <p><strong>Integration:</strong> Data feeds into Analytics and Calendar modules.</p>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="AI Assistant" 
                  icon={<Bot className="h-5 w-5" />}
                  description="Intelligent productivity enhancement"
                >
                  <div className="space-y-3">
                    <p><strong>Purpose:</strong> Provide AI-powered assistance across the platform.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Smart task suggestions</li>
                      <li>EOD summary generation</li>
                      <li>Performance insights and tips</li>
                      <li>Natural language interface</li>
                    </ul>
                    <p><strong>Integration:</strong> Integrates with all modules to provide contextual AI assistance.</p>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="Analytics" 
                  icon={<BarChart className="h-5 w-5" />}
                  description="Performance metrics and insights"
                >
                  <div className="space-y-3">
                    <p><strong>Purpose:</strong> Track and analyze productivity and performance metrics.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Individual and team performance dashboards</li>
                      <li>Task completion analytics</li>
                      <li>Time tracking and utilization metrics</li>
                      <li>AI-powered performance insights</li>
                    </ul>
                    <p><strong>Integration:</strong> Pulls data from Tasks, EOD, and Calendar modules.</p>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="Reminders" 
                  icon={<Bell className="h-5 w-5" />}
                  description="Automated notifications and alerts"
                >
                  <div className="space-y-3">
                    <p><strong>Purpose:</strong> Ensure timely completion of tasks and deadlines.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Deadline notifications</li>
                      <li>EOD report reminders</li>
                      <li>Task status update prompts</li>
                      <li>Smart reminder scheduling</li>
                    </ul>
                    <p><strong>Integration:</strong> Works with Tasks, Calendar, and EOD modules.</p>
                  </div>
                </KnowledgeCard>
              </div>
            </TabsContent>
            
            <TabsContent value="roles" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Role-Based Guide</h2>
              <p className="mb-6">
                TaskMate provides different experiences based on user roles, ensuring everyone 
                has access to the tools they need while maintaining appropriate permissions:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Super Admin
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">Complete system oversight and management</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Access to:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                        <li>All TaskMate modules and features</li>
                        <li>Organization-wide analytics</li>
                        <li>Team creation and management</li>
                        <li>User administration</li>
                        <li>System configuration</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">Key responsibilities:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                        <li>Create and manage teams</li>
                        <li>Assign team leaders</li>
                        <li>Monitor organization-wide performance</li>
                        <li>Configure system settings</li>
                      </ul>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Leader
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">Team management and oversight</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Access to:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                        <li>Team member management</li>
                        <li>Team analytics and reports</li>
                        <li>Task creation and assignment</li>
                        <li>EOD review and feedback</li>
                        <li>Team reminders</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">Key responsibilities:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                        <li>Manage team members</li>
                        <li>Assign and track tasks</li>
                        <li>Review EOD reports</li>
                        <li>Provide feedback and guidance</li>
                        <li>Monitor team performance</li>
                      </ul>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Employee
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">Individual work management and reporting</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Access to:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                        <li>Personal task management</li>
                        <li>EOD report submission</li>
                        <li>Calendar and scheduling</li>
                        <li>AI Assistant</li>
                        <li>Individual analytics</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">Key responsibilities:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                        <li>Complete assigned tasks</li>
                        <li>Submit daily EOD reports</li>
                        <li>Track time and activities</li>
                        <li>Communicate with team members</li>
                        <li>Review personal performance</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Module Access by Role</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <th className="text-left p-3 border">Module</th>
                      <th className="text-left p-3 border">Super Admin</th>
                      <th className="text-left p-3 border">Team Leader</th>
                      <th className="text-left p-3 border">Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border">Dashboard</td>
                      <td className="p-3 border">Full access (organization-wide)</td>
                      <td className="p-3 border">Team-level access</td>
                      <td className="p-3 border">Personal view only</td>
                    </tr>
                    <tr className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                      <td className="p-3 border">Tasks</td>
                      <td className="p-3 border">Create, assign, view all</td>
                      <td className="p-3 border">Create, assign to team</td>
                      <td className="p-3 border">View assigned, update status</td>
                    </tr>
                    <tr>
                      <td className="p-3 border">Teams</td>
                      <td className="p-3 border">Create, manage all</td>
                      <td className="p-3 border">View own team</td>
                      <td className="p-3 border">View own team</td>
                    </tr>
                    <tr className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                      <td className="p-3 border">EOD</td>
                      <td className="p-3 border">View all, analytics</td>
                      <td className="p-3 border">Review team EODs</td>
                      <td className="p-3 border">Submit personal EOD</td>
                    </tr>
                    <tr>
                      <td className="p-3 border">Analytics</td>
                      <td className="p-3 border">Organization-wide insights</td>
                      <td className="p-3 border">Team analytics</td>
                      <td className="p-3 border">Personal analytics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">AI-Powered Features</h2>
              <p className="mb-6">
                TaskMate leverages artificial intelligence throughout the platform to enhance productivity, 
                provide insights, and automate routine tasks:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <KnowledgeCard 
                  title="Smart Task Generation" 
                  icon={<ListTodo className="h-5 w-5" />}
                  variant="highlight"
                >
                  <div className="space-y-3">
                    <p><strong>How it works:</strong> The AI analyzes past work patterns, team capabilities, and project requirements to suggest appropriate tasks.</p>
                    <p><strong>Benefits:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Reduces planning time for managers</li>
                      <li>Ensures balanced workload distribution</li>
                      <li>Identifies potential skill gaps</li>
                      <li>Improves resource allocation</li>
                    </ul>
                    <div className="mt-4 p-3 bg-purple-50 rounded-md dark:bg-purple-950">
                      <p className="text-sm italic">Example: "Based on the team's current workload and John's expertise, suggest assigning the database optimization task to him with a Thursday deadline."</p>
                    </div>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="EOD Analysis & Feedback" 
                  icon={<FileText className="h-5 w-5" />}
                  variant="highlight"
                >
                  <div className="space-y-3">
                    <p><strong>How it works:</strong> The AI reviews submitted EOD reports, extracts key information, and provides constructive feedback and insights.</p>
                    <p><strong>Benefits:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Identifies patterns in productivity</li>
                      <li>Highlights accomplishments and challenges</li>
                      <li>Suggests improvements for future work</li>
                      <li>Generates standardized summaries</li>
                    </ul>
                    <div className="mt-4 p-3 bg-purple-50 rounded-md dark:bg-purple-950">
                      <p className="text-sm italic">Example: "Your EOD shows you completed 3 major tasks today. AI analysis suggests you work best on creative tasks in the morning based on your completion patterns."</p>
                    </div>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="Performance Analytics" 
                  icon={<BarChart className="h-5 w-5" />}
                >
                  <div className="space-y-3">
                    <p><strong>How it works:</strong> AI analyzes productivity metrics, task completion rates, and work patterns to generate insights and optimization recommendations.</p>
                    <p><strong>Benefits:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Identifies productivity trends</li>
                      <li>Highlights strengths and improvement areas</li>
                      <li>Recommends workflow optimizations</li>
                      <li>Predicts potential bottlenecks</li>
                    </ul>
                    <div className="mt-4 p-3 bg-blue-50 rounded-md dark:bg-blue-950">
                      <p className="text-sm italic">Example: "Team performance analysis shows highest productivity on Tuesdays. Consider scheduling important kickoffs on this day for optimal results."</p>
                    </div>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="Smart Reminders" 
                  icon={<Bell className="h-5 w-5" />}
                >
                  <div className="space-y-3">
                    <p><strong>How it works:</strong> AI determines the optimal timing for reminders based on user behavior, task importance, and past response patterns.</p>
                    <p><strong>Benefits:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Reduces missed deadlines</li>
                      <li>Prevents notification fatigue</li>
                      <li>Prioritizes critical tasks</li>
                      <li>Adapts to individual work styles</li>
                    </ul>
                    <div className="mt-4 p-3 bg-blue-50 rounded-md dark:bg-blue-950">
                      <p className="text-sm italic">Example: "Based on your work patterns, you'll receive a reminder for the client presentation 3 hours before the deadline, which is when you typically finalize important tasks."</p>
                    </div>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="AI Assistant Chat" 
                  icon={<Bot className="h-5 w-5" />}
                >
                  <div className="space-y-3">
                    <p><strong>How it works:</strong> A natural language interface that allows users to interact with the system's AI capabilities through conversation.</p>
                    <p><strong>Benefits:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Provides on-demand assistance</li>
                      <li>Answers questions about work and tasks</li>
                      <li>Offers contextual suggestions</li>
                      <li>Simplifies complex system interactions</li>
                    </ul>
                    <div className="mt-4 p-3 bg-green-50 rounded-md dark:bg-green-950">
                      <p className="text-sm italic">Example: "What tasks should I prioritize today?" → "Based on deadlines and team dependencies, focus on the API documentation first, then the database schema review."</p>
                    </div>
                  </div>
                </KnowledgeCard>
                
                <KnowledgeCard 
                  title="Daily Summary Generation" 
                  icon={<CalendarDays className="h-5 w-5" />}
                >
                  <div className="space-y-3">
                    <p><strong>How it works:</strong> AI automatically aggregates daily activities, achievements, and planned tasks into a concise, actionable summary.</p>
                    <p><strong>Benefits:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Saves time on reporting</li>
                      <li>Ensures consistent documentation</li>
                      <li>Highlights key accomplishments</li>
                      <li>Identifies patterns and trends</li>
                    </ul>
                    <div className="mt-4 p-3 bg-green-50 rounded-md dark:bg-green-950">
                      <p className="text-sm italic">Example: "Today you completed 4 tasks (2 high priority), spent 3.5 hours on development, and have 2 pending code reviews for tomorrow. Overall productivity: Above average."</p>
                    </div>
                  </div>
                </KnowledgeCard>
              </div>
              
              <div className="mt-8 p-4 border rounded-md bg-blue-50 dark:bg-blue-900">
                <h3 className="text-xl font-semibold mb-3">How AI Integration Works</h3>
                <p className="mb-4">
                  TaskMate uses the Gemini API to power its AI capabilities, allowing for sophisticated 
                  natural language processing, pattern recognition, and predictive analytics:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Data Processing:</strong> The AI analyzes user inputs, task data, and historical patterns</li>
                  <li><strong>Contextual Understanding:</strong> Identifies relationships between data points and user intent</li>
                  <li><strong>Personalization:</strong> Adapts responses and suggestions based on individual work styles</li>
                  <li><strong>Continuous Learning:</strong> Improves over time as it processes more team-specific data</li>
                </ul>
                <p className="mt-4 text-sm">Note: All AI processing respects user privacy and data security protocols.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="quickstart" className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
              <p className="mb-6">
                New to TaskMate? Follow this step-by-step guide to get started quickly:
              </p>
              
              <div className="space-y-6">
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span className="bg-blue-100 dark:bg-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    Getting Started
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Log in with your provided credentials (email and password)</li>
                    <li>Complete your profile information if prompted</li>
                    <li>Take a moment to explore the dashboard layout</li>
                    <li>Check any pending tasks or notifications</li>
                  </ol>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span className="bg-blue-100 dark:bg-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    Daily Workflow
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Begin your day by checking the Dashboard for an overview</li>
                    <li>Review your assigned Tasks and prioritize your work</li>
                    <li>Use the Calendar to manage your schedule</li>
                    <li>Track your progress throughout the day</li>
                    <li>Submit your EOD report before ending your workday</li>
                  </ol>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span className="bg-blue-100 dark:bg-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Role-Specific Actions
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">For Super Admins:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Set up teams and assign team leaders</li>
                        <li>Configure system settings and permissions</li>
                        <li>Monitor organization-wide analytics</li>
                        <li>Create global announcements when needed</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">For Team Leaders:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Manage team members and workload</li>
                        <li>Create and assign tasks to your team</li>
                        <li>Review EOD reports and provide feedback</li>
                        <li>Track team performance metrics</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium">For Employees:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Manage your assigned tasks</li>
                        <li>Track your time and activities</li>
                        <li>Submit detailed EOD reports</li>
                        <li>Communicate with your team via Chat</li>
                        <li>Use the AI Assistant for productivity help</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span className="bg-blue-100 dark:bg-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    Leveraging AI Features
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>AI Chat:</strong> Ask questions like "What should I prioritize today?" or "Summarize my team's progress"</li>
                    <li><strong>EOD Helper:</strong> Use the "Generate EOD" button for AI-assisted report creation</li>
                    <li><strong>Task Suggestions:</strong> Check the "Recommended Tasks" section for AI-generated suggestions</li>
                    <li><strong>Analytics Insights:</strong> Look for AI insights marked with the "💡" icon in reports</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span className="bg-blue-100 dark:bg-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
                    Tips for Success
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Be Consistent:</strong> Submit EOD reports daily for the best AI insights</li>
                    <li><strong>Update Tasks:</strong> Keep task statuses current for accurate tracking</li>
                    <li><strong>Use the Calendar:</strong> Schedule your work to improve time management</li>
                    <li><strong>Check Analytics:</strong> Review your performance data regularly</li>
                    <li><strong>Ask the AI:</strong> The AI Assistant improves with use, so engage with it often</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button size="lg">
                  Start Using TaskMate Now
                </Button>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default KnowledgeHub;
