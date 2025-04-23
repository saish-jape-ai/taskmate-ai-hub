
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { teams, tasks, users, teamPerformanceData } from '@/data/mockData';
import { 
  Users, BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight, 
  PieChart, CheckCircle2, AlertCircle, Clock 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, BarChart, Bar, Legend, PieChart as RePieChart, Pie, Cell
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  
  // Calculate total tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending' || task.status === 'in_progress').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  
  // Calculate completion percentage
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
  
  // Team comparison data
  const teamScores = teams.map(team => ({
    name: team.name,
    score: team.performanceScore,
    growth: team.growth
  }));
  
  // Get best and worst performing teams
  const sortedTeams = [...teams].sort((a, b) => b.performanceScore - a.performanceScore);
  const bestTeam = sortedTeams[0];
  const worstTeam = sortedTeams[sortedTeams.length - 1];
  
  // Team sizes
  const teamSizes = teams.map(team => ({
    name: team.name,
    value: team.members.length
  }));
  
  // Colors for charts
  const COLORS = ['#9b87f5', '#D3E4FD', '#F2FCE2', '#FEC6A1'];
  
  // Task status distribution
  const taskStatusData = [
    { name: 'Pending', value: tasks.filter(t => t.status === 'pending').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in_progress').length },
    { name: 'Completed', value: completedTasks },
    { name: 'Overdue', value: overdueTasks }
  ];
  
  return (
    <div className="space-y-6">
      {/* Admin dashboard header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Organization Overview</h2>
          <p className="text-muted-foreground mt-1">Super Admin Dashboard</p>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <Button onClick={() => navigate('/teams')}>
            <Users className="mr-2 h-4 w-4" />
            Manage Teams
          </Button>
          <Button variant="outline" onClick={() => navigate('/analytics')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Advanced Analytics
          </Button>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.role === 'team_leader').length} team leaders, {users.filter(u => u.role === 'employee').length} employees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(teams.reduce((acc, team) => acc + team.performanceScore, 0) / teams.length)}%
            </div>
            <div className="flex items-center gap-1 text-xs">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.2%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
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

      {/* Team performance comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Performance Comparison</CardTitle>
            <CardDescription>Performance scores across teams</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamScores} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
                  <CartesianGrid stroke="#f1f1f1" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="score" fill="#9b87f5" radius={[4, 4, 0, 0]}>
                    {teamScores.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.growth > 0 ? '#9b87f5' : '#FEC6A1'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
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
                <RePieChart>
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
                </RePieChart>
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

      {/* Historical performance and team insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Historical Team Performance</CardTitle>
            <CardDescription>Performance trends over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={teamPerformanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid stroke="#f1f1f1" strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="team1" stroke="#9b87f5" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="team2" stroke="#D3E4FD" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="team3" stroke="#F2FCE2" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="team4" stroke="#FEC6A1" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Insights</CardTitle>
            <CardDescription>AI-generated performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Top Performing Team</h3>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+{bestTeam.growth}%</Badge>
                </div>
                <Card className="bg-green-50 border-green-100">
                  <CardContent className="p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{bestTeam.name}</span>
                      <span className="font-bold">{bestTeam.performanceScore}%</span>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-xs text-muted-foreground">
                  Strong communication, task completion, and quality metrics.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Needs Improvement</h3>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">{worstTeam.growth}%</Badge>
                </div>
                <Card className="bg-orange-50 border-orange-100">
                  <CardContent className="p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{worstTeam.name}</span>
                      <span className="font-bold">{worstTeam.performanceScore}%</span>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-xs text-muted-foreground">
                  Higher rate of overdue tasks and lower collaboration scores.
                </p>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => navigate('/analytics')}>
                View Detailed AI Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
