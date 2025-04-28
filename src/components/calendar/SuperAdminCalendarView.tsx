
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
import { PlusCircle, AlertCircle, Download } from "lucide-react";
import { toast } from "sonner";

interface SuperAdminCalendarViewProps {
  view: "day" | "week" | "month";
}

export const SuperAdminCalendarView = ({ view }: SuperAdminCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  // Mock data for the filters
  const teams = [
    { id: "team1", name: "PYTHON_FASTAPI" },
    { id: "team2", name: "PYTHON_AI" },
    { id: "team3", name: "PYTHON_ML" },
    { id: "team4", name: "REACT" },
  ];

  const statuses = [
    { id: "pending", name: "Pending" },
    { id: "in_progress", name: "In Progress" },
    { id: "completed", name: "Completed" },
    { id: "overdue", name: "Overdue" },
  ];

  const employees = [
    { id: "emp1", name: "Saish Jape" },
    { id: "emp2", name: "Jagdish Pagar" },
    { id: "emp3", name: "Sahil Wable" },
  ];

  // AI bottlenecks prediction
  const aiBottlenecks = [
    { id: 1, date: "2025-05-01", message: "Too many tasks assigned to Design Team this week" },
    { id: 2, date: "2025-05-05", message: "Development Team has parallel deadlines on this day" },
    { id: 3, date: "2025-05-12", message: "Marketing campaign conflicts with product launch" },
  ];

  const handleCreateEvent = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Organization event created successfully!");
    setIsEventDialogOpen(false);
  };
  
  const handleGenerateReport = () => {
    toast.success("Generating calendar report...");
    // In a real app, this would generate and download a report
    setTimeout(() => {
      toast.success("Report generated and downloaded!");
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Filters Panel */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Calendar Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="team-filter">Team</Label>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger id="team-filter">
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-filter">Task Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employee-filter">Employee</Label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger id="employee-filter">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 pt-4">
            <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Organization Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Organization Event</DialogTitle>
                  <DialogDescription>
                    Add a new event to the organization calendar.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input id="event-title" placeholder="Enter event title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
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
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea id="event-description" placeholder="Event description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-teams">Teams</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="event-teams">
                        <SelectValue placeholder="Select Teams" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Teams</SelectItem>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-taskmate-purple hover:bg-taskmate-purple/90">
                      Create Event
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleGenerateReport}
            >
              <Download className="mr-2 h-4 w-4" /> Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg">Global Calendar View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-md mb-4 border border-red-200">
            <h3 className="text-sm font-medium flex items-center text-red-600 mb-2">
              <AlertCircle className="h-4 w-4 mr-2" />
              AI Predicted Bottlenecks
            </h3>
            <ul className="text-sm space-y-2">
              {aiBottlenecks.map((bottleneck) => (
                <li key={bottleneck.id} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>
                    <strong>{new Date(bottleneck.date).toLocaleDateString()}</strong>: {bottleneck.message}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-md border min-h-[500px]">
            {/* This would be replaced with a real calendar component in a production app */}
            <div className="text-center text-gray-500">
              <p className="mb-4">Calendar component would be displayed here with tasks and events.</p>
              <p>View mode: <strong>{view}</strong></p>
              <p>Selected filters:</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>Team: {selectedTeam === "all" ? "All Teams" : teams.find(t => t.id === selectedTeam)?.name}</li>
                <li>Status: {selectedStatus === "all" ? "All Statuses" : statuses.find(s => s.id === selectedStatus)?.name}</li>
                <li>Employee: {selectedEmployee === "all" ? "All Employees" : employees.find(e => e.id === selectedEmployee)?.name}</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
            <h3 className="text-sm font-medium text-blue-600 mb-2">AI Scheduling Suggestions</h3>
            <ul className="text-sm space-y-2">
              <li>Consider rescheduling the marketing team meeting to avoid conflict with product demo</li>
              <li>Development team is overloaded on Thursdays - distribute tasks more evenly</li>
              <li>Design team has capacity for additional tasks on Mondays</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
