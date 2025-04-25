import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Send, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantPanelProps {
  fullScreen?: boolean;
}

export const AIAssistantPanel = ({ fullScreen = false }: AIAssistantPanelProps) => {
  const { currentUser } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExpanded, setIsExpanded] = useState(fullScreen);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fullScreen) {
      setIsExpanded(true);
    }
  }, [fullScreen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentUser) return;

    const newMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          message: inputMessage,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await res.json();
      const aiMessage: Message = { role: 'assistant', content: data.content };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      toast.error('Error getting AI response');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  if (!currentUser) return null;

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
            <Button variant="ghost" size="sm">
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
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`rounded-full p-1.5 ${message.role === 'user'
                    ? 'bg-bloom-purple text-primary'
                    : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                >
                  {message.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                </div>
                <div
                  className={`py-2 px-3 rounded-xl text-sm ${message.role === 'user'
                    ? 'bg-gray text-primary bg-gray-dark rounded-tr-none'
                    : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                    }`}
                >                 

  <ReactMarkdown remarkPlugins={[remarkGfm]}>
  {message.content}
</ReactMarkdown>

                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-xs text-muted-foreground italic ml-2">AI Assistant is typing...</div>
          )}
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
          <Button type="submit" size="icon" disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
