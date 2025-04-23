
import { User, Team, Task, Notification, PerformanceMetric, Conversation, Message, AIAssistantConversation } from '@/types';

// Mock Teams
export const teams: Team[] = [
  {
    id: 'team1',
    name: 'Product Development',
    leaderId: '2',
    members: ['2', '3', '4', '5'],
    performanceScore: 85,
    growth: 12
  },
  {
    id: 'team2',
    name: 'Marketing',
    leaderId: '6',
    members: ['6', '7', '8'],
    performanceScore: 78,
    growth: 5
  },
  {
    id: 'team3',
    name: 'Customer Support',
    leaderId: '9',
    members: ['9', '10', '11', '12'],
    performanceScore: 92,
    growth: 18
  },
  {
    id: 'team4',
    name: 'Sales',
    leaderId: '13',
    members: ['13', '14', '15'],
    performanceScore: 67,
    growth: -3
  }
];

// Additional mock users (beyond the ones in AuthContext)
export const users: User[] = [
  {
    id: '4',
    name: 'Alex Johnson',
    email: 'alex@bloomteam.com',
    role: 'employee',
    teamId: 'team1',
    avatar: '/assets/avatars/alex.png',
  },
  {
    id: '5',
    name: 'Sarah Williams',
    email: 'sarah@bloomteam.com',
    role: 'employee',
    teamId: 'team1',
    avatar: '/assets/avatars/sarah.png',
  },
  {
    id: '6',
    name: 'Michael Brown',
    email: 'michael@bloomteam.com',
    role: 'team_leader',
    teamId: 'team2',
    avatar: '/assets/avatars/michael.png',
  },
  {
    id: '7',
    name: 'Emily Davis',
    email: 'emily@bloomteam.com',
    role: 'employee',
    teamId: 'team2',
    avatar: '/assets/avatars/emily.png',
  },
  {
    id: '8',
    name: 'James Wilson',
    email: 'james@bloomteam.com',
    role: 'employee',
    teamId: 'team2',
    avatar: '/assets/avatars/james.png',
  },
  {
    id: '9',
    name: 'Jessica Miller',
    email: 'jessica@bloomteam.com',
    role: 'team_leader',
    teamId: 'team3',
    avatar: '/assets/avatars/jessica.png',
  },
  {
    id: '10',
    name: 'David Moore',
    email: 'david@bloomteam.com',
    role: 'employee',
    teamId: 'team3',
    avatar: '/assets/avatars/david.png',
  }
];

// Mock tasks
export const tasks: Task[] = [
  {
    id: 'task1',
    title: 'Complete User Research',
    description: 'Conduct interviews with 5 potential users to gather feedback on the new feature.',
    status: 'completed',
    priority: 'high',
    assigneeId: '3',
    assignerId: '2',
    teamId: 'team1',
    dueDate: '2025-04-15',
    completedDate: '2025-04-14',
    aiGenerated: false
  },
  {
    id: 'task2',
    title: 'Design Mockups for Dashboard',
    description: 'Create design mockups for the new analytics dashboard based on the requirements.',
    status: 'in_progress',
    priority: 'high',
    assigneeId: '3',
    assignerId: '2',
    teamId: 'team1',
    dueDate: '2025-04-25',
    aiGenerated: true,
    aiExplanation: 'This task involves creating visual mockups for the analytics dashboard. Focus on clear data visualization, intuitive navigation, and a clean interface that matches our brand guidelines. Include views for different user roles.'
  },
  {
    id: 'task3',
    title: 'Fix Login Bug',
    description: 'Address the issue where users are occasionally getting logged out unexpectedly.',
    status: 'pending',
    priority: 'medium',
    assigneeId: '3',
    assignerId: '2',
    teamId: 'team1',
    dueDate: '2025-04-30',
    aiGenerated: false
  },
  {
    id: 'task4',
    title: 'Quarterly Team Performance Review',
    description: 'Conduct performance reviews for all team members and prepare reports.',
    status: 'pending',
    priority: 'medium',
    assigneeId: '2',
    assignerId: '1',
    teamId: 'team1',
    dueDate: '2025-05-10',
    aiGenerated: true,
    aiExplanation: 'This task involves reviewing the performance of all team members for Q1 2025. Analyze individual metrics, task completion rates, and quality of work. Prepare detailed reports and identify areas for improvement and growth.'
  },
  {
    id: 'task5',
    title: 'Create Content Calendar',
    description: 'Develop content calendar for the next month covering blog posts, social media, and email campaigns.',
    status: 'overdue',
    priority: 'high',
    assigneeId: '7',
    assignerId: '6',
    teamId: 'team2',
    dueDate: '2025-04-10',
    aiGenerated: false
  }
];

