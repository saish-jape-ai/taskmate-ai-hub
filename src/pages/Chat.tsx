
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { conversations, users } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Search, User, Users, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const Chat = () => {
  const { currentUser } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  if (!currentUser) return null;
  
  // Get user's conversations
  const userConversations = conversations.filter(
    conversation => conversation.participants.includes(currentUser.id)
  );
  
  // Get the selected conversation
  const activeConversation = userConversations.find(
    conversation => conversation.id === selectedConversation
  );
  
  // Filter conversations by search query
  const filteredConversations = userConversations.filter(conversation => {
    if (!searchQuery) return true;
    
    // For direct messages, check the other participant's name
    if (!conversation.isGroupChat) {
      const otherParticipantId = conversation.participants.find(id => id !== currentUser.id);
      const otherParticipant = users.find(user => user.id === otherParticipantId);
      return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // For group chats, check the group name
    return conversation.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Get conversation name and avatar
  const getConversationDetails = (conversation: typeof conversations[0]) => {
    if (conversation.isGroupChat) {
      return {
        name: conversation.name || 'Group Chat',
        avatar: null
      };
    }
    
    const otherParticipantId = conversation.participants.find(id => id !== currentUser.id);
    const otherParticipant = users.find(user => user.id === otherParticipantId);
    
    return {
      name: otherParticipant?.name || 'Unknown User',
      avatar: otherParticipant?.avatar
    };
  };
  
  // Handle send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedConversation) return;
    
    // In a real app, this would send the message to the backend
    setMessage('');
  };
  
  return (
    <AppLayout title="Chat">
      <div className="h-[calc(100vh-12rem)] flex">
        {/* Sidebar / Conversations list */}
        <div className="w-64 border-r shrink-0">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="w-full mt-3">
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
          
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="space-y-1 p-2">
              {filteredConversations.length > 0 ? (
                filteredConversations.map(conversation => {
                  const { name, avatar } = getConversationDetails(conversation);
                  const lastMessage = conversation.messages[conversation.messages.length - 1];
                  const isActive = conversation.id === selectedConversation;
                  
                  return (
                    <div
                      key={conversation.id}
                      className={`
                        flex items-center gap-3 p-2 rounded-lg cursor-pointer
                        ${isActive ? 'bg-muted' : 'hover:bg-muted/50'}
                      `}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <Avatar>
                        {avatar ? (
                          <AvatarImage src={avatar} alt={name} />
                        ) : (
                          <AvatarFallback>
                            {conversation.isGroupChat ? (
                              <Users className="h-4 w-4" />
                            ) : (
                              name.split(' ').map(n => n[0]).join('')
                            )}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-sm truncate">{name}</p>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(conversation.lastMessageTime), { addSuffix: false })}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {lastMessage ? lastMessage.content : 'No messages yet'}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No conversations found
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    {getConversationDetails(activeConversation).avatar ? (
                      <AvatarImage 
                        src={getConversationDetails(activeConversation).avatar || ''} 
                        alt={getConversationDetails(activeConversation).name} 
                      />
                    ) : (
                      <AvatarFallback>
                        {activeConversation.isGroupChat ? (
                          <Users className="h-4 w-4" />
                        ) : (
                          getConversationDetails(activeConversation).name.split(' ').map(n => n[0]).join('')
                        )}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{getConversationDetails(activeConversation).name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeConversation.isGroupChat 
                        ? `${activeConversation.participants.length} members` 
                        : 'Direct message'
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {activeConversation.messages.map(message => {
                    const isCurrentUser = message.senderId === currentUser.id;
                    const sender = users.find(user => user.id === message.senderId);
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`
                          flex items-start gap-2 max-w-[70%]
                          ${isCurrentUser ? 'flex-row-reverse' : ''}
                        `}>
                          <Avatar className="h-6 w-6">
                            {sender?.avatar ? (
                              <AvatarImage src={sender.avatar} alt={sender.name} />
                            ) : (
                              <AvatarFallback>
                                {sender?.name.split(' ').map(n => n[0]).join('') || <User className="h-3 w-3" />}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <div className={`
                              py-2 px-3 rounded-xl text-sm
                              ${isCurrentUser 
                                ? 'bg-bloom-purple text-white rounded-tr-none' 
                                : 'bg-muted rounded-tl-none'
                              }
                            `}>
                              {message.content}
                            </div>
                            <div className={`
                              mt-1 text-xs text-muted-foreground
                              ${isCurrentUser ? 'text-right mr-2' : 'ml-2'}
                            `}>
                              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <form 
                  className="flex items-center gap-2"
                  onSubmit={handleSendMessage}
                >
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-muted-foreground mt-1">
                  Choose a conversation from the sidebar to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;
