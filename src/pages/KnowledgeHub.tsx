
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  List, 
  MessageSquare, 
  CalendarDays, 
  Bell, 
  FileText, 
  Users, 
  Bot, 
  Brain, 
  Lightbulb, 
  Play, 
  Download,
  Book,
  FileChart,
  GitBranch,
  Shield,
  Component,
  Compass,
  Puzzle
} from 'lucide-react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { useAuth } from '@/context/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const KnowledgeHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { currentUser } = useAuth();

  // Function to download guide as PDF (placeholder)
  const downloadGuide = () => {
    alert('This would download the complete guide as PDF. Feature to be implemented with PDF generation library.');
  };

  return (
    <AppLayout title="Project Overview">
      <div className="flex flex-col gap-6">
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Book className="h-8 w-8 text-taskmate-purple" />
              TaskMate Knowledge Hub
            </h1>
            <p className="text-muted-foreground mt-1">
              Complete guide to understanding and using the TaskMate platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={downloadGuide}>
              <Download className="h-4 w-4 mr-2" />
              Download Guide
            </Button>
          </div>
        </div>

        {/* Main content tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="roles">Role Guides</TabsTrigger>
            <TabsTrigger value="ai">AI Features</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="border-taskmate-purple/20">
              <CardHeader className="bg-taskmate-purple/5">
                <CardTitle className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-taskmate-purple" />
                  Welcome to TaskMate
                </CardTitle>
                <CardDescription>
                  Your complete AI-powered team management solution
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4">
                  TaskMate is a comprehensive team management platform designed to optimize productivity with 
                  intelligent task management, AI-driven analytics, and robust communication tools.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <FeatureCard
                    icon={<GitBranch className="h-6 w-6 text-taskmate-purple" />}
                    title="Intuitive Workflow"
                    description="Streamlined processes for efficient team collaboration and task management"
                  />
                  <FeatureCard
                    icon={<Brain className="h-6 w-6 text-taskmate-purple" />}
                    title="AI Integration"
                    description="Intelligent features powered by AI to enhance productivity"
                  />
                  <FeatureCard
                    icon={<Shield className="h-6 w-6 text-taskmate-purple" />}
                    title="Role-Based Access"
                    description="Tailored experiences for Super Admins, Team Leaders, and Employees"
                  />
                </div>

                <div className="bg-muted p-4 rounded-lg mt-6">
                  <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Puzzle className="h-5 w-5 text-taskmate-purple" />
                    How TaskMate Works
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    TaskMate seamlessly connects team members across different roles, providing specific tools 
                    and features based on each user's responsibilities.
                  </p>
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="TaskMate Workflow" 
                    className="w-full h-auto rounded-lg border border-border"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('quickstart')}>
                  Get Started
                  <Play className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Component className="h-5 w-5 text-taskmate-purple" />
                    Core Modules
                  </CardTitle>
                  <CardDescription>Explore the key components of TaskMate</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <ModuleListItem 
                      icon={<LayoutDashboard className="h-5 w-5" />}
                      title="Dashboard"
                      description="Personalized overview for all user roles"
                    />
                    <ModuleListItem 
                      icon={<List className="h-5 w-5" />}
                      title="Tasks"
                      description="Create, assign, track, and complete tasks"
                    />
                    <ModuleListItem 
                      icon={<MessageSquare className="h-5 w-5" />}
                      title="Chat"
                      description="Real-time communication between team members"
                    />
                    <ModuleListItem 
                      icon={<CalendarDays className="h-5 w-5" />}
                      title="Calendar"
                      description="Schedule management and time tracking"
                    />
                    <ModuleListItem 
                      icon={<FileText className="h-5 w-5" />}
                      title="EOD Reports"
                      description="End-of-day submission and tracking"
                    />
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('modules')}>
                    View All Modules
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-taskmate-purple" />
                    User Roles
                  </CardTitle>
                  <CardDescription>Each role has tailored features and responsibilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <RoleListItem 
                      title="Super Admin"
                      description="Organization-wide access and management"
                      badge="Full Access"
                    />
                    <RoleListItem 
                      title="Team Leader"
                      description="Team management, task assignment, and reporting"
                      badge="Team Management"
                    />
                    <RoleListItem 
                      title="Employee"
                      description="Task execution, reporting, and team collaboration"
                      badge="Task Execution"
                    />
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('roles')}>
                    View Role Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Quick Start Tab */}
          <TabsContent value="quickstart" className="space-y-6">
            <Card>
              <CardHeader className="bg-taskmate-purple/5">
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-taskmate-purple" />
                  Quick Start Guide
                </CardTitle>
                <CardDescription>
                  Get up and running with TaskMate in minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <QuickStartStep 
                    number={1} 
                    title="Log in to your account" 
                    description="Use the credentials provided by your administrator to access the platform."
                  />
                  <QuickStartStep 
                    number={2} 
                    title="Explore your dashboard" 
                    description="Familiarize yourself with your role-specific dashboard and its features."
                  />
                  <QuickStartStep 
                    number={3} 
                    title="Check your tasks" 
                    description="Review assigned tasks, deadlines, and priorities from the Tasks module."
                  />
                  <QuickStartStep 
                    number={4} 
                    title="Set up your calendar" 
                    description="View your schedule and upcoming deadlines in the Calendar module."
                  />
                  <QuickStartStep 
                    number={5} 
                    title="Submit your first EOD" 
                    description="Complete your End-of-Day report to track your daily progress."
                  />
                </div>

                <div className="mt-8 bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Pro Tips</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Use the AI Assistant for quick help with tasks and questions</li>
                    <li>Check your notifications regularly for important updates</li>
                    <li>Customize your settings to match your preferences</li>
                    <li>Communicate with your team via the Chat module for seamless collaboration</li>
                    <li>Explore the Analytics section to track your performance metrics</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <VideoTutorialCard 
                title="Dashboard Walkthrough" 
                description="Learn how to navigate your personalized dashboard"
                duration="3:45"
              />
              <VideoTutorialCard 
                title="Task Management" 
                description="Create, assign, and track tasks efficiently"
                duration="5:12"
              />
              <VideoTutorialCard 
                title="EOD Submission" 
                description="Submit detailed End-of-Day reports"
                duration="2:30"
              />
            </div>
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ModuleCard 
                icon={<LayoutDashboard className="h-6 w-6 text-taskmate-purple" />}
                title="Dashboard"
                description="Personalized overview of tasks, analytics, and activities"
                features={[
                  "Role-specific widgets and data visualization",
                  "Quick access to key metrics and pending tasks",
                  "AI-powered insights and recommendations",
                  "Customizable layout and preferences"
                ]}
                roles={["Super Admin", "Team Leader", "Employee"]}
                aiFeatures={["Performance predictions", "Productivity suggestions"]}
              />

              <ModuleCard 
                icon={<List className="h-6 w-6 text-taskmate-purple" />}
                title="Tasks"
                description="Comprehensive task management system"
                features={[
                  "Create, assign, and track tasks",
                  "Set priorities, deadlines, and dependencies",
                  "Attach files and add comments",
                  "Filter and sort by various parameters"
                ]}
                roles={["Super Admin", "Team Leader", "Employee"]}
                aiFeatures={["Smart task assignments", "Deadline recommendations"]}
              />

              <ModuleCard 
                icon={<MessageSquare className="h-6 w-6 text-taskmate-purple" />}
                title="Chat"
                description="Real-time communication between team members"
                features={[
                  "Direct messaging and group chats",
                  "File sharing and media support",
                  "Search functionality for past conversations",
                  "Read receipts and typing indicators"
                ]}
                roles={["Super Admin", "Team Leader", "Employee"]}
                aiFeatures={["Smart replies", "Message summarization"]}
              />

              <ModuleCard 
                icon={<CalendarDays className="h-6 w-6 text-taskmate-purple" />}
                title="Calendar"
                description="Schedule management and time tracking"
                features={[
                  "View tasks and events in daily, weekly, or monthly format",
                  "Set reminders and recurring events",
                  "Track task deadlines and submissions",
                  "Integrate with EOD reports"
                ]}
                roles={["Super Admin", "Team Leader", "Employee"]}
                aiFeatures={["Optimal scheduling suggestions", "Workload balancing"]}
              />

              <ModuleCard 
                icon={<FileText className="h-6 w-6 text-taskmate-purple" />}
                title="EOD Reports"
                description="End-of-day submission and tracking"
                features={[
                  "Submit daily progress reports",
                  "Track time spent on tasks",
                  "Attach files and evidence",
                  "Receive AI feedback on productivity"
                ]}
                roles={["Team Leader", "Employee"]}
                aiFeatures={["Performance analysis", "Next-day recommendations"]}
              />

              <ModuleCard 
                icon={<Bell className="h-6 w-6 text-taskmate-purple" />}
                title="Reminders"
                description="Smart notification system for important deadlines"
                features={[
                  "Set custom reminders for tasks",
                  "Schedule recurring notifications",
                  "Prioritize important alerts",
                  "Manage team-wide announcements"
                ]}
                roles={["Super Admin", "Team Leader"]}
                aiFeatures={["Smart timing suggestions", "Priority detection"]}
              />

              <ModuleCard 
                icon={<Users className="h-6 w-6 text-taskmate-purple" />}
                title="Team Management"
                description="Organize and manage team members"
                features={[
                  "Add and remove team members",
                  "Assign roles and permissions",
                  "Track performance and productivity",
                  "Generate team reports"
                ]}
                roles={["Super Admin", "Team Leader"]}
                aiFeatures={["Team composition optimization", "Performance patterns"]}
              />

              <ModuleCard 
                icon={<Bot className="h-6 w-6 text-taskmate-purple" />}
                title="AI Assistant"
                description="Intelligent virtual assistant for various tasks"
                features={[
                  "Answer questions about the platform",
                  "Generate content and suggestions",
                  "Analyze data and provide insights",
                  "Automate routine tasks"
                ]}
                roles={["Super Admin", "Team Leader", "Employee"]}
                aiFeatures={["Natural language processing", "Contextual awareness"]}
              />

              <ModuleCard 
                icon={<FileChart className="h-6 w-6 text-taskmate-purple" />}
                title="Analytics"
                description="Data visualization and performance metrics"
                features={[
                  "Track individual and team performance",
                  "Analyze productivity trends",
                  "Generate custom reports",
                  "Identify areas for improvement"
                ]}
                roles={["Super Admin", "Team Leader"]}
                aiFeatures={["Predictive analytics", "Performance forecasting"]}
              />
            </div>
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 gap-8">
              <RoleCard 
                title="Super Admin"
                description="Organization-wide access and management capabilities"
                responsibilities={[
                  "Manage all teams and members across the organization",
                  "Access comprehensive analytics and reports",
                  "Configure system-wide settings and permissions",
                  "Monitor overall performance and productivity"
                ]}
                accessibleModules={[
                  {icon: <LayoutDashboard className="h-4 w-4" />, name: "Dashboard"},
                  {icon: <List className="h-4 w-4" />, name: "Tasks"},
                  {icon: <MessageSquare className="h-4 w-4" />, name: "Chat"},
                  {icon: <CalendarDays className="h-4 w-4" />, name: "Calendar"},
                  {icon: <Users className="h-4 w-4" />, name: "Teams"},
                  {icon: <FileChart className="h-4 w-4" />, name: "Analytics"},
                  {icon: <Settings className="h-4 w-4" />, name: "Settings"}
                ]}
                uniqueFeatures={[
                  "Create and manage teams",
                  "Access organization-wide analytics",
                  "Configure system settings",
                  "Manage role permissions"
                ]}
              />

              <RoleCard 
                title="Team Leader"
                description="Team management, task assignment, and reporting capabilities"
                responsibilities={[
                  "Manage team members and their tasks",
                  "Track team performance and productivity",
                  "Set reminders and follow up on deadlines",
                  "Review EOD reports and provide feedback"
                ]}
                accessibleModules={[
                  {icon: <LayoutDashboard className="h-4 w-4" />, name: "Dashboard"},
                  {icon: <List className="h-4 w-4" />, name: "Tasks"},
                  {icon: <MessageSquare className="h-4 w-4" />, name: "Chat"},
                  {icon: <CalendarDays className="h-4 w-4" />, name: "Calendar"},
                  {icon: <Users className="h-4 w-4" />, name: "Team Members"},
                  {icon: <Bell className="h-4 w-4" />, name: "Reminders"},
                  {icon: <Settings className="h-4 w-4" />, name: "Settings"}
                ]}
                uniqueFeatures={[
                  "Team member management",
                  "Task assignment and tracking",
                  "Setting reminders for the team",
                  "EOD report reviews"
                ]}
              />

              <RoleCard 
                title="Employee"
                description="Task execution, reporting, and team collaboration capabilities"
                responsibilities={[
                  "Complete assigned tasks within deadlines",
                  "Submit daily EOD reports",
                  "Collaborate with team members",
                  "Track personal productivity"
                ]}
                accessibleModules={[
                  {icon: <LayoutDashboard className="h-4 w-4" />, name: "Dashboard"},
                  {icon: <List className="h-4 w-4" />, name: "Tasks"},
                  {icon: <MessageSquare className="h-4 w-4" />, name: "Chat"},
                  {icon: <CalendarDays className="h-4 w-4" />, name: "Calendar"},
                  {icon: <FileText className="h-4 w-4" />, name: "EOD"},
                  {icon: <Bot className="h-4 w-4" />, name: "AI Assistant"},
                  {icon: <Settings className="h-4 w-4" />, name: "Settings"}
                ]}
                uniqueFeatures={[
                  "EOD submission",
                  "AI Assistant for task help",
                  "Personal productivity tracking",
                  "File attachments for task evidence"
                ]}
              />
            </div>
          </TabsContent>

          {/* AI Features Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="border-taskmate-purple/20">
              <CardHeader className="bg-taskmate-purple/5">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-taskmate-purple" />
                  AI-Powered Features
                </CardTitle>
                <CardDescription>
                  How artificial intelligence enhances TaskMate functionality
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  TaskMate leverages the Gemini API and other AI technologies to provide intelligent features
                  that enhance productivity, automate routine tasks, and provide valuable insights.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AIFeatureCard 
                    icon={<Lightbulb className="h-6 w-6 text-amber-500" />}
                    title="Smart Task Recommendations"
                    description="AI analyzes work patterns and suggests optimal task assignments based on team member strengths and availability."
                    modules={["Tasks", "Dashboard"]}
                  />
                  
                  <AIFeatureCard 
                    icon={<FileText className="h-6 w-6 text-blue-500" />}
                    title="EOD Report Analysis"
                    description="Automatic analysis of submitted EOD reports with personalized feedback and next-day suggestions."
                    modules={["EOD", "Calendar"]}
                  />
                  
                  <AIFeatureCard 
                    icon={<CalendarDays className="h-6 w-6 text-green-500" />}
                    title="Intelligent Scheduling"
                    description="Optimizes task scheduling by analyzing deadlines, priorities, and team workload to prevent bottlenecks."
                    modules={["Calendar", "Tasks"]}
                  />
                  
                  <AIFeatureCard 
                    icon={<Bot className="h-6 w-6 text-purple-500" />}
                    title="AI Assistant"
                    description="Virtual assistant that answers questions, provides guidance, and automates routine tasks."
                    modules={["AI Assistant", "Chat"]}
                  />
                  
                  <AIFeatureCard 
                    icon={<FileChart className="h-6 w-6 text-red-500" />}
                    title="Predictive Analytics"
                    description="Forecasts team performance trends and identifies potential issues before they arise."
                    modules={["Analytics", "Dashboard"]}
                  />
                  
                  <AIFeatureCard 
                    icon={<Bell className="h-6 w-6 text-orange-500" />}
                    title="Smart Reminders"
                    description="Automatically generates reminders based on task importance, deadlines, and user behavior patterns."
                    modules={["Reminders", "Calendar"]}
                  />
                </div>

                <div className="mt-8 bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-taskmate-purple" />
                    How AI Works in TaskMate
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    TaskMate's AI capabilities are powered by the Gemini API, which processes data, learns from user 
                    interactions, and provides intelligent recommendations and automations.
                  </p>
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="AI Workflow" 
                    className="w-full h-auto rounded-lg border border-border"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

// Helper components
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

const ModuleListItem = ({ icon, title, description }) => {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5 bg-muted rounded-md p-1.5">
        {icon}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </li>
  );
};

const RoleListItem = ({ title, description, badge }) => {
  return (
    <li className="flex items-start justify-between gap-3">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Badge variant="outline" className="bg-taskmate-purple/5 text-taskmate-purple border-taskmate-purple/20">
        {badge}
      </Badge>
    </li>
  );
};

const QuickStartStep = ({ number, title, description }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-taskmate-purple/10 text-taskmate-purple flex items-center justify-center font-medium">
        {number}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const VideoTutorialCard = ({ title, description, duration }) => {
  return (
    <div className="border rounded-lg overflow-hidden group cursor-pointer">
      <div className="h-32 bg-muted relative flex items-center justify-center">
        <Play className="h-10 w-10 text-white bg-taskmate-purple/80 p-2 rounded-full transition-transform group-hover:scale-110" />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const ModuleCard = ({ icon, title, description, features, roles, aiFeatures }) => {
  return (
    <Collapsible className="border rounded-lg overflow-hidden">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-card hover:bg-muted/50">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 pt-0 border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-medium mb-2">Key Features</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-taskmate-purple mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Available For</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {roles.map((role, index) => (
                <Badge key={index} variant="outline" className="bg-taskmate-purple/5">
                  {role}
                </Badge>
              ))}
            </div>

            {aiFeatures && aiFeatures.length > 0 && (
              <>
                <h4 className="font-medium mb-2">AI Features</h4>
                <ul className="space-y-1">
                  {aiFeatures.map((feature, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <Brain className="h-3.5 w-3.5 text-taskmate-purple mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const RoleCard = ({ title, description, responsibilities, accessibleModules, uniqueFeatures }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium mb-3">Responsibilities</h4>
            <ul className="space-y-2">
              {responsibilities.map((responsibility, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-taskmate-purple mt-0.5">•</span>
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
            
            <h4 className="font-medium mb-3 mt-6">Unique Features</h4>
            <ul className="space-y-2">
              {uniqueFeatures.map((feature, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Accessible Modules</h4>
            <div className="grid grid-cols-2 gap-3">
              {accessibleModules.map((module, index) => (
                <div key={index} className="flex items-center gap-2 text-sm bg-muted p-2 rounded-md">
                  {module.icon}
                  <span>{module.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Typical Workflow</h4>
              <p className="text-sm text-muted-foreground mb-2">
                A visualization of how {title}s typically interact with the TaskMate platform.
              </p>
              <div className="h-32 bg-card rounded-md border flex items-center justify-center text-sm text-muted-foreground">
                Workflow diagram (placeholder)
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AIFeatureCard = ({ icon, title, description, modules }) => {
  return (
    <Card className="border-taskmate-purple/10">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          {icon}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          {modules.map((module, index) => (
            <Badge key={index} variant="outline" className="bg-muted">
              {module}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component for NavigationMenu links
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// Missing import for Settings
const Settings = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export default KnowledgeHub;
