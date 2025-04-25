
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User } from 'lucide-react';
import { aiAssistantConversations } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface AIAssistantPanelProps {
  fullScreen?: boolean;
}

export const AIAssistantPanel = ({ fullScreen = false }: AIAssistantPanelProps) => {
  const { currentUser } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(fullScreen);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-expand when in full-screen mode
  useEffect(() => {
    if (fullScreen) {
      setIsExpanded(true);
    }
  }, [fullScreen]);
  
  if (!currentUser) return null;
  
  // Get the user's conversation with AI assistant
  const userConversation = aiAssistantConversations.find(
    conversation => conversation.userId === currentUser.id
  ) || { messages: [] };
  
  // Handle sending message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Simulate sending message to AI
    setTimeout(() => {
      // Show loading toast
      toast.success('AI Assistant is responding...');
      
      // Simulate AI response after a short delay
      setTimeout(() => {
        // Reset the input field
        setInputMessage('');
      }, 1500);
    }, 300);
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [userConversation.messages]);
  
  if (!isExpanded && !fullScreen) {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="bg-bloom-purple/10 cursor-pointer" onClick={() => setIsExpanded(true)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-bloom-purple text-white p-1.5 rounded-lg">
                <Bot className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm">AI Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(true)}>
              Open
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className={`flex flex-col ${fullScreen ? 'h-full' : 'h-[400px]'}`}>
      <CardHeader className="bg-bloom-purple/10 py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-bloom-purple p-1.5 rounded-lg">
              {/* <Bot className="h-4 w-4" /> */}
              <i className="fa-solid fa-robot"></i>
                          </div>
            <CardTitle className="text-sm">AI Assistant</CardTitle>
          </div>
          {!fullScreen && (
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
              Minimize
            </Button>
          )}
        </div>
        <CardDescription className="text-xs mt-1">
          Ask me anything about your tasks or performance
        </CardDescription>
      </CardHeader>
      
      <ScrollArea className="flex-1 p-3 overflow-auto" ref={scrollAreaRef}>
        <div className="space-y-4">
          {userConversation.messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  flex items-start gap-2 max-w-[85%]
                  ${message.role === 'user' ? 'flex-row-reverse' : ''}
                `}
              >
                <div className={`
                    rounded-full p-1.5
                    ${message.role === 'user' 
                      ? 'bg-bloom-purple text-primary' 
                      : 'bg-gray-100 dark:bg-gray-800'
                    }
                  `}
                >
                  {message.role === 'user' 
                    ? <User className="h-3 w-3" /> 
                    : <Bot className="h-3 w-3" />
                  }
                </div>
                <div
                  className={`
                    py-2 px-3 rounded-xl text-sm
                    ${message.role === 'user' 
                      ? 'bg-gray text-primary bg-gray-dark rounded-tr-none' 
                      : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                    }
                  `}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <CardFooter className="p-3 border-t bg-background">
        <form 
          className="flex w-full items-center space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder="Ask your AI assistant..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
