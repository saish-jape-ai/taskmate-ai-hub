
import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Send, Clock } from "lucide-react";
import { toast } from "sonner";

interface TeamLeaderCalendarViewProps {
  view: "day" | "week" | "month";
}

export const TeamLeaderCalendarView = ({ view }: TeamLeaderCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMember, setSelectedMember] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);

  // Mock data for the filters
  const teamMembers = [
    { id: "emp1", name: "John Doe" },
    { id: "emp2", name: "Jane Smith" },
    { id: "emp3", name: "Robert Johnson" },
  ];

  const priorities = [
    { id: "low", name: "Low", color: "bg-green-100 text-green-800" },
    { id: "medium", name: "Medium", color: "bg-yellow-100 text-yellow-800" },
    { id: "high", name: "High", color: "bg-red-100 text-red-800" },
  ];

  // Mock tasks data
  const tasks = [
    { 
      id: 1, 
      title: "Complete project proposal", 
      assignee: "John Doe", 
      status: "pending",
      dueDate: "2025-05-02",
      priority: "high"
    },
    { 
      id: 2, 
      title: "Review design mockups", 
      assignee: "Jane Smith",
      status: "in_progress",
      dueDate: "2025-05-03",
      priority: "medium"
    },
    { 
      id: 3, 
      title: "Deploy backend updates", 
      assignee: "Robert Johnson",
      status: "completed",
      dueDate: "2025-05-01",
      priority: "low"
    },
  ];

  const handleCreateTask = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Task created successfully!");
    setIsTaskDialogOpen(false);
  };

  const handleSendReminder = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Reminder sent successfully!");
    setIsReminderDialogOpen(false);
  };

  const handleCheckEODStatus = () => {
    toast.success("Checking EOD statuses...");
    // This would fetch EOD data in a real app
    setTimeout(() => {
      toast.success("EOD status checked: 3/5 team members have submitted their EOD reports");
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Filters Panel */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Team Calendar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member-filter">Team Member</Label>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger id="member-filter">
                <SelectValue placeholder="Select Member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority-filter">Priority</Label>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger id="priority-filter">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {priorities.map((priority) => (
                  <SelectItem key={priority.id} value={priority.id}>
                    {priority.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 pt-4">
            <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task and assign it to a team member.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTask} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-title">Task Title</Label>
                    <Input id="task-title" placeholder="Enter task title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-description">Description</Label>
                    <Textarea id="task-description" placeholder="Task description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-assignee">Assignee</Label>
                    <Select defaultValue="emp1">
                      <SelectTrigger id="task-assignee">
                        <SelectValue placeholder="Select Assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-priority">Priority</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="task-priority">
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority.id} value={priority.id}>
                            {priority.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="task-due-date">Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          {selectedDate ? selectedDate.toDateString() : "Select due date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-taskmate-purple hover:bg-taskmate-purple/90">
                      Create Task
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Send Reminder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Custom Reminder</DialogTitle>
                  <DialogDescription>
                    Send a custom reminder to team members.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSendReminder} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reminder-recipients">Recipients</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="reminder-recipients">
                        <SelectValue placeholder="Select Recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Team Members</SelectItem>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reminder-subject">Subject</Label>
                    <Input id="reminder-subject" placeholder="Reminder subject" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reminder-message">Message</Label>
                    <Textarea id="reminder-message" placeholder="Reminder message" required />
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      Send Reminder
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleCheckEODStatus}
            >
              <Clock className="mr-2 h-4 w-4" /> Check EOD Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg">Team Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-md border min-h-[500px]">
            {/* This would be replaced with a real calendar component in a production app */}
            <div className="text-center text-gray-500">
              <p className="mb-4">Team calendar view would be displayed here with color-coded tasks.</p>
              <p>View mode: <strong>{view}</strong></p>
              <p className="mt-4">Sample Tasks:</p>
              
              <div className="mt-4 space-y-2">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white p-3 rounded-md border flex justify-between items-center">
                    <div className="text-left">
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="text-sm text-gray-500">
                        Assigned to: {task.assignee} | Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={priorities.find(p => p.id === task.priority)?.color}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
            <h3 className="text-sm font-medium text-blue-600 mb-2">AI Scheduling Recommendations</h3>
            <ul className="text-sm space-y-2">
              <li>Jane has too many high-priority tasks this week - consider reassigning or extending deadlines</li>
              <li>John and Robert both have availability next Tuesday afternoon for team meeting</li>
              <li>Based on previous work patterns, morning tasks are completed faster for this team</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
