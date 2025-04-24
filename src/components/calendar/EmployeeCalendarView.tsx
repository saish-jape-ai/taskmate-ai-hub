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
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUp, Bell, Bot, CheckCircle, CalendarDays, Calendar as CalendarIcon, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { format, isSameDay, isToday, isBefore, isAfter, addDays } from "date-fns";

interface EmployeeCalendarViewProps {
  view: "day" | "week" | "month";
  onDateSelect?: (date: Date) => void;
  onEODRequest?: () => void;
}

// Mock data - in a real app, this would be fetched from an API
const TASKS = [
  { 
    id: 1, 
    title: "Research user interactions", 
    description: "Analyze user interactions with the dashboard to identify pain points and opportunities for improvement.",
    status: "pending",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)), // Two days from now
    priority: "high"
  },
  { 
    id: 2, 
    title: "Create wireframes for new feature", 
    description: "Design low-fidelity wireframes for the new analytics feature based on the requirements document.",
    status: "in_progress",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)), // Three days from now
    priority: "medium"
  },
  { 
    id: 3, 
    title: "Fix login bug", 
    description: "Investigate and fix the reported issue with login authentication on mobile devices.",
    status: "completed",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
    priority: "low"
  },
];

// Mock EOD data
const EOD_SUBMISSIONS = [
  { 
    date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
    submitted: true,
    submissionTime: "5:30 PM",
    onTime: true,
    mood: "happy"
  },
  { 
    date: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
    submitted: true,
    submissionTime: "6:15 PM",
    onTime: false,
    mood: "neutral"
  },
  { 
    date: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
    submitted: false,
    onTime: false,
    mood: "sad"
  },
];

export const EmployeeCalendarView = ({ view, onDateSelect, onEODRequest }: EmployeeCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isEodDialogOpen, setIsEodDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [highlightMissedEODs, setHighlightMissedEODs] = useState(true);
  const [showMoodTracking, setShowMoodTracking] = useState(true);
  
  // Function to handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect && onDateSelect(date);
    }
  };

  const handleSubmitEod = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("EOD report submitted successfully!");
    setIsEodDialogOpen(false);
    onEODRequest && onEODRequest();
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
    
    // This would integrate with the Gemini API in a real app
    // const apiKey = "AIzaSyCG90NNFEDkEDHHRObPaZb69iNpZlGbWk4"; 
    // const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`...
    
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
  
  // Helper function to determine if a date has a missed EOD
  const hasMissedEOD = (date: Date) => {
    if (isToday(date) || isAfter(date, new Date())) return false;
    
    const eodForDate = EOD_SUBMISSIONS.find(eod => isSameDay(eod.date, date));
    return !eodForDate || !eodForDate.submitted;
  };
  
  // Helper function to get the mood for a date
  const getMoodForDate = (date: Date) => {
    const eodForDate = EOD_SUBMISSIONS.find(eod => isSameDay(eod.date, date));
    return eodForDate?.mood || null;
  };
  
  // Modified renderDay function to fix type errors
  const renderDay = (day: Date, selectedDay: Date | undefined, dayProps: Record<string, any>) => {
    const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
    const missedEOD = highlightMissedEODs && hasMissedEOD(day);
    const mood = showMoodTracking ? getMoodForDate(day) : null;
    
    // Check if there are tasks due on this day
    const hasTasks = TASKS.some(task => isSameDay(task.dueDate, day));
    
    // Create the day content
    return (
      <div className={`relative w-full h-full ${isSelected ? 'bg-taskmate-purple text-white' : ''}`}>
        <div {...dayProps}>
          {format(day, "d")}
        </div>
        
        {/* Task indicator */}
        {hasTasks && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center">
            <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-taskmate-purple'}`}></div>
          </div>
        )}
        
        {/* Missed EOD indicator */}
        {missedEOD && (
          <div className="absolute top-0 right-0">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
          </div>
        )}
        
        {/* Mood indicator */}
        {mood && (
          <div className="absolute bottom-1 right-1">
            <span className="text-xs">
              {mood === 'happy' && '😊'}
              {mood === 'neutral' && '😐'}
              {mood === 'sad' && '😔'}
            </span>
          </div>
        )}
      </div>
    );
  };
  
  // Filter tasks for the current date
  const tasksForSelectedDate = selectedDate 
    ? TASKS.filter(task => isSameDay(task.dueDate, selectedDate)) 
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Action Panel */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">My Calendar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90"
            onClick={onEODRequest}
          >
            <FileText className="mr-2 h-4 w-4" /> Submit EOD Report
          </Button>

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
          
          {/* Display settings */}
          <div className="border rounded-md p-3 space-y-3">
            <h3 className="text-sm font-medium">Display Settings</h3>
            <div className="flex items-center justify-between">
              <label htmlFor="missed-eods" className="text-sm">Show Missed EODs</label>
              <input 
                id="missed-eods" 
                type="checkbox" 
                checked={highlightMissedEODs} 
                onChange={(e) => setHighlightMissedEODs(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-taskmate-purple focus:ring-taskmate-purple"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="mood-tracking" className="text-sm">Show Mood Tracking</label>
              <input 
                id="mood-tracking" 
                type="checkbox" 
                checked={showMoodTracking} 
                onChange={(e) => setShowMoodTracking(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-taskmate-purple focus:ring-taskmate-purple"
              />
            </div>
          </div>

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
              {TASKS
                .filter(task => task.status !== 'completed' && isAfter(task.dueDate, new Date()))
                .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
                .slice(0, 3)
                .map((task, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-24">
                      {isToday(task.dueDate) 
                        ? 'Today' 
                        : isSameDay(task.dueDate, addDays(new Date(), 1)) 
                          ? 'Tomorrow'
                          : `In ${Math.ceil((task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`
                      }:
                    </span>
                    {task.title}
                  </li>
                ))}
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
          <div className="bg-gray-50 p-6 rounded-md border">
            {/* Calendar Component */}
            <div className="mb-6">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="mx-auto max-w-md"
                components={{
                  Day: (props) => renderDay(props.date, selectedDate, props)
                }}
              />
            </div>
            
            {/* Tasks for Selected Date */}
            <div className="mt-6">
              <h3 className="font-medium text-lg mb-3">
                Tasks for {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Today'}
              </h3>
              
              {tasksForSelectedDate.length > 0 ? (
                <div className="space-y-2">
                  {tasksForSelectedDate.map((task) => (
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
                        Due: {format(task.dueDate, 'MMM d, yyyy')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-md border">
                  <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No tasks scheduled for this day</p>
                  <Button variant="link" className="mt-2">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate task suggestions
                  </Button>
                </div>
              )}
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
                  <p className="text-sm text-gray-700">{format(selectedTask.dueDate, 'MMM d, yyyy')}</p>
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
