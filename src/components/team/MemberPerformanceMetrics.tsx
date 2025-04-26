
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MemberPerformanceMetricsProps {
  userId: string;
}

const MemberPerformanceMetrics = ({ userId }: MemberPerformanceMetricsProps) => {
  // Sample performance data (replace with real data in production)
  const performanceData = [
    { month: 'Jan', score: 85 },
    { month: 'Feb', score: 88 },
    { month: 'Mar', score: 92 },
    { month: 'Apr', score: 90 },
  ];

  const metrics = {
    taskCompletion: 92,
    qualityScore: 88,
    teamCollaboration: 94,
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Task Completion</span>
                <span className="text-sm font-medium">{metrics.taskCompletion}%</span>
              </div>
              <Progress value={metrics.taskCompletion} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Quality Score</span>
                <span className="text-sm font-medium">{metrics.qualityScore}%</span>
              </div>
              <Progress value={metrics.qualityScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Team Collaboration</span>
                <span className="text-sm font-medium">{metrics.teamCollaboration}%</span>
              </div>
              <Progress value={metrics.teamCollaboration} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#9b87f5" 
                  strokeWidth={2}
                  dot={{ fill: '#9b87f5', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberPerformanceMetrics;
