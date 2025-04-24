
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { tasks, performanceMetrics } from '@/data/mockData';
import { CheckCircle2, Clock, AlertCircle, MessagesSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import TaskItem from '@/components/tasks/TaskItem';
import { AIAssistantPanel } from '@/components/ai/AIAssistantPanel';

const EmployeeDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  if (!currentUser) return null;
  
  // Filter tasks assigned to the current employee
  const userTasks = tasks.filter(task => task.assigneeId === currentUser.id);
  const pendingTasks = userTasks.filter(task => task.status === 'pending' || task.status === 'in_progress');
  const completedTasks = userTasks.filter(task => task.status === 'completed');
  const overdueTasks = userTasks.filter(task => task.status === 'overdue');
  
  // Get user performance metrics
  const userMetrics = performanceMetrics.filter(metric => metric.userId === currentUser.id);
  
  // Sample performance trend data (in a real app, this would come from an API)
  const performanceTrendData = [
    { name: 'Week 1', score: 70 },
    { name: 'Week 2', score: 75 },
    { name: 'Week 3', score: 72 },
    { name: 'Week 4', score: 80 },
    { name: 'Week 5', score: 85 },
    { name: 'Week 6', score: 88 },
    { name: 'Week 7', score: 92 },
  ];
  
  // Metric comparison data (comparing with team average)
  const metricComparisonData = [
    { name: 'Task Completion', you: 92, teamAvg: 78 },
    { name: 'Quality', you: 88, teamAvg: 82 },
    { name: 'Efficiency', you: 78, teamAvg: 75 },
    { name: 'Collaboration', you: 94, teamAvg: 80 },
  ];
  
  return (
    <div className="space-y-6">
      {/* Welcome and summary */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Hello, {currentUser.name}</h2>
          <p className="text-muted-foreground mt-1">Here's your performance summary</p>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <Button onClick={() => navigate('/tasks')}>View All Tasks</Button>
          <Button variant="outline" onClick={() => navigate('/chat')}>
            <MessagesSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </div>
      </div>

      {/* Task summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingTasks.length === 0 ? "No pending tasks" : `${pendingTasks.filter(t => t.priority === 'high').length} high priority`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks.length > 0 ? "Well done!" : "Start completing tasks"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {overdueTasks.length === 0 ? "No overdue tasks" : "Requires attention"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance metrics and AI assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance metrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal performance trend */}
          <Card>
            <CardHeader>
              <CardTitle>Your Performance Trend</CardTitle>
              <CardDescription>Weekly performance score</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="score" stroke="#9b87f5" strokeWidth={2} dot={{ r: 4 }} />
                    <CartesianGrid stroke="#f1f1f1" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance metrics comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Your metrics vs. team average</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="you" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="teamAvg" fill="#D3E4FD" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI assistant and tasks */}
        <div className="space-y-6">
          {/* AI Assistant */}
          <AIAssistantPanel />

          {/* Upcoming Tasks */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Your next pending tasks</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[400px] overflow-auto">
                {pendingTasks.length > 0 ? (
                  <div className="divide-y">
                    {pendingTasks.slice(0, 3).map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                    {pendingTasks.length > 3 && (
                      <div className="py-2 px-4 text-center">
                        <Button variant="link" onClick={() => navigate('/tasks')}>
                          View all {pendingTasks.length} tasks
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-8 px-4 text-center">
                    <p className="text-muted-foreground">No pending tasks</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
