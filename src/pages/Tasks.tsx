
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/AppLayout';
import { tasks, users, teams } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskItem from '@/components/tasks/TaskItem';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AITaskGenerator } from '@/components/ai/AITaskGenerator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Task } from '@/types';

const Tasks = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  
  if (!currentUser) return null;
  
  // Get user's team
  const team = teams.find(team => team.id === currentUser.teamId);
  
  // Filter tasks based on user role
  const filterTasksByRole = () => {
    switch (currentUser.role) {
      case 'super_admin':
        // Super admin can see all tasks
        return tasks;
      case 'team_leader':
        // Team leader can see all tasks for their team
        return tasks.filter(task => task.teamId === currentUser.teamId);
      case 'employee':
        // Employee can only see tasks assigned to them
        return tasks.filter(task => task.assigneeId === currentUser.id);
      default:
        return [];
    }
  };
  
  // Apply search and filters
  const filteredTasks = filterTasksByRole().filter(task => {
    // Apply search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (statusFilter.length > 0 && !statusFilter.includes(task.status)) {
      return false;
    }
    
    // Apply priority filter
    if (priorityFilter.length > 0 && !priorityFilter.includes(task.priority)) {
      return false;
    }
    
    return true;
  });
  
  // Group tasks by status
  const pendingTasks = filteredTasks.filter(task => task.status === 'pending');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in_progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');
  const overdueTasks = filteredTasks.filter(task => task.status === 'overdue');
  
  // Handle status filter change
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };
  
  // Handle priority filter change
  const handlePriorityFilterChange = (priority: string) => {
    setPriorityFilter(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority) 
        : [...prev, priority]
    );
  };
  
  return (
    <AppLayout title="Tasks">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl font-bold">Tasks</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('pending')}
                  onCheckedChange={() => handleStatusFilterChange('pending')}
                >
                  Pending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('in_progress')}
                  onCheckedChange={() => handleStatusFilterChange('in_progress')}
                >
                  In Progress
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('completed')}
                  onCheckedChange={() => handleStatusFilterChange('completed')}
                >
                  Completed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('overdue')}
                  onCheckedChange={() => handleStatusFilterChange('overdue')}
                >
                  Overdue
                </DropdownMenuCheckboxItem>
                
                <DropdownMenuLabel className="mt-2">Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={priorityFilter.includes('low')}
                  onCheckedChange={() => handlePriorityFilterChange('low')}
                >
                  Low
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={priorityFilter.includes('medium')}
                  onCheckedChange={() => handlePriorityFilterChange('medium')}
                >
                  Medium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={priorityFilter.includes('high')}
                  onCheckedChange={() => handlePriorityFilterChange('high')}
                >
                  High
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Create task button (only for team leaders and super admins) */}
            {(currentUser.role === 'team_leader' || currentUser.role === 'super_admin') && (
              <Button onClick={() => setShowDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            )}
          </div>
        </div>
        
        {/* Tasks tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">All ({filteredTasks.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({inProgressTasks.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
            <TabsTrigger value="overdue">Overdue ({overdueTasks.length})</TabsTrigger>
          </TabsList>
          
          <Card>
            <TabsContent value="all" className="mt-0">
              <div className="divide-y">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No tasks found</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <div className="divide-y">
                {pendingTasks.length > 0 ? (
                  pendingTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No pending tasks</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="in_progress" className="mt-0">
              <div className="divide-y">
                {inProgressTasks.length > 0 ? (
                  inProgressTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No tasks in progress</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <div className="divide-y">
                {completedTasks.length > 0 ? (
                  completedTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No completed tasks</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="overdue" className="mt-0">
              <div className="divide-y">
                {overdueTasks.length > 0 ? (
                  overdueTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No overdue tasks</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Card>
        </Tabs>
      </div>

      {/* AI Task Generator Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Generate Task with AI</DialogTitle>
          </DialogHeader>
          <AITaskGenerator teamId={currentUser.teamId || ''} onClose={() => setShowDialog(false)} />
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Tasks;
