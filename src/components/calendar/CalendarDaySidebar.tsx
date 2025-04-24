
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CheckCheck, FileText, Sparkles, CheckCircle2, FileImage, FileSpreadsheet, FileEdit, Calendar as CalendarIcon, X, PlusCircle } from "lucide-react";
import { DailySummary } from "./DailySummary";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface CalendarDaySidebarProps {
  date: Date;
  onClose: () => void;
  onEODRequest: () => void;
}

interface TimeLog {
  id: string;
  time: string;
  type: "clock-in" | "clock-out" | "task-start" | "task-complete" | "eod-submit";
  taskId?: string;
  taskName?: string;
}

export const CalendarDaySidebar = ({ date, onClose, onEODRequest }: CalendarDaySidebarProps) => {
  const { currentUser } = useAuth();
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [eodSubmitted, setEodSubmitted] = useState(false);
  
  const isToday = new Date().toDateString() === date.toDateString();
  
  // Mock data - in a real app this would be fetched from an API
  useEffect(() => {
    // Simulate fetching time logs for the selected date
    const mockTimeLogs: TimeLog[] = [
      { id: '1', time: '09:00 AM', type: 'clock-in' },
      { id: '2', time: '09:15 AM', type: 'task-start', taskId: 't1', taskName: 'Research user interactions' },
      { id: '3', time: '11:30 AM', type: 'task-complete', taskId: 't1', taskName: 'Research user interactions' },
      { id: '4', time: '11:45 AM', type: 'task-start', taskId: 't2', taskName: 'Create wireframes' },
      { id: '5', time: '02:30 PM', type: 'task-complete', taskId: 't2', taskName: 'Create wireframes' },
      { id: '6', time: '05:30 PM', type: 'eod-submit' },
      { id: '7', time: '05:45 PM', type: 'clock-out' },
    ];
    
    const today = new Date().toDateString();
    const selectedDate = date.toDateString();
    
    // Only show mock data for past dates, not for future dates
    if (new Date(selectedDate) <= new Date(today)) {
      setTimeLogs(mockTimeLogs);
      const clockIn = mockTimeLogs.find(log => log.type === 'clock-in');
      const clockOut = mockTimeLogs.find(log => log.type === 'clock-out');
      const eodSubmit = mockTimeLogs.find(log => log.type === 'eod-submit');
      
      if (clockIn) {
        setClockedIn(true);
        setClockInTime(clockIn.time);
      } else {
        setClockedIn(false);
        setClockInTime(null);
      }
      
      setClockOutTime(clockOut?.time || null);
      setEodSubmitted(!!eodSubmit);
    } else {
      setTimeLogs([]);
      setClockedIn(false);
      setClockInTime(null);
      setClockOutTime(null);
      setEodSubmitted(false);
    }
  }, [date]);
  
  const handleClockIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newLog: TimeLog = {
      id: Date.now().toString(),
      time: timeString,
      type: 'clock-in'
    };
    
    setTimeLogs([...timeLogs, newLog]);
    setClockedIn(true);
    setClockInTime(timeString);
    toast.success("You've clocked in successfully!");
  };
  
  const handleClockOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newLog: TimeLog = {
      id: Date.now().toString(),
      time: timeString,
      type: 'clock-out'
    };
    
    setTimeLogs([...timeLogs, newLog]);
    setClockOutTime(timeString);
    toast.success("You've clocked out successfully!");
  };
  
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto" side="right">
        <SheetHeader className="flex flex-row justify-between items-center pb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
            <SheetTitle>
              {format(date, "MMMM d, yyyy")}
              {isToday && <Badge variant="outline" className="ml-2">Today</Badge>}
            </SheetTitle>
          </div>
          
          <div className="flex items-center gap-2">
            {isToday && !clockedIn && (
              <Button size="sm" variant="outline" className="bg-green-100 hover:bg-green-200 text-green-800" onClick={handleClockIn}>
                <Clock className="mr-2 h-4 w-4" />
                Clock In
              </Button>
            )}
            
            {isToday && clockedIn && !clockOutTime && (
              <Button size="sm" variant="outline" className="bg-red-100 hover:bg-red-200 text-red-800" onClick={handleClockOut}>
                <Clock className="mr-2 h-4 w-4" />
                Clock Out
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <div className="space-y-6">
          {/* Clock In/Out Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Clock In:</span>
                  <span className="text-sm">{clockInTime || 'Not clocked in'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Clock Out:</span>
                  <span className="text-sm">{clockOutTime || 'Not clocked out'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Daily Timeline */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Daily Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {timeLogs.length > 0 ? (
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                  {timeLogs.map((log) => (
                    <li key={log.id} className="mb-5 ml-4">
                      <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                      <time className="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">{log.time}</time>
                      <div className="text-sm font-semibold">
                        {log.type === 'clock-in' && 'Clocked In'}
                        {log.type === 'clock-out' && 'Clocked Out'}
                        {log.type === 'eod-submit' && 'EOD Report Submitted'}
                        {(log.type === 'task-start' || log.type === 'task-complete') && log.taskName}
                      </div>
                      {(log.type === 'task-start' || log.type === 'task-complete') && (
                        <p className="text-xs text-gray-500">
                          {log.type === 'task-start' ? 'Started working on task' : 'Completed task'}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2">No activity recorded for this day</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* EOD Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md">EOD Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                {eodSubmitted ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">EOD Report submitted</p>
                      <p className="text-xs text-muted-foreground">
                        Submitted at {timeLogs.find(log => log.type === 'eod-submit')?.time || '5:30 PM'}
                      </p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm mb-3">No EOD report submitted for this day</p>
                    <Button 
                      onClick={onEODRequest}
                      className="bg-taskmate-purple hover:bg-taskmate-purple/90"
                      disabled={!isToday}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {isToday ? "Submit EOD" : "EOD Not Available"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Daily AI Summary */}
          <DailySummary date={date} />
          
          {/* Personal Notes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center justify-between">
                <span>Personal Notes</span>
                <Button size="sm" variant="ghost">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">Add Note</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-md p-3 text-sm italic text-gray-600 dark:text-gray-300">
                <p>Remember to follow up with the design team about the new wireframes tomorrow.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};
