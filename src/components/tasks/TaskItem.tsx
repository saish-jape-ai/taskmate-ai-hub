
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { 
  CheckCircle, Clock, AlertTriangle, 
  MoreHorizontal, MessageCircle, Calendar 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { users } from '@/data/mockData';

interface TaskItemProps {
  task: Task;
  compact?: boolean;
}

const TaskItem = ({ task, compact = false }: TaskItemProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  
  const assignee = users.find(u => u.id === task.assigneeId);
  const assigner = users.find(u => u.id === task.assignerId);
  
  // Format dates
  const formattedDueDate = formatDistanceToNow(new Date(task.dueDate), { addSuffix: true });
  
  // Status indicator
  const getStatusIndicator = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };
  
  // Status badge
  const getStatusBadge = () => {
    switch (task.status) {
      case 'completed':
        return <Badge className="bloom-status-completed">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bloom-status-pending">In Progress</Badge>;
      case 'overdue':
        return <Badge className="bloom-status-overdue">Overdue</Badge>;
      default:
        return <Badge className="bloom-status-pending">Pending</Badge>;
    }
  };
  
  // Priority badge
  const getPriorityBadge = () => {
    switch (task.priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Low</Badge>;
    }
  };
  
  if (compact) {
    return (
      <div 
        className="bloom-task-card cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm truncate">{task.title}</h3>
          {getStatusIndicator()}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-muted-foreground">{formattedDueDate}</span>
          </div>
          {getPriorityBadge()}
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="py-3 px-4 hover:bg-muted/20">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {getStatusIndicator()}
            <div>
              <h3 className="font-medium text-sm">{task.title}</h3>
              
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {getStatusBadge()}
                {getPriorityBadge()}
                {task.aiGenerated && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    AI Generated
                  </Badge>
                )}
              </div>
              
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                Due {formattedDueDate}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowDetails(true)}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowDetails(true)}>
                  View Details
                </DropdownMenuItem>
                {(currentUser?.id === task.assigneeId && task.status !== 'completed') && (
                  <DropdownMenuItem>
                    Mark as Completed
                  </DropdownMenuItem>
                )}
                {(currentUser?.role === 'team_leader' || currentUser?.role === 'super_admin') && (
                  <>
                    <DropdownMenuItem>
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 focus:text-red-500">
                      Delete Task
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Task details dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{task.title}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {getStatusBadge()}
                {getPriorityBadge()}
                {task.aiGenerated && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    AI Generated
                  </Badge>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm">{task.description}</p>
            </div>
            
            {task.aiExplanation && (
              <div className="border border-purple-200 bg-purple-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-bloom-purple mb-1">AI Explanation</h4>
                <p className="text-sm text-gray-700">{task.aiExplanation}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Assigned By</h4>
                <p className="text-sm">{assigner?.name || 'Unknown'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Assigned To</h4>
                <p className="text-sm">{assignee?.name || 'Unknown'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Due Date</h4>
                <p className="text-sm">{new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              {task.completedDate && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Completed Date</h4>
                  <p className="text-sm">{new Date(task.completedDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowDetails(false)}>Close</Button>
              {(currentUser?.id === task.assigneeId && task.status !== 'completed') && (
                <Button>Mark as Completed</Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskItem;
