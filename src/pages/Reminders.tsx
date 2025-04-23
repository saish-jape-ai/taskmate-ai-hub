
import AppLayout from "@/components/AppLayout";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { users } from "@/data/mockData";
import { Bell, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Reminders = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [selectedMembers, setSelectedMembers] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [showSent, setShowSent] = useState(false);

  const teamMembers = users.filter(
    (user) => user.teamId === currentUser?.teamId && user.role !== "team_leader"
  );

  const handleSelectAll = () => {
    const newSelected: Record<string, boolean> = {};
    teamMembers.forEach((member) => {
      newSelected[member.id] = true;
    });
    setSelectedMembers(newSelected);
  };

  const handleUnselectAll = () => {
    setSelectedMembers({});
  };

  const handleCheckMember = (memberId: string, isChecked: boolean) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [memberId]: isChecked,
    }));
  };

  const handleSendReminders = () => {
    // Validate inputs
    if (!title.trim()) {
      toast({ 
        title: "Missing title",
        description: "Please enter a reminder title",
        variant: "destructive"
      });
      return;
    }

    if (!message.trim()) {
      toast({ 
        title: "Missing message", 
        description: "Please enter a reminder message",
        variant: "destructive"
      });
      return;
    }

    const selectedIds = Object.keys(selectedMembers).filter(id => selectedMembers[id]);
    if (selectedIds.length === 0) {
      toast({ 
        title: "No recipients selected", 
        description: "Please select at least one team member",
        variant: "destructive"
      });
      return;
    }

    // Send reminders (simulate API call)
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setShowSent(true);
      toast({ 
        title: "Reminders sent",
        description: `Sent to ${selectedIds.length} team member${selectedIds.length > 1 ? "s" : ""}`
      });
      
      // Reset form after short delay for better UX
      setTimeout(() => {
        setTitle("");
        setMessage("");
        setPriority("normal");
        setSelectedMembers({});
        setShowSent(false);
      }, 2000);
    }, 1500);
  };

  return (
    <AppLayout title="Send Reminders">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 font-bold text-2xl mb-6">
          <Bell className="h-7 w-7 text-taskmate-purple" />
          Send Reminders
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block font-medium mb-2">Reminder Title</label>
              <Input
                placeholder="E.g., 'EOD submission reminder', 'Team meeting tomorrow'"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Message</label>
              <Textarea
                placeholder="Enter your reminder message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Select Recipients</label>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={handleSelectAll}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleUnselectAll}>
                    Clear
                  </Button>
                </div>
              </div>
              
              <Card className="p-2 max-h-[240px] overflow-y-auto border">
                {teamMembers.length > 0 ? (
                  <div className="space-y-2">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center p-2 hover:bg-muted rounded">
                        <Checkbox
                          id={`member-${member.id}`}
                          checked={!!selectedMembers[member.id]}
                          onCheckedChange={(checked) => handleCheckMember(member.id, !!checked)}
                          className="mr-3"
                        />
                        <div className="flex items-center gap-3 flex-1">
                          <img
                            src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=9b87f5&color=fff`}
                            alt={member.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <label htmlFor={`member-${member.id}`} className="flex flex-col cursor-pointer">
                            <span className="font-medium">{member.name}</span>
                            <span className="text-xs text-muted-foreground">{member.email}</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-muted-foreground">
                    No team members found
                  </div>
                )}
              </Card>
            </div>

            <Button
              className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90"
              onClick={handleSendReminders}
              disabled={sending}
            >
              {sending ? (
                <span className="flex items-center">Sending Reminders...</span>
              ) : showSent ? (
                <span className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4" /> Reminders Sent
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="mr-2 h-4 w-4" /> Send Reminders
                </span>
              )}
            </Button>
          </div>
        </Card>

        <Card className="mt-6 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Reminders</h3>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Weekly Report Submission</h4>
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                  Normal
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Please submit your weekly report by Friday 5PM</p>
              <p className="text-xs text-muted-foreground mt-2">Sent 2 days ago • 5 recipients</p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Team Meeting Reminder</h4>
                <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">
                  High
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Don't forget our team meeting tomorrow at 10AM in the main conference room</p>
              <p className="text-xs text-muted-foreground mt-2">Sent 1 week ago • 8 recipients</p>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Reminders;