// Mock notifications
export const notifications: Notification[] = [
  {
    id: 'notif1',
    userId: '3',
    title: 'New Task Assigned',
    message: 'You have been assigned a new task: Design Mockups for Dashboard',
    type: 'task',
    read: false,
    timestamp: '2025-04-20T10:30:00Z',
    linkTo: '/tasks/task2'
  },
  {
    id: 'notif2',
    userId: '3',
    title: 'Task Deadline Approaching',
    message: 'The task "Fix Login Bug" is due in 2 days',
    type: 'task',
    read: true,
    timestamp: '2025-04-20T09:15:00Z',
    linkTo: '/tasks/task3'
  },
  {
    id: 'notif3',
    userId: '2',
    title: 'Performance Report Ready',
    message: 'The monthly team performance report is now available',
    type: 'system',
    read: false,
    timestamp: '2025-04-19T16:45:00Z',
    linkTo: '/analytics'
  },
  {
    id: 'notif4',
    userId: '2',
    title: 'New Message',
    message: 'Alex Johnson sent you a message',
    type: 'message',
    read: true,
    timestamp: '2025-04-19T14:20:00Z',
    linkTo: '/chat/user4'
  }
];

// Mock performance metrics
export const performanceMetrics: PerformanceMetric[] = [
  {
    userId: '3',
    metric: 'task_completion_rate',
    value: 92,
    previousValue: 85,
    change: 8.2,
    timestamp: '2025-04-01T00:00:00Z'
  },
  {
    userId: '3',
    metric: 'quality_score',
    value: 88,
    previousValue: 84,
    change: 4.8,
    timestamp: '2025-04-01T00:00:00Z'
  },
  {
    userId: '3',
    metric: 'efficiency_score',
    value: 78,
    previousValue: 72,
    change: 8.3,
    timestamp: '2025-04-01T00:00:00Z'
  },
  {
    userId: '3',
    metric: 'collaboration_score',
    value: 94,
    previousValue: 90,
    change: 4.4,
    timestamp: '2025-04-01T00:00:00Z'
  }
];

// Mock team performance data
export const teamPerformanceData = [
  { month: 'Jan', team1: 65, team2: 68, team3: 75, team4: 60 },
  { month: 'Feb', team1: 68, team2: 70, team3: 79, team4: 62 },
  { month: 'Mar', team1: 75, team2: 73, team3: 85, team4: 64 },
  { month: 'Apr', team1: 85, team2: 78, team3: 92, team4: 67 }
];

// Mock conversations
export const conversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['2', '3'],
    isGroupChat: false,
    messages: [
      {
        id: 'msg1',
        senderId: '2',
        content: 'Hi, how's the dashboard mockup going?',
        timestamp: '2025-04-20T09:30:00Z',
        readBy: ['2', '3'],
        mentions: []
      },
      {
        id: 'msg2',
        senderId: '3',
        content: 'Going well! I've completed the main layout and working on the charts now.',
        timestamp: '2025-04-20T09:32:00Z',
        readBy: ['2', '3'],
        mentions: []
      },
      {
        id: 'msg3',
        senderId: '2',
        content: 'Great! Can you share a preview by end of day?',
        timestamp: '2025-04-20T09:33:00Z',
        readBy: ['3'],
        mentions: []
      }
    ],
    lastMessageTime: '2025-04-20T09:33:00Z'
  },
  {
    id: 'conv2',
    participants: ['2', '3', '4', '5'],
    isGroupChat: true,
    name: 'Product Team',
    messages: [
      {
        id: 'msg4',
        senderId: '2',
        content: 'Team meeting tomorrow at 10 AM to discuss the new feature rollout.',
        timestamp: '2025-04-19T15:00:00Z',
        readBy: ['2', '3', '4', '5'],
        mentions: []
      },
      {
        id: 'msg5',
        senderId: '4',
        content: 'I'll prepare the technical overview for the meeting.',
        timestamp: '2025-04-19T15:05:00Z',
        readBy: ['2', '3', '4', '5'],
        mentions: []
      },
      {
        id: 'msg6',
        senderId: '3',
        content: '@Sarah can you bring your user research findings?',
        timestamp: '2025-04-19T15:10:00Z',
        readBy: ['2', '3', '4'],
        mentions: ['5']
      }
    ],
    lastMessageTime: '2025-04-19T15:10:00Z'
  }
];

// Mock AI Assistant conversations
export const aiAssistantConversations: AIAssistantConversation[] = [
  {
    userId: '3',
    messages: [
      {
        role: 'user',
        content: 'Can you explain how to approach the dashboard mockup task?',
        timestamp: '2025-04-20T08:45:00Z'
      },
      {
        role: 'assistant',
        content: 'For the dashboard mockup task, I recommend starting with user needs analysis. Identify the key metrics and information that users need to see at a glance. Then, create wireframes to establish the layout and hierarchy before adding visual design elements. Make sure to follow our brand guidelines and maintain consistency with existing UI patterns. Would you like more specific guidance on any part of this process?',
        timestamp: '2025-04-20T08:45:30Z'
      },
      {
        role: 'user',
        content: 'What charts would be best for showing team performance over time?',
        timestamp: '2025-04-20T08:46:15Z'
      },
      {
        role: 'assistant',
        content: 'For team performance over time, line charts are ideal as they clearly show trends and patterns. You could use a multi-line chart to compare different teams or metrics simultaneously. Bar charts work well for comparing discrete periods (like monthly performance). For a comprehensive view, consider adding spark lines for quick trend visualization and radar/spider charts to compare multiple performance dimensions at once. Would you like me to explain any of these chart types in more detail?',
        timestamp: '2025-04-20T08:46:45Z'
      }
    ]
  }
];
