
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Plus, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const Reminders = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mockup data - in a real app this would come from an API
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reminders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Reminder
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {reminders.map((reminder) => (
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
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between text-sm">
                  <span className={`capitalize ${
                    reminder.status === 'sent' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {reminder.status}
                  </span>
                  <span className="text-muted-foreground">
                    {new Date(reminder.timestamp).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {reminders.length === 0 && (
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
