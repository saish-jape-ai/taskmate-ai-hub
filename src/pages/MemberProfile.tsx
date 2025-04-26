
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { users } from '@/data/mockData';
import AppLayout from '@/components/AppLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Calendar, MessageSquare, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EodHistoryTab } from '@/components/eod/EodHistoryTab';

import MemberPerformanceMetrics from "@/components/team/MemberPerformanceMetrics";
import MemberTasksList from "@/components/team/MemberTasksList";

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
    <div className="max-w-7xl mx-auto px-4">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
              <Button onClick={() => navigate(`/chat/${member.id}`)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                EODs
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="performance">
            <TabsList className="w-full">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="eods">EOD Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="mt-6">
              <MemberPerformanceMetrics userId={member.id} />
            </TabsContent>

            <TabsContent value="tasks" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <MemberTasksList userId={member.id} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="eods" className="mt-6">
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
