"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { ChatMessage, MessageType } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ChatSidebar } from "@/components/ChatSidebar";
import { Loader2 } from "lucide-react";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface ChatSession {
  session_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  messages: MessageType[];
}

interface ServerMessage {
  message_id: string;
  content: string;
  sender: string;
  timestamp: string;
  animation?: {
    cloudinary_url: string;
  };
}

const ChatContent = () => {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useSidebar();

  const backendURL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

  const loadSessions = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/chat/sessions`);
      setSessions(response.data.sessions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const createNewSession = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/chat/sessions`, {
        title: "New Chat",
      });

      const newSession: ChatSession = {
        session_id: response.data.session_id,
        title: response.data.title,
        created_at: response.data.created_at,
        updated_at: response.data.created_at,
        message_count: 0,
        messages: [],
      };

      setSessions([newSession, ...sessions]);
      setCurrentSession(newSession);
      setMessages([]);
    } catch (error) {
      console.log(error);
    }
  };

const loadSession = async (sessionId: string) => {
  try {
    const response = await axios.get(`${backendURL}/api/chat/sessions/${sessionId}`);
    const session = response.data;

    const frontendMessages: MessageType[] = session.messages.map((msg: ServerMessage) => ({
      id: msg.message_id,
      content: msg.content,
      sender: msg.sender,
      timestamp: new Date(msg.timestamp),
      animation: msg.animation?.cloudinary_url ?? undefined,
    }));

    setCurrentSession(session);
    setMessages(frontendMessages);
  } catch (error) {
    console.error("Error loading session:", error);
  }
};


  const deleteSession = async (sessionId: string) => {
    try {
      await axios.delete(`${backendURL}/api/chat/sessions/${sessionId}`);
      setSessions(sessions.filter((s) => s.session_id !== sessionId));

      if (currentSession?.session_id === sessionId) {
        setCurrentSession(null);
        setMessages([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (content: string) => {
    let sessionToUse = currentSession;

    if (!sessionToUse) {
      try {
        const response = await axios.post(`${backendURL}/api/chat/sessions`, {
          title: "New Chat",
        });

        sessionToUse = {
          session_id: response.data.session_id,
          title: response.data.title,
          created_at: response.data.created_at,
          updated_at: response.data.created_at,
          message_count: 0,
          messages: [],
        };

        setSessions([sessionToUse, ...sessions]);
        setCurrentSession(sessionToUse);
      } catch (error) {
        console.log(error);
      }
    }
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      content: content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    try {
      if (!sessionToUse) {
        throw new Error("No session available to send the message.");
      }
      const response = await axios.post(
        `${backendURL}/api/generate`,
        {
          prompt: content,
          session_id: sessionToUse.session_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const aiMessage: MessageType = {
        id: response.data.message_id || `ai-${Date.now()}`,
        content: "Here's your animation!",
        sender: "ai",
        timestamp: new Date(),
        animation: response.data.video_url,
      };

      setMessages((prev) => [...prev, aiMessage]);
      if (response.data.session_id) {
        loadSessions();
      }
    } catch (error) {
      console.log(error);
      const errorMessage: MessageType = {
        id: `ai-error-${Date.now()}`,
        content: "Oops! Something went wrong. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 w-full pt-20 h-screen">
      <ChatSidebar
        sessions={sessions}
        currentSession={currentSession}
        onCreateNewSession={createNewSession}
        onLoadSession={loadSession}
        onDeleteSession={deleteSession}
      />

      <div className="flex flex-col flex-1 h-full">
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            {state === "collapsed" && (
              <SidebarTrigger className="border border-border hover:bg-accent" />
            )}
          </div>

          {currentSession && (
            <div className="text-sm text-muted-foreground">
              Current:{" "}
              <span className="font-medium">{currentSession.title}</span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-auto p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4">
                    Welcome to ManimAI Chat ✨
                  </h2>
                  <p className="text-muted-foreground mb-6"></p>
                </div>
              )}

              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    Generating animation...
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t flex-shrink-0">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <SidebarProvider defaultOpen={true}>
        <ChatContent />
      </SidebarProvider>
    </div>
  );
};

export default Chat;
