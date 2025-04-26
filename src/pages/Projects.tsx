
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Navigation, Book, HelpCircle, ExternalLink } from "lucide-react";

const Projects = () => {
  return (
    <AppLayout title="Projects">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">TaskMate Project Overview</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how TaskMate helps teams collaborate, manage tasks, and boost productivity with AI-powered features.
          </p>
        </section>

        {/* Key Features */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-taskmate-purple mb-2" />
              <CardTitle>Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Efficiently organize and track tasks with our intuitive interface. Set priorities, deadlines, and track progress in real-time.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Navigation className="h-8 w-8 text-taskmate-purple mb-2" />
              <CardTitle>Team Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Connect team members, share updates, and collaborate seamlessly with integrated chat and notification features.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Book className="h-8 w-8 text-taskmate-purple mb-2" />
              <CardTitle>AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Get intelligent suggestions, automated task generation, and smart insights powered by our AI technology.</p>
            </CardContent>
          </Card>
        </section>

        {/* Project Screenshots */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Project Interface</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
                alt="Dashboard Interface"
                className="w-full h-auto"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold mb-2">Dashboard View</h3>
                <p className="text-muted-foreground">Comprehensive overview of tasks, team performance, and project progress.</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                alt="Task Management Interface"
                className="w-full h-auto"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold mb-2">Task Management</h3>
                <p className="text-muted-foreground">Intuitive task creation and management interface for teams.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Guide */}
        <section className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Getting Started</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-taskmate-purple/10 p-2 rounded-lg">
                  <HelpCircle className="h-6 w-6 text-taskmate-purple" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">1. Team Setup</h3>
                  <p className="text-muted-foreground">Create your team and invite members to collaborate on tasks and projects.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-taskmate-purple/10 p-2 rounded-lg">
                  <FileText className="h-6 w-6 text-taskmate-purple" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">2. Task Creation</h3>
                  <p className="text-muted-foreground">Start creating and assigning tasks to team members with deadlines and priorities.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-taskmate-purple/10 p-2 rounded-lg">
                  <Book className="h-6 w-6 text-taskmate-purple" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">3. Daily Operations</h3>
                  <p className="text-muted-foreground">Track progress, communicate with team members, and submit EOD reports.</p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-taskmate-purple hover:bg-taskmate-purple/90">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Projects;
