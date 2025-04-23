
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Clock, CheckCircle, Send, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { users } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Reminders = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const teamMembers = users.filter((user) => 
    user.teamId === currentUser?.teamId && 
    user.role !== "team_leader"
  );

  // Sample reminders data (in a real app, this would come from API/database)
  const sentReminders = [
    {
      id: "1",
      memberId: teamMembers[0]?.id || "",
      subject: "EOD Submission Reminder",
      message: "Please submit your EOD report for today before leaving.",
      timestamp: "2025-04-23T17:00:00",
      status: "delivered"
    },
    {
      id: "2",
      memberId: teamMembers[1]?.id || "",
      subject: "Weekly Report Due",
      message: "Kindly prepare and submit the weekly progress report by tomorrow.",
      timestamp: "2025-04-22T10:30:00",
      status: "read"
    }
  ];

  const scheduledReminders = [
    {
      id: "3",
      memberId: teamMembers[0]?.id || "",
      subject: "Project Deadline",
      message: "The UI redesign project deadline is tomorrow. Please ensure all tasks are completed.",
      scheduledFor: "2025-04-24T09:00:00",
      status: "scheduled"
    }
  ];

  const getMemberDetails = (memberId: string) => {
    return users.find(user => user.id === memberId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const handleSendReminder = () => {
    if (!subject || !message || !selectedMemberId) {
      toast.error("Please fill all fields");
      return;
    }
    
    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Reminder sent successfully!");
      setSubject("");
      setMessage("");
      setSelectedMemberId("");
      setIsCreating(false);
    }, 1000);
  };

  const handleViewProfile = (memberId: string) => {
    navigate(`/member-profile/${memberId}`);
  };

  const handleChat = (memberId: string) => {
    navigate(`/chat/${memberId}`);
  };

  return (
    <AppLayout title="Reminders">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-taskmate-purple/10 flex items-center justify-center">
            <Bell className="h-5 w-5 text-taskmate-purple" />
          </div>
          <h1 className="text-2xl font-bold">Team Reminders</h1>
        </div>

        <Tabs defaultValue="create">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="create">Create Reminder</TabsTrigger>
            <TabsTrigger value="sent">Sent Reminders</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Reminder</CardTitle>
                <CardDescription>Send a reminder to a team member</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Team Member</label>
                  <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map(member => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {member.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter reminder subject"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your reminder message"
                    rows={5}
                  />
                </div>

                <Button 
                  onClick={handleSendReminder} 
                  disabled={isCreating} 
                  className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isCreating ? "Sending Reminder..." : "Send Reminder"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sent">
            <div className="space-y-4">
              {sentReminders.length > 0 ? (
                sentReminders.map(reminder => {
                  const member = getMemberDetails(reminder.memberId);
                  return (
                    <Card key={reminder.id} className="overflow-hidden">
                      <div className="flex gap-4 p-6">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member?.avatar} alt={member?.name} />
                          <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{reminder.subject}</h3>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(reminder.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">To: {member?.name}</p>
                          <p className="mt-2 text-sm">{reminder.message}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs">
                              <span className={`px-2 py-0.5 rounded-full ${
                                reminder.status === 'delivered' 
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              }`}>
                                {reminder.status === 'delivered' ? 'Delivered' : 'Read'}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleChat(reminder.memberId)}
                              >
                                <User className="h-3.5 w-3.5 mr-1" />
                                Chat
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleViewProfile(reminder.memberId)}
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                  <h3 className="text-lg font-medium mb-1">No reminders sent yet</h3>
                  <p className="text-muted-foreground">
                    Create a new reminder to notify your team members
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="scheduled">
            <div className="space-y-4">
              {scheduledReminders.length > 0 ? (
                scheduledReminders.map(reminder => {
                  const member = getMemberDetails(reminder.memberId);
                  return (
                    <Card key={reminder.id} className="overflow-hidden">
                      <div className="flex gap-4 p-6">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member?.avatar} alt={member?.name} />
                          <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{reminder.subject}</h3>
                            <div className="flex items-center gap-1 text-xs">
                              <Calendar className="h-3 w-3 text-amber-500" />
                              <span className="text-muted-foreground">
                                Scheduled: {formatDate(reminder.scheduledFor)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">To: {member?.name}</p>
                          <p className="mt-2 text-sm">{reminder.message}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs">
                              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                                Scheduled
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleViewProfile(reminder.memberId)}
                              >
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                  <h3 className="text-lg font-medium mb-1">No scheduled reminders</h3>
                  <p className="text-muted-foreground">
                    Schedule reminders to be sent at a later time
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Reminders;
