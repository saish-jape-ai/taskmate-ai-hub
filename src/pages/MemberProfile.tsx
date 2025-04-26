
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { users } from '@/data/mockData';
import AppLayout from '@/components/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Calendar, MessageSquare, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EodHistoryTab } from '@/components/eod/EodHistoryTab';

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
          <h1 className="text-2xl font-bold">Member Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-6 lg:col-span-1">
            <div className="flex flex-col items-center">
              <img 
                src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=9b87f5&color=fff`}
                alt={member.name}
                className="w-24 h-24 rounded-full border-4 border-taskmate-purple object-cover"
              />
              <h2 className="mt-4 text-xl font-bold">{member.name}</h2>
              <p className="text-muted-foreground capitalize">{member.role.replace('_', ' ')}</p>
              
              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-taskmate-purple" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-taskmate-purple" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-taskmate-purple" />
                  <span className="text-sm">Joined: Jan 2023</span>
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
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="eods">EODs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="performance">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
                  
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
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Recent Performance Notes</h4>
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
                  <h3 className="text-lg font-semibold mb-4">Task History</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Dashboard UI Redesign</h4>
                        <p className="text-sm text-muted-foreground">Completed on Apr 18, 2023</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                        Completed
                      </span>
                    </div>
                    
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">API Integration</h4>
                        <p className="text-sm text-muted-foreground">Completed on Apr 15, 2023</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                        Completed
                      </span>
                    </div>
                    
                    <div className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Backend Optimization</h4>
                        <p className="text-sm text-muted-foreground">In progress</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                        In Progress
                      </span>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="skills">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-taskmate-purple/10 text-taskmate-purple rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-taskmate-purple/10 text-taskmate-purple rounded-full text-sm">TypeScript</span>
                    <span className="px-3 py-1 bg-taskmate-purple/10 text-taskmate-purple rounded-full text-sm">Node.js</span>
                    <span className="px-3 py-1 bg-taskmate-purple/10 text-taskmate-purple rounded-full text-sm">UI/UX Design</span>
                    <span className="px-3 py-1 bg-taskmate-purple/10 text-taskmate-purple rounded-full text-sm">API Development</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">TaskMate Mobile App</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Worked on developing the mobile version of TaskMate using React Native
                      </p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Analytics Dashboard</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Built interactive charts and data visualization tools for the analytics section
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="eods">
                <EodHistoryTab userId={member.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MemberProfile;
