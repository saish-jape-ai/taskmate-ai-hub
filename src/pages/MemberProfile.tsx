
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  BarChart2,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Star,
  Trophy,
  UserCircle,
  Calendar,
  Activity,
  Sparkle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Mock data for the member profile
const memberData = {
  id: "1",
  name: "Alex Johnson",
  role: "Frontend Developer",
  email: "alex.johnson@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  joiningDate: "June 15, 2023",
  department: "Engineering",
  manager: "Sarah Williams",
  phoneNumber: "+1 (555) 123-4567",
  location: "New York, NY",
  skills: ["React", "TypeScript", "UI/UX", "GraphQL", "Jest", "Node.js"],
  bio: "Passionate frontend developer with 5+ years of experience building responsive and accessible web applications. Focused on creating delightful user experiences with modern web technologies.",
  performanceScore: 92,
  completionRate: 95,
  tasksCompleted: 145,
  averageCompletionTime: "1.2 days",
  overdueTasks: 2,
  currentProjects: 3,
  badges: [
    { name: "Top Performer", icon: "Trophy" },
    { name: "Team Player", icon: "Users" },
    { name: "Quick Learner", icon: "Zap" },
  ],
};

// Mock data for tasks
const taskData = [
  {
    id: "task1",
    title: "Implement new dashboard UI",
    status: "Completed",
    priority: "High",
    deadline: "2023-04-15",
    completedOn: "2023-04-14",
    description: "Create responsive dashboard UI based on the Figma designs.",
  },
  {
    id: "task2",
    title: "Fix authentication bugs",
    status: "Completed",
    priority: "High",
    deadline: "2023-04-18",
    completedOn: "2023-04-17",
    description: "Address login issues reported by QA team.",
  },
  {
    id: "task3",
    title: "Optimize API response time",
    status: "In Progress",
    priority: "Medium",
    deadline: "2023-04-22",
    description: "Improve response time for main dashboard API endpoints.",
  },
  {
    id: "task4",
    title: "Create user onboarding flow",
    status: "Pending",
    priority: "Medium",
    deadline: "2023-04-25",
    description: "Design and implement improved onboarding for new users.",
  },
];

// Mock data for EOD reports
const eodReports = [
  {
    id: "eod1",
    date: "April 18, 2023",
    tasksCompleted: 3,
    tasksInProgress: 1,
    blockers: "None",
    summary: "Completed the dashboard UI components and fixed two critical bugs. Started working on the API optimization task.",
    submittedAt: "5:45 PM",
  },
  {
    id: "eod2",
    date: "April 17, 2023",
    tasksCompleted: 2,
    tasksInProgress: 2,
    blockers: "Waiting on design team for final mockups",
    summary: "Fixed authentication issues and completed user profile UI updates. Continuing work on the dashboard components.",
    submittedAt: "5:30 PM",
  },
  {
    id: "eod3",
    date: "April 16, 2023",
    tasksCompleted: 4,
    tasksInProgress: 1,
    blockers: "None",
    summary: "Completed all planned tasks for the day and helped debug an issue reported by QA team.",
    submittedAt: "6:15 PM",
  },
];

// Mock data for performance chart
const performanceData = [
  { month: "Jan", completion: 88, quality: 90 },
  { month: "Feb", completion: 85, quality: 87 },
  { month: "Mar", completion: 92, quality: 89 },
  { month: "Apr", completion: 95, quality: 94 },
  { month: "May", completion: 90, quality: 92 },
  { month: "Jun", completion: 93, quality: 96 },
];

// Mock feedback data
const feedbackData = [
  {
    id: "f1",
    from: "Sarah Williams",
    role: "Project Manager",
    date: "April 12, 2023",
    content: "Alex is consistently delivering high-quality work ahead of schedule. Excellent attention to detail and communication skills.",
    rating: 5,
  },
  {
    id: "f2",
    from: "Michael Chen",
    role: "Senior Developer",
    date: "March 28, 2023",
    content: "Great collaboration on the authentication system. Provided valuable insights that improved the overall architecture.",
    rating: 5,
  },
  {
    id: "f3",
    from: "Priya Sharma",
    role: "UX Designer",
    date: "March 15, 2023",
    content: "Excellent implementation of the UI designs with attention to accessibility standards.",
    rating: 4,
  },
];

// Mock AI assessment
const aiAssessment = {
  strengths: ["Frontend development", "Team collaboration", "Problem-solving", "Code quality", "Meeting deadlines"],
  growthAreas: ["Backend integration knowledge", "Documentation habits"],
  insights: "Alex consistently delivers high-quality work ahead of schedule. Shows excellent attention to detail, particularly in UI implementations. Has strong collaboration skills and helps other team members. Could benefit from more exposure to backend technologies to become more well-rounded.",
  suggestions: "Consider involving Alex in more full-stack tasks to develop backend skills. Would benefit from participating in the upcoming GraphQL workshop. A good candidate for mentoring junior developers due to excellent communication skills.",
};

const MemberProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, you would fetch the member data based on the ID
  const member = memberData;

  const handleChatClick = () => {
    // Here you would navigate to a chat screen with this member
    console.log("Navigate to chat with", member.name);
    // For demonstration, we'll just alert
    alert(`Chat with ${member.name} would open here`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4 py-6">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        ← Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <Card className="shadow-md border-taskmate-purple/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{member.name}</CardTitle>
                    <CardDescription className="text-lg font-medium text-taskmate-purple">
                      {member.role}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserCircle className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{member.department}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <span>Joined: {member.joiningDate}</span>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Performance</span>
                    <span className="text-sm font-medium">{member.performanceScore}%</span>
                  </div>
                  <Progress value={member.performanceScore} className="h-2" />
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Task Completion</span>
                    <span className="text-sm font-medium">{member.completionRate}%</span>
                  </div>
                  <Progress value={member.completionRate} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {member.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-taskmate-purple/10 text-taskmate-purple border-taskmate-purple/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90"
                onClick={handleChatClick}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Chat with {member.name.split(" ")[0]}
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-taskmate-purple/20 text-taskmate-purple hover:bg-taskmate-purple/10"
              >
                <FileText className="mr-2 h-4 w-4" /> Send Task
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Tabs Container */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="eod">EOD Reports</TabsTrigger>
              <TabsTrigger value="ai">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tasks Overview Card */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-taskmate-purple" />
                      Task Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-taskmate-purple">{member.tasksCompleted}</div>
                        <div className="text-sm text-gray-500">Completed</div>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-taskmate-purple">{member.overdueTasks}</div>
                        <div className="text-sm text-gray-500">Overdue</div>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-taskmate-purple">{member.currentProjects}</div>
                        <div className="text-sm text-gray-500">Active Projects</div>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-taskmate-purple">{member.averageCompletionTime}</div>
                        <div className="text-sm text-gray-500">Avg. Completion</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Badges Card */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Trophy className="h-5 w-5 mr-2 text-taskmate-purple" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 gap-3">
                      {member.badges.map((badge, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-taskmate-purple/20 flex items-center justify-center mr-3">
                            <Trophy className="h-5 w-5 text-taskmate-purple" />
                          </div>
                          <div>
                            <div className="font-medium">{badge.name}</div>
                            <div className="text-sm text-gray-500">Awarded for excellence</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Chart */}
                <Card className="shadow-sm md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <BarChart2 className="h-5 w-5 mr-2 text-taskmate-purple" />
                      Performance Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={performanceData}
                          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="completion"
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="quality"
                            stroke="#82ca9d"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Task History</CardTitle>
                  <CardDescription>Currently assigned and recently completed tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {taskData.map((task) => (
                      <div
                        key={task.id}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500">{task.description}</p>
                          </div>
                          <Badge
                            className={
                              task.status === "Completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : task.status === "In Progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                            }
                          >
                            {task.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3 text-sm">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            Due: {task.deadline}
                          </span>
                          {task.completedOn && (
                            <span className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                              Completed: {task.completedOn}
                            </span>
                          )}
                          <span
                            className={`flex items-center ${
                              task.priority === "High"
                                ? "text-red-500"
                                : "text-orange-500"
                            }`}
                          >
                            <Activity className="h-4 w-4 mr-1" />
                            {task.priority} Priority
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="eod">
              <Card>
                <CardHeader>
                  <CardTitle>EOD Reports</CardTitle>
                  <CardDescription>Daily summaries of work completed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {eodReports.map((report) => (
                      <div
                        key={report.id}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{report.date}</h4>
                          <span className="text-sm text-gray-500">
                            Submitted at {report.submittedAt}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          {report.summary}
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-center">
                            <div className="font-medium text-taskmate-purple">
                              {report.tasksCompleted}
                            </div>
                            <div className="text-xs text-gray-500">Completed</div>
                          </div>
                          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-center">
                            <div className="font-medium text-taskmate-purple">
                              {report.tasksInProgress}
                            </div>
                            <div className="text-xs text-gray-500">In Progress</div>
                          </div>
                          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-center">
                            <div className="font-medium text-taskmate-purple">
                              {report.blockers === "None" ? "0" : "1"}
                            </div>
                            <div className="text-xs text-gray-500">Blockers</div>
                          </div>
                        </div>
                        {report.blockers !== "None" && (
                          <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 text-sm rounded-md">
                            <span className="font-medium">Blocker: </span>
                            {report.blockers}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>
                    Performance analysis and growth recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Strengths and Growth Areas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                        <h4 className="font-medium text-green-700 dark:text-green-400 mb-2 flex items-center">
                          <Trophy className="h-4 w-4 mr-2" />
                          Strengths
                        </h4>
                        <ul className="space-y-1">
                          {aiAssessment.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-1" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                          <Sparkle className="h-4 w-4 mr-2" />
                          Growth Areas
                        </h4>
                        <ul className="space-y-1">
                          {aiAssessment.growthAreas.map((area, idx) => (
                            <li key={idx} className="flex items-start">
                              <Star className="h-4 w-4 mr-2 text-blue-500 mt-1" />
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* AI Analysis */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Performance Analysis</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {aiAssessment.insights}
                      </p>
                    </div>

                    {/* Recommendations */}
                    <div className="p-4 border rounded-lg bg-taskmate-purple/5">
                      <h4 className="font-medium text-taskmate-purple mb-2 flex items-center">
                        <Sparkle className="h-4 w-4 mr-2" />
                        Recommendations
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {aiAssessment.suggestions}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
