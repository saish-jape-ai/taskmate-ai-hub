
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Search, CalendarIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { format } from 'date-fns';

// Mock users data for the dropdown
const mockUsers = [
  { id: "1", name: "Sahil Wable", email: "sahil.wable@gmail.com" },
  { id: "2", name: "Jagdish Pagar", email: "jagdish.pagar@gmail.com" },
  { id: "3", name: "Saish Jape", email: "saish.jape@gmail.com" },
];

const ReminderForm = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('medium');
  const [repeat, setRepeat] = useState('none');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Reminder created",
      description: "Your reminder has been scheduled successfully.",
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter reminder title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter reminder details"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="assignee">Assignee</Label>
        <Select value={assignee} onValueChange={setAssignee}>
          <SelectTrigger>
            <SelectValue placeholder="Select team member" />
          </SelectTrigger>
          <SelectContent>
            {mockUsers.map(user => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="repeat">Repeat</Label>
          <Select value={repeat} onValueChange={setRepeat}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Don't repeat</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Create Reminder
        </Button>
      </div>
    </form>
  );
};

const Reminders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const reminders = [
    {
      id: 1,
      title: 'Submit EOD Report',
      recipient: 'John Doe',
      status: 'sent',
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Weekly Update',
      recipient: 'Sarah Smith',
      status: 'scheduled',
      timestamp: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    },
  ];

  const handleDelete = (id: number) => {
    toast({
      title: "Reminder deleted",
      description: "The reminder has been successfully deleted.",
    });
  };

  const filteredReminders = reminders.filter(reminder => 
    reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reminder.recipient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout title="Reminders">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bell className="h-7 w-7 text-taskmate-purple" />
            <div>
              <h1 className="text-2xl font-bold">Reminders</h1>
              <p className="text-muted-foreground">Manage team notifications and reminders</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-5 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reminders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Reminder
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Reminder</DialogTitle>
                </DialogHeader>
                <ReminderForm onClose={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredReminders.map((reminder) => (
            <Card key={reminder.id}>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{reminder.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">To: {reminder.recipient}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDelete(reminder.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between text-sm">
                  <Badge variant={reminder.status === 'sent' ? 'default' : 'secondary'} className="capitalize">
                    {reminder.status}
                  </Badge>
                  <span className="text-muted-foreground">
                    {new Date(reminder.timestamp).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredReminders.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No reminders found</h3>
              <p className="text-muted-foreground mt-1">Create a new reminder to get started</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Reminders;
