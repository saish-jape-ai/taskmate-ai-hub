
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bloom-blue/20 to-bloom-purple/10 flex flex-col">
      <header className="py-6 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="bg-taskmate-purple/10 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-taskmate-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            <span className="ml-2 text-2xl font-bold text-gray-900">TaskMate</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered Team Management Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline your team's productivity with our intelligent task management, reminders, and performance analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Try Demo</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-taskmate-purple/20 to-bloom-blue/20 rounded-lg transform rotate-3"></div>
              <img 
                src="/placeholder.svg" 
                alt="TaskMate Dashboard Preview" 
                className="relative z-10 rounded-lg shadow-lg max-w-full h-auto object-cover"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 px-4 sm:px-6 md:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 TaskMate. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-500">Terms</a>
            <a href="#" className="text-gray-400 hover:text-gray-500">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-gray-500">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
