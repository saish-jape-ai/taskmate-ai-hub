
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { users } from '@/data/mockData';
import AppLayout from '@/components/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Calendar, MessageSquare, FileText, CheckCircle2, Clock, AlertCircle, Briefcase, User, Star, Users, FileCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MemberProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [member, setMember] = useState<any>(null);
  
  useEffect(() => {
    // Find member data
    const foundMember = users.find(user => user.id === id);
    if (foundMember) {
      setMember(foundMember);
    }
  }, [id]);
  
  // Sample performance data
  const performanceData = [
    { name: 'Jan', score: 82 },
    { name: 'Feb', score: 85 },
    { name: 'Mar', score: 79 },
    { name: 'Apr', score: 88 },
    { name: 'May', score: 92 },
    { name: 'Jun', score: 91 },
  ];
  
  if (!member) {
    return (
      <AppLayout title="Member Profile">
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-muted-foreground">Member not found</p>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout title={`${member.name}'s Profile`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/team-members')}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-10 w-10 rounded-xl bg-taskmate-purple/10 flex items-center justify-center">
            <User className="h-5 w-5 text-taskmate-purple" />
          </div>
          <h1 className="text-2xl font-bold">Member Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-6 lg:col-span-1 relative overflow-hidden">
            {/* Status indicator */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-100 hover:bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40 dark:border-green-800/30">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                Online
              </Badge>
            </div>
            
            <div className="flex flex-col items-center">
              <img 
                src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=9b87f5&color=fff`}
                alt={member.name}
                className="w-24 h-24 rounded-full border-4 border-taskmate-purple object-cover"
              />
              <h2 className="mt-4 text-xl font-bold">{member.name}</h2>
              <div className="flex items-center gap-1 text-muted-foreground capitalize">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{member.role.replace('_', ' ')}</span>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-taskmate-purple/20 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <Star className="h-3 w-3 text-taskmate-purple" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Top performer</span>
              </div>
              
              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-taskmate-purple/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-taskmate-purple" />
                  </div>
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-taskmate-purple/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-taskmate-purple" />
                  </div>
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-taskmate-purple/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-taskmate-purple" />
                  </div>
                  <span className="text-sm">Joined: Jan 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-taskmate-purple/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-taskmate-purple" />
                  </div>
                  <span className="text-sm">Team: Product Development</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 w-full mt-6">
                <Button 
                  onClick={() => navigate(`/chat/${member.id}`)}
                  className="bg-taskmate-purple hover:bg-taskmate-purple/90"
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> Chat
                </Button>
                <Button 
                  variant="outline"
                  className="border-taskmate-purple/40 hover:bg-taskmate-purple/10"
                >
                  <FileText className="h-4 w-4 mr-2" /> EODs
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Content Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="eod">EOD Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="performance">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-taskmate-purple" /> Performance Overview
                  </h3>
                  
                  <div className="h-[250px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#9b87f5" 
                          strokeWidth={3}
                          dot={{ r: 5, fill: '#9b87f5' }} 
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Task Completion</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-taskmate-purple h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Quality of Work</span>
                        <span className="text-sm font-medium">88%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-taskmate-purple h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Collaboration</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-taskmate-purple h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">AI Assessment Score</span>
                        <span className="text-sm font-medium">90%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-taskmate-purple h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">AI-Generated Performance Notes</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="p-2 bg-muted rounded-md">Consistently completes tasks ahead of schedule</li>
                      <li className="p-2 bg-muted rounded-md">Great team player, always willing to help others</li>
                      <li className="p-2 bg-muted rounded-md">Excellent communication skills and attention to detail</li>
                    </ul>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="tasks">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-taskmate-purple" /> Task History
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Dashboard UI Redesign</h4>
                        <div className="flex gap-2 items-center mt-1">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                          <span className="text-xs text-muted-foreground">Apr 18, 2023</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          EOD Submitted: <span className="text-green-600">Yes</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">API Integration</h4>
                        <div className="flex gap-2 items-center mt-1">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                          <span className="text-xs text-muted-foreground">Apr 15, 2023</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          EOD Submitted: <span className="text-green-600">Yes</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Backend Optimization</h4>
                        <div className="flex gap-2 items-center mt-1">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40">
                            <Clock className="h-3 w-3 mr-1" />
                            In Progress
                          </Badge>
                          <span className="text-xs text-muted-foreground">Due: Apr 25, 2023</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          EOD Last Submitted: <span className="text-green-600">Apr 22, 2023</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Login Form Validation</h4>
                        <div className="flex gap-2 items-center mt-1">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/40">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Overdue
                          </Badge>
                          <span className="text-xs text-muted-foreground">Due: Apr 19, 2023</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          EOD Submitted: <span className="text-red-600">No</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="eod">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <FileCheck className="h-5 w-5 text-taskmate-purple" /> EOD Reports
                  </h3>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => {
                      const date = new Date();
                      date.setDate(date.getDate() - i);
                      
                      return (
                        <div key={i} className="border rounded-lg overflow-hidden">
                          <div className="bg-muted/50 px-4 py-2 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-taskmate-purple" />
                              <span className="font-medium">{date.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric'
                              })}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40">
                              On Time
                            </Badge>
                          </div>
                          <div className="p-4">
                            <div className="text-sm mb-3">
                              <p className="mb-2">Completed tasks:</p>
                              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>Fixed login authentication bug</li>
                                <li>Implemented new dashboard widgets</li>
                                <li>Completed API integration for user data</li>
                              </ul>
                            </div>
                            <div className="text-sm mb-2">
                              <p>Next day plan:</p>
                              <p className="text-muted-foreground">Continue with backend optimizations and start unit testing</p>
                            </div>
                            {i === 1 && (
                              <div className="bg-taskmate-purple/5 border border-taskmate-purple/20 rounded-md p-2 mt-2">
                                <div className="flex items-start gap-2">
                                  <Sparkles className="h-4 w-4 text-taskmate-purple mt-0.5" />
                                  <div className="text-sm">
                                    <span className="font-medium">AI Analysis:</span>
                                    <p className="text-muted-foreground text-xs">High quality report with clear outcomes and next steps. Shows excellent progress on assigned tasks.</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="flex justify-end mt-2">
                              <Button variant="ghost" size="sm" className="text-taskmate-purple hover:bg-taskmate-purple/10">
                                View Full Report
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MemberProfile;
