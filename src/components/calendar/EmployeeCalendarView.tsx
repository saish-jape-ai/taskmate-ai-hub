
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
import { FileUp, Bell, Bot, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface EmployeeCalendarViewProps {
  view: "day" | "week" | "month";
}

export const EmployeeCalendarView = ({ view }: EmployeeCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isEodDialogOpen, setIsEodDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  // Mock tasks data
  const tasks = [
    { 
      id: 1, 
      title: "Research user interactions", 
      description: "Analyze user interactions with the dashboard to identify pain points and opportunities for improvement.",
      status: "pending",
      dueDate: "2025-05-02",
      priority: "high"
    },
    { 
      id: 2, 
      title: "Create wireframes for new feature", 
      description: "Design low-fidelity wireframes for the new analytics feature based on the requirements document.",
      status: "in_progress",
      dueDate: "2025-05-03",
      priority: "medium"
    },
    { 
      id: 3, 
      title: "Fix login bug", 
      description: "Investigate and fix the reported issue with login authentication on mobile devices.",
      status: "completed",
      dueDate: "2025-05-01",
      priority: "low"
    },
  ];

  const handleSubmitEod = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("EOD report submitted successfully!");
    setIsEodDialogOpen(false);
  };

  const handleSetReminder = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Personal reminder set successfully!");
    setIsReminderDialogOpen(false);
  };

  const handleMarkComplete = () => {
    if (!selectedTask) return;
    
    toast.success(`Task "${selectedTask.title}" marked as complete!`);
    setShowTaskDetails(false);
    setSelectedTask(null);
  };

  const handleGenerateAITaskPlan = () => {
    toast.success("Generating AI task plan...");
    // This would integrate with an AI API in a real app
    setTimeout(() => {
      toast.success("Your AI-optimized task plan is ready!");
    }, 1500);
  };

  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Action Panel */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">My Calendar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dialog open={isEodDialogOpen} onOpenChange={setIsEodDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90">
                <FileUp className="mr-2 h-4 w-4" /> Submit EOD Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit EOD Report</DialogTitle>
                <DialogDescription>
                  Summarize your tasks and accomplishments for today.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitEod} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eod-date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        {selectedDate ? selectedDate.toDateString() : "Select date"}
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
                <div className="space-y-2">
                  <Label htmlFor="eod-summary">Summary</Label>
                  <Textarea id="eod-summary" placeholder="Summarize your work today" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eod-completed">Completed Tasks</Label>
                  <Textarea id="eod-completed" placeholder="List completed tasks" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eod-blockers">Blockers</Label>
                  <Textarea id="eod-blockers" placeholder="Any blockers or challenges?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eod-plan">Tomorrow's Plan</Label>
                  <Textarea id="eod-plan" placeholder="What's your plan for tomorrow?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eod-attachments">Attachments</Label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PDF, DOC, JPG, PNG (MAX. 10MB)
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" multiple />
                    </label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-taskmate-purple hover:bg-taskmate-purple/90">
                    Submit EOD
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Bell className="mr-2 h-4 w-4" /> Set Personal Reminder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Personal Reminder</DialogTitle>
                <DialogDescription>
                  Create a personal reminder for yourself.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSetReminder} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reminder-title">Reminder Title</Label>
                  <Input id="reminder-title" placeholder="Enter reminder title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminder-date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        {selectedDate ? selectedDate.toDateString() : "Select date"}
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
                <div className="space-y-2">
                  <Label htmlFor="reminder-time">Time</Label>
                  <Input id="reminder-time" type="time" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminder-note">Note</Label>
                  <Textarea id="reminder-note" placeholder="Add a note to your reminder" />
                </div>
                <DialogFooter>
                  <Button type="submit">
                    Set Reminder
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGenerateAITaskPlan}
          >
            <Bot className="mr-2 h-4 w-4" /> Generate AI Task Plan
          </Button>

          <div className="p-4 bg-blue-50 rounded-md border border-blue-200 mt-4">
            <h3 className="text-sm font-medium text-blue-600 mb-2">AI Smart Planning</h3>
            <p className="text-xs text-blue-700 mb-2">Based on your work patterns, here's your optimized schedule:</p>
            <ul className="text-xs space-y-2">
              <li className="flex items-center"><span className="w-16">9:00 AM:</span> Focus time for creative tasks</li>
              <li className="flex items-center"><span className="w-16">11:00 AM:</span> Team stand-up meeting</li>
              <li className="flex items-center"><span className="w-16">1:00 PM:</span> Break & lunch</li>
              <li className="flex items-center"><span className="w-16">2:00 PM:</span> Complete debugging tasks</li>
              <li className="flex items-center"><span className="w-16">4:00 PM:</span> Documentation & EOD prep</li>
            </ul>
          </div>

          <div className="p-4 bg-red-50 rounded-md border border-red-200">
            <h3 className="text-sm font-medium text-red-600 mb-2">Upcoming Deadlines</h3>
            <ul className="text-xs space-y-2">
              <li className="flex items-center">
                <span className="w-24">Tomorrow:</span> Research user interactions
              </li>
              <li className="flex items-center">
                <span className="w-24">In 2 days:</span> Create wireframes for new feature
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg">My Task Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-md border min-h-[500px]">
            {/* This would be replaced with a real calendar component in a production app */}
            <div className="text-gray-500">
              <p className="mb-4 text-center">Employee calendar view would be displayed here with assigned tasks.</p>
              <p className="text-center">View mode: <strong>{view}</strong></p>
              <p className="mt-4 mb-2 font-medium">My Tasks:</p>
              
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="bg-white p-3 rounded-md border cursor-pointer hover:border-taskmate-purple transition-colors"
                    onClick={() => handleViewTask(task)}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Details Dialog */}
      <Dialog open={showTaskDetails} onOpenChange={setShowTaskDetails}>
        <DialogContent className="max-w-md">
          {selectedTask && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTask.title}</DialogTitle>
                <div className="flex gap-2 mt-2">
                  <Badge className={getStatusColor(selectedTask.status)}>
                    {selectedTask.status.replace('_', ' ')}
                  </Badge>
                  <Badge className={getPriorityColor(selectedTask.priority)}>
                    {selectedTask.priority}
                  </Badge>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Description</h4>
                  <p className="text-sm text-gray-700">{selectedTask.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Due Date</h4>
                  <p className="text-sm text-gray-700">{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-md mt-4">
                <div className="flex items-center mb-2">
                  <Bot className="h-4 w-4 mr-2 text-blue-700" />
                  <h4 className="text-sm font-semibold text-blue-700">AI Assistance</h4>
                </div>
                <p className="text-xs text-blue-700">
                  This task appears to require wireframing skills. Based on your previous work, 
                  consider using Figma templates you created last month for faster completion.
                  Similar tasks took you approximately 3 hours to complete.
                </p>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowTaskDetails(false);
                    setSelectedTask(null);
                  }}
                >
                  Close
                </Button>
                {selectedTask.status !== 'completed' && (
                  <Button 
                    className="bg-taskmate-purple hover:bg-taskmate-purple/90"
                    onClick={handleMarkComplete}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Mark Complete
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
