
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AreaChart, Users, Settings, Info, Check, ArrowRight, BarChart, MessageSquare, FileText, Calendar } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally: redirect authenticated users to dashboard.
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-taskmate-purple/10 to-white dark:from-taskmate-purple/20 dark:to-gray-900 flex flex-col">
      {/* Fixed navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 shadow-sm backdrop-blur-sm z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AreaChart className="h-8 w-8 text-taskmate-purple" />
            <span className="text-2xl font-bold">TaskMate</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}>
              Features
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById('workflow')?.scrollIntoView({behavior: 'smooth'})}>
              Workflow
            </Button>
            <Button onClick={() => navigate('/login')} className="bg-taskmate-purple hover:bg-taskmate-purple/90">
              Sign In
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 pt-28 pb-16 space-y-24 flex-1">
        {/* Hero section */}
        <section className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              AI-Powered <span className="text-taskmate-purple">Team Management</span> & Performance
            </h1>
            <p className="text-xl text-muted-foreground">
              Optimize productivity with intelligent task management, AI-driven analytics, and robust communication tools.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-taskmate-purple hover:bg-taskmate-purple/90" onClick={() => navigate('/login')}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" 
              alt="Person using TaskMate dashboard" 
              className="rounded-xl shadow-lg w-full max-w-lg mx-auto"
            />
          </div>
        </section>
        
        {/* Features section */}
        <section id="features" className="py-10">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-taskmate-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Driven Analytics</h3>
              <p className="text-muted-foreground">Get intelligent insights into your team's performance with AI-powered analytics.</p>
            </div>
            
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-taskmate-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Team Management</h3>
              <p className="text-muted-foreground">Organize teams, assign tasks, and monitor progress with ease.</p>
            </div>
            
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-taskmate-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Integrated Chat</h3>
              <p className="text-muted-foreground">Communicate with your team in real-time with our built-in messaging system.</p>
            </div>
            
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-taskmate-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">EOD Reports</h3>
              <p className="text-muted-foreground">Submit and track daily End-of-Day reports with AI assistance.</p>
            </div>
            
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-taskmate-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Task Scheduling</h3>
              <p className="text-muted-foreground">Set deadlines, priorities, and reminders for all your tasks.</p>
            </div>
            
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
              <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-taskmate-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customizable</h3>
              <p className="text-muted-foreground">Tailor TaskMate to fit your team's needs with customizable settings.</p>
            </div>
          </div>
        </section>
        
        {/* Role-based section */}
        <section className="py-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Tailored for Every Role</h2>
            <p className="text-muted-foreground mt-2">TaskMate provides custom experiences based on your role</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-taskmate-purple">Super Admin</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                  <span>Access all teams and analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                  <span>Manage organization-wide settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                  <span>View comprehensive reports</span>
                </li>
              </ul>
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Analytics dashboard" 
                className="w-full h-40 object-cover rounded-lg mt-4"
              />
            </div>
            
            <div className="md:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-taskmate-purple">Team Leader</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                  <span>Create and assign tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                  <span>Track team performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                  <span>View EOD reports from team</span>
                </li>
              </ul>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Team management" 
                className="w-full h-40 object-cover rounded-lg mt-4"
              />
            </div>
            
            <div className="md:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-taskmate-purple">Employee</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                  <span>Manage assigned tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                  <span>Submit EOD reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                  <span>Chat with team and AI assistant</span>
                </li>
              </ul>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Employee using TaskMate" 
                className="w-full h-40 object-cover rounded-lg mt-4"
              />
            </div>
          </div>
        </section>
        
        {/* Workflow section */}
        <section id="workflow" className="py-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Project Workflow</h2>
            <p className="text-muted-foreground mt-2">How TaskMate streamlines your team's workflow</p>
          </div>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-3">AI-Powered Task Management</h3>
                <p className="text-muted-foreground">
                  TaskMate's AI helps you create, assign, and track tasks intelligently. Get suggestions for task assignments based on team members' strengths and workloads.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Task management" 
                  className="rounded-xl shadow-md w-full"
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-3">Real-time Communication</h3>
                <p className="text-muted-foreground">
                  Keep your team connected with integrated chat features. Share updates, files, and insights directly within the platform.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Team communication" 
                  className="rounded-xl shadow-md w-full"
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-3">Performance Analytics</h3>
                <p className="text-muted-foreground">
                  Track team and individual performance with detailed analytics. Identify trends, strengths, and areas for improvement.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Performance analytics" 
                  className="rounded-xl shadow-md w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-10">
          <div className="bg-taskmate-purple/10 dark:bg-taskmate-purple/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to boost your team's productivity?</h2>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of teams that use TaskMate to streamline their workflows and improve collaboration.
            </p>
            <Button size="lg" className="bg-taskmate-purple hover:bg-taskmate-purple/90" onClick={() => navigate('/login')}>
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AreaChart className="h-6 w-6 text-taskmate-purple" />
                <span className="text-xl font-bold">TaskMate</span>
              </div>
              <p className="text-muted-foreground text-sm">
                AI-powered team management for modern teams. Boost productivity and collaboration.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Testimonials</li>
                <li>Integrations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Blog</li>
                <li>Support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 TaskMate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
