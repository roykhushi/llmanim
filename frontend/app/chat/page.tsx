import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatMessage, MessageType } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content: "Hello! I'm your AI animation assistant. What math concept would you like me to animate today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiMessage: MessageType = {
        id: `ai-${Date.now()}`,
        content: getAIResponse(content),
        sender: "ai",
        timestamp: new Date(),
        animation: "/placeholder.svg", // Placeholder for animation
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Simple AI response generator for demo purposes
  const getAIResponse = (userMessage: string): string => {
    const responses = [
      `I've created an animation for "${userMessage}". You can view it below.`,
      `Here's a visualization of ${userMessage}. Let me know if you want any adjustments.`,
      `I've animated the concept of ${userMessage}. Check out the result below.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-20">
        <div className="container max-w-4xl px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">AI Animation Chat</h1>
            <p className="text-muted-foreground">
              Describe the mathematical concept you want to animate, and our AI will create a visualization for you.
            </p>
          </div>
          
          <div className="space-y-4 mb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        </div>
      </main>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      <Footer />
    </div>
  );
};

export default Chat;