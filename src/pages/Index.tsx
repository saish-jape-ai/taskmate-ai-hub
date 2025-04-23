
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { AreaChart, ArrowRight } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bloom-blue/30 to-bloom-purple/10">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AreaChart className="h-8 w-8 text-bloom-purple" />
            <span className="text-xl font-bold">BloomTeam</span>
          </div>
          <Button onClick={() => navigate('/login')} variant="outline">
            Sign In
          </Button>
        </header>

        <main className="mt-16 md:mt-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              AI-Powered Team <span className="text-bloom-purple">Performance</span> Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              Optimize team productivity and performance with intelligent task management and AI-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-bloom-purple hover:bg-bloom-purple/90" onClick={() => navigate('/login')}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Live Demo
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center">
            <div className="relative max-w-lg">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-bloom-purple via-blue-500 to-bloom-blue blur-xl opacity-70"></div>
              <div className="relative p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                <img 
                  src="https://placehold.co/600x400/f5f7ff/9b87f5?text=BloomTeam+Dashboard&font=montserrat" 
                  alt="BloomTeam Dashboard" 
                  className="rounded-md" 
                />
              </div>
            </div>
          </div>
        </main>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
            <div className="bg-bloom-purple/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <AreaChart className="h-8 w-8 text-bloom-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Get intelligent suggestions and performance analytics to optimize team productivity.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
            <div className="bg-bloom-blue/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <ArrowRight className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Role-Based Dashboard</h3>
            <p className="text-muted-foreground">
              Customized views for Super Admins, Team Leaders, and Employees.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
            <div className="bg-bloom-green/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <AreaChart className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
            <p className="text-muted-foreground">
              Monitor and improve individual and team performance with detailed analytics.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
