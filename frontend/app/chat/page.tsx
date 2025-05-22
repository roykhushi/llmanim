"use client";
import { useState } from "react";
import axios from "axios";
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

  const handleSendMessage = async (content: string) => {
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/generate", { prompt: content });

      const aiMessage: MessageType = {
        id: `ai-${Date.now()}`,
        content: response.data.message,
        sender: "ai",
        timestamp: new Date(),
        animation: response.data.video_url, // Video URL from backend
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating animation:", error);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-error-${Date.now()}`,
          content: "Oops! Something went wrong. Please try again.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

    

    <div className="min-h-screen">
      <main className="flex items-center justify-center pb-4">
        <div className="container max-w-4xl px-4 py-8">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2 text-center">AI Animation Chat</h1>
            <p className="text-muted-foreground text-center">
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

      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      <Footer />
    </div>
  );
};

export default Chat;

