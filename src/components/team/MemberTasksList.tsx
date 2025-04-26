
import { ScrollArea } from '@/components/ui/scroll-area';
import { tasks } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface MemberTasksListProps {
  userId: string;
}

const MemberTasksList = ({ userId }: MemberTasksListProps) => {
  const memberTasks = tasks.filter(task => task.assigneeId === userId);

  const getStatusColor = (status: string) => {
    const colors = {
      completed: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
      in_progress: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
      overdue: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
    };
    return colors[status] || colors.pending;
  };

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {memberTasks.map(task => (
          <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-sm text-muted-foreground">{task.description}</p>
              <p className="text-xs text-muted-foreground mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
            <Badge className={getStatusColor(task.status)}>
              {task.status.replace('_', ' ')}
            </Badge>
          </div>
        ))}
        {memberTasks.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No tasks assigned
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MemberTasksList;
