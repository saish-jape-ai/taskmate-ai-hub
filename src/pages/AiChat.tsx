
import AppLayout from "@/components/AppLayout";
import { useState, useEffect, useRef } from "react";
import { AIAssistantPanel } from "@/components/ai/AIAssistantPanel";
import { Card } from "@/components/ui/card";
import { aiAssistantConversations } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { AIAssistantMessage } from "@/types";

const AiChat = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<AIAssistantMessage[]>([]);
  
  useEffect(() => {
    if (!currentUser) return;
    
    // Find the user's conversation with AI assistant
    const userConversation = aiAssistantConversations.find(
      conversation => conversation.userId === currentUser.id
    );
    
    if (userConversation) {
      setMessages(userConversation.messages);
    }
  }, [currentUser]);

  return (
    <AppLayout title="Chat with AI">
      <div className="max-w-4xl mx-auto h-[calc(115vh-200px)]">
        <div className="grid grid-cols-1 h-full">
          <Card className="p-0 overflow-hidden h-full">
            <AIAssistantPanel fullScreen={true} />
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AiChat;
