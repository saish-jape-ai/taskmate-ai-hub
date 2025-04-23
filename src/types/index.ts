
export type UserRole = 'super_admin' | 'team_leader' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  teamId?: string; // Not applicable for super_admin
}

export interface Team {
  id: string;
  name: string;
  leaderId: string;
  members: string[]; // User IDs
  performanceScore: number;
  growth: number; // percentage
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  assignerId: string;
  teamId: string;
  dueDate: string;
  completedDate?: string;
  aiGenerated: boolean;
  aiExplanation?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  readBy: string[]; // User IDs
  mentions: string[]; // User IDs
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  isGroupChat: boolean;
  name?: string; // For group chats
  messages: Message[];
  lastMessageTime: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'task' | 'message' | 'system';
  read: boolean;
  timestamp: string;
  linkTo?: string;
}

export interface PerformanceMetric {
  userId: string;
  metric: string;
  value: number;
  previousValue?: number;
  change?: number; // percentage
  timestamp: string;
}

export interface AIAssistantMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AIAssistantConversation {
  userId: string;
  messages: AIAssistantMessage[];
}
