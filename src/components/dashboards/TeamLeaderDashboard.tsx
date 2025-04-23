
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { tasks, users, teams } from '@/data/mockData';
import { 
  CheckCircle2, Clock, AlertCircle, Users, Plus, 
  BarChart3, ArrowUpRight, ArrowDownRight, MessageSquare 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AITaskGenerator } from '@/components/ai/AITaskGenerator';

const TeamLeaderDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  
  if (!currentUser || !currentUser.teamId) return null;
  
  const team = teams.find(team => team.id === currentUser.teamId);
  if (!team) return null;
  
  // Get team members
  const teamMembers = users.filter(user => user.teamId === currentUser.teamId);
  
  // Filter tasks for the current team
  const teamTasks = tasks.filter(task => task.teamId === currentUser.teamId);
  const pendingTasks = teamTasks.filter(task => task.status === 'pending' || task.status === 'in_progress');
  const completedTasks = teamTasks.filter(task => task.status === 'completed');
  const overdueTasks = teamTasks.filter(task => task.status === 'overdue');
  
  // Calculate completion percentage
  const completionPercentage = Math.round(
    (completedTasks.length / (teamTasks.length || 1)) * 100
  );
  
  // Sample task distribution data
  const taskDistributionData = teamMembers.map(member => ({
    name: member.name.split(' ')[0],
    value: teamTasks.filter(task => task.assigneeId === member.id).length
  }));
  
  // Sample performance trend data
  const performanceTrendData = [
    { name: 'Jan', score: 65 },
    { name: 'Feb', score: 68 },
    { name: 'Mar', score: 75 },
    { name: 'Apr', score: team.performanceScore }
  ];
  
  // Calculate if performance is growing
  const isGrowing = team.growth > 0;
  
  // Task status distribution
  const taskStatusData = [
    { name: 'Pending', value: teamTasks.filter(t => t.status === 'pending').length },
    { name: 'In Progress', value: teamTasks.filter(t => t.status === 'in_progress').length },
    { name: 'Completed', value: teamTasks.filter(t => t.status === 'completed').length },
    { name: 'Overdue', value: teamTasks.filter(t => t.status === 'overdue').length }
  ];
  
  // Colors for the pie chart
  const COLORS = ['#D3E4FD', '#9b87f5', '#F2FCE2', '#FEC6A1'];
  
  // Handle create task
  const handleCreateTask = () => {
    setShowDialog(true);
  };
  
  return (
    <div className="space-y-6">
      {/* Team summary header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold">{team.name} Team</h2>
          <p className="text-muted-foreground mt-1">Team Leader Dashboard</p>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <Button onClick={handleCreateTask}>
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>
          <Button variant="outline" onClick={() => navigate('/team')}>
            <Users className="mr-2 h-4 w-4" />
            Team Members
          </Button>
        </div>
      </div>

      {/* Team performance overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.performanceScore}%</div>
            <div className="flex items-center gap-1 text-xs">
              {isGrowing ? (
                <>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+{team.growth}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{team.growth}%</span>
                </>
              )}
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              Active team members
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionPercentage}%</div>
            <Progress value={completionPercentage} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Task Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Performance Trend</CardTitle>
            <CardDescription>Monthly performance score</CardDescription>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
            <CardDescription>Distribution of tasks by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {taskStatusData.map((status, index) => (
                <div key={status.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-xs">{status.name}: {status.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members and Task Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Tasks assigned per team member</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskDistributionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid stroke="#f1f1f1" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Active members in your team</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border-b last:border-0">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      {member.avatar ? (
                        <AvatarImage src={member.avatar} alt={member.name} />
                      ) : (
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.role === 'team_leader' ? 'Team Leader' : 'Employee'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => navigate(`/chat/${member.id}`)}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Badge variant="outline">
                      {teamTasks.filter(task => task.assigneeId === member.id).length} tasks
                    </Badge>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* AI Task Generator Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Generate Task with AI</DialogTitle>
            <DialogDescription>
              Our AI will help you create detailed tasks for your team.
            </DialogDescription>
          </DialogHeader>
          <AITaskGenerator teamId={team.id} onClose={() => setShowDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamLeaderDashboard;
