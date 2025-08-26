"use client";

import { useState } from "react";
import { Plus, History, Trash2, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  useSidebar,
} from "@/components/ui/sidebar";

interface ChatSession {
  session_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
}

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  onCreateNewSession: () => void;
  onLoadSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

export function ChatSidebar({
  sessions,
  currentSession,
  onCreateNewSession,
  onLoadSession,
  onDeleteSession,
}: ChatSidebarProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-semibold">ManimAI Chat</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <Button
          onClick={onCreateNewSession}
          className="w-full mt-3"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Chat History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sessions.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  No chat history yet.
                  <br />
                  Start a new conversation!
                </div>
              ) : (
                sessions.map((session) => (
                  <SidebarMenuItem key={session.session_id}>
                    <SidebarMenuButton
                      onClick={() => onLoadSession(session.session_id)}
                      isActive={currentSession?.session_id === session.session_id}
                      className="w-full justify-start text-left group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate text-sm">
                          {session.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(session.updated_at).toLocaleDateString()} • {session.message_count} messages
                        </div>
                      </div>
                    </SidebarMenuButton>
                    <SidebarMenuAction
                      onClick={() => onDeleteSession(session.session_id)}
                      showOnHover
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete session</span>
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
