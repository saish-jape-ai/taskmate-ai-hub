import { User, Team, Task, Notification, PerformanceMetric, Conversation, Message, AIAssistantConversation } from '@/types';

// Mock Teams
export const teams: Team[] = [
  {
    id: 'team1',
    name: 'PYTHON_FASTAPI ',
    leaderId: '1',
    members: ['1', '2', '3', '4', '5'],
    performanceScore: 91,
    growth: 18
  },
  {
    id: 'team2',
    name: 'PYTHON_AI',
    leaderId: '8',
    members: ['6', '7', '8', '9', '10'],
    performanceScore: 87,
    growth: 5
  },
  {
    id: 'team3',
    name: 'PYTHON_ML',
    leaderId: '11',
    members: ['13', '14', '15', '11', '12'],
    performanceScore: 83,
    growth: 12
  },
  {
    id: 'team4',
    name: 'REACT',
    leaderId: '16',
    members: ['16', '17', '18', '19', '20'],
    performanceScore: 86,
    growth: 9
  }
];

// Additional mock users (beyond the ones in AuthContext)
export const users: User[] = [

  // TEAM 1
  {
    id: '1',
    name: 'Ajinkya Wagh',
    email: 'ajinkya.baapcompany@gmail.com',
    role: 'team_leader',
    teamId: 'team1',
    avatar: 'C:\Users\CRESCENT INFOTECH\Desktop\EOD\version2\taskmate-ai-hub\assets\avatars\man.png.avif',
  },

  {
    id: '2',
    name: 'Saish Jape',
    email: 'saishjape.baapcom.com',
    role: 'employee',
    teamId: 'team1',
    avatar: '/assets/avatars/priya.png',
  },
  {
    id: '3',
    name: 'Jagdish Pagar',
    email: 'jagdishpagar875@gmail.com',
    role: 'employee',
    teamId: 'team1',
    avatar: '/assets/avatars/amit.png',
  },
  {
    id: '4',
    name: 'Sahil Wable',
    email: 'sahil.wable29@baapcompany.com',
    role: 'employee',
    teamId: 'team1',
    avatar: '/assets/avatars/sneha.png',
  },

  {
    id: '5',
    name: 'Pranav Bodke',
    email: 'pranavb.fastapiteam.com',
    role: 'employee',
    teamId: 'team1',
    avatar: '/assets/avatars/priya.png',
  },
  {
    id: '8',
    name: 'Rahul Wale',
    email: 'rahulw.aiml@gmail.com',
    role: 'employee',
    teamId: 'team2',
    avatar: '/assets/avatars/alex.png',
  },
  {
    id: '10',
    name: 'Rushikesh Patil',
    email: 'meera.nair@bloomteam.com',
    role: 'employee',
    teamId: 'team3',
    avatar: '/assets/avatars/meera.png',
  },
  {
    id: '7',
    name: 'Rohit Kapoor',
    email: 'rohit.kapoor@bloomteam.com',
    role: 'employee',
    teamId: 'team2',
    avatar: '/assets/avatars/rohit.png',
  },
  {
    id: '6',
    name: 'Anjali Rao',
    email: 'anjali.rao@bloomteam.com',
    role: 'employee',
    teamId: 'team2',
    avatar: '/assets/avatars/anjali.png',
  },
  {
    id: '9',
    name: 'Vikas Mehta',
    email: 'vikas.mehta@bloomteam.com',
    role: 'employee',
    teamId: 'team2',
    avatar: '/assets/avatars/vikas.png',
  },





  {
    id: '11',
    name: 'Ravi Takle',
    email: 'ravi.baapmlteam.com',
    role: 'employee',
    teamId: 'team3',
    avatar: '/assets/avatars/sarah.png',
  },
  {
    id: '12',
    name: 'Michael Brown',
    email: 'michael@bloomteam.com',
    role: 'team_leader',
    teamId: 'team3',
    avatar: '/assets/avatars/michael.png',
  },
  {
    id: '13',
    name: 'Emily Davis',
    email: 'emily@bloomteam.com',
    role: 'employee',
    teamId: 'team3',
    avatar: '/assets/avatars/emily.png',
  },
  {
    id: '14',
    name: 'James Wilson',
    email: 'james@bloomteam.com',
    role: 'employee',
    teamId: 'team3',
    avatar: '/assets/avatars/james.png',
  },
  {
    id: '15',
    name: 'Jessica Miller',
    email: 'jessica@bloomteam.com',
    role: 'team_leader',
    teamId: 'team3',
    avatar: '/assets/avatars/jessica.png',
  },
  {
    id: '16',
    name: 'Ketan Abhang',
    email: 'ketan.abhang887@gmail.com',
    role: 'employee',
    teamId: 'team4',
    avatar: '/assets/avatars/david.png',
  },
  {
    id: '17',
    name: 'Neha Singh',
    email: 'neha.singh@bloomteam.com',
    role: 'team_leader',
    teamId: 'team4',
    avatar: '/assets/avatars/neha.png',
  },
  {
    id: '18',
    name: 'Arjun Das',
    email: 'arjun.das@bloomteam.com',
    role: 'employee',
    teamId: 'team4',
    avatar: '/assets/avatars/arjun.png',
  },
  {
    id: '19',
    name: 'Pooja Thakur',
    email: 'pooja.thakur@bloomteam.com',
    role: 'employee',
    teamId: 'team4',
    avatar: '/assets/avatars/pooja.png',
  },
  {
    id: '20',
    name: 'Sahil Khan',
    email: 'sahil.khan@bloomteam.com',
    role: 'employee',
    teamId: 'team4',
    avatar: '/assets/avatars/sahil.png',
  },

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
        content: 'Hi, how\'s the dashboard mockup going?',
        timestamp: '2025-04-20T09:30:00Z',
        readBy: ['2', '3'],
        mentions: []
      },
      {
        id: 'msg2',
        senderId: '3',
        content: 'Going well! I\'ve completed the main layout and working on the charts now.',
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
        content: 'I\'ll prepare the technical overview for the meeting.',
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