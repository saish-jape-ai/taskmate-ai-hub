
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { teams, teamPerformanceData } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Bot, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const Analytics = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;
  
  // Sample time allocation data
  const timeAllocationData = [
    { name: 'Development', value: 40 },
    { name: 'Meetings', value: 20 },
    { name: 'Planning', value: 15 },
    { name: 'Code Review', value: 15 },
    { name: 'Other', value: 10 },
  ];
  
  // Colors for charts
  const COLORS = ['#9b87f5', '#D3E4FD', '#F2FCE2', '#FEC6A1', '#8E9196'];
  
  // Team efficiency comparison
  const teamEfficiencyData = teams.map(team => ({
    name: team.name,
    efficiency: Math.round(65 + Math.random() * 25),
    qualityScore: Math.round(70 + Math.random() * 20),
  }));
  
  return (
    <AppLayout title="Analytics">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Performance Analytics</h2>
            <p className="text-muted-foreground mt-1">
              Detailed performance metrics and insights
            </p>
          </div>
        </div>

        {/* AI Insights */}
        <Card className="border-bloom-purple/30 bg-bloom-purple/5">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-bloom-purple" />
              <CardTitle className="text-bloom-purple">AI Performance Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Top Performance Insight</h3>
                  </div>
                  <p className="text-sm">
                    Customer Python FastAPI is showing exceptional growth with a 
                    <Badge className="ml-1 bg-green-100 text-green-800 hover:bg-green-100">+18%</Badge> 
                    improvement in task completion rates and response times.
                  </p>
                </div>
                
                <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-5 w-5 text-orange-500" />
                    <h3 className="font-medium">Area for Improvement</h3>
                  </div>
                  <p className="text-sm">
                    Python AI is experiencing a 
                    <Badge className="mx-1 bg-orange-100 text-orange-800 hover:bg-orange-100">-3%</Badge> 
                    decline in performance. Analysis suggests focusing on improving collaboration and task distribution.
                  </p>
                </div>
                
                <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Recommendation</h3>
                  </div>
                  <p className="text-sm">
                    Consider implementing cross-team training sessions to share best practices from the Customer Support team with other departments.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Historical Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Team Performance</CardTitle>
              <CardDescription>
                Performance trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={teamPerformanceData} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="team1" name="PYTHON_FASTAPI" stroke="#9b87f5" />
                    <Line type="monotone" dataKey="team2" name="PYTHON_AI" stroke="#D3E4FD" />
                    <Line type="monotone" dataKey="team3" name="PYTHOM_ML" stroke="#F2FCE2" />
                    <Line type="monotone" dataKey="team4" name="REACT" stroke="#FEC6A1" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Team Efficiency */}
          <Card>
            <CardHeader>
              <CardTitle>Team Efficiency Comparison</CardTitle>
              <CardDescription>
                Efficiency and quality scores by team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamEfficiencyData} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="efficiency" name="Efficiency" fill="#f4d03f" />
                    <Bar dataKey="qualityScore" name="Quality Score" fill="#D3E4FD" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Time allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Time Allocation</CardTitle>
              <CardDescription>
                How teams spend their time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timeAllocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {timeAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* AI-generated insights cards */}
          <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-bloom-purple/5 to-bloom-blue/5">
            <CardHeader>
              <CardTitle>Task Completion Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
                <h3 className="font-medium mb-2">Timing Patterns</h3>
                <p className="text-sm">
                  Teams are most productive in the morning hours (9-11 AM), with task completion rates
                  30% higher than afternoon hours. Consider scheduling important tasks during peak productivity periods.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
                <h3 className="font-medium mb-2">Task Duration</h3>
                <p className="text-sm">
                  Tasks estimated at 2-4 hours are completed with highest accuracy. Longer tasks (8+ hours) 
                  tend to exceed estimated completion times by 40% on average. Consider breaking down large tasks.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
                <h3 className="font-medium mb-2">Collaboration Impact</h3>
                <p className="text-sm">
                  Tasks involving 2-3 team members show 25% faster completion times compared to individual tasks
                  of similar complexity. However, involving more than 4 team members decreases efficiency.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
