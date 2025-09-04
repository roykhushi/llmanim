"use client"

import { useState } from "react"
import { Plus, History, Trash2, MessageSquare, X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/sidebar"

interface ChatSession {
  session_id: string
  title: string
  created_at: string
  updated_at: string
  message_count: number
}

interface ChatSidebarProps {
  sessions: ChatSession[]
  currentSession: ChatSession | null
  onCreateNewSession: () => void
  onLoadSession: (sessionId: string) => void
  onDeleteSession: (sessionId: string) => void
}

export function ChatSidebar({
  sessions,
  currentSession,
  onCreateNewSession,
  onLoadSession,
  onDeleteSession,
}: ChatSidebarProps) {
  const { toggleSidebar } = useSidebar()
  const [hoveredSession, setHoveredSession] = useState<string | null>(null)

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border/50">
      <SidebarHeader className="border-b border-border/50 p-4 bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg blur-sm opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-purple-600 p-2 rounded-lg">
                {/* Placeholder for logo */}
              </div>
            </div>
            <h1 className="font-bold text-lg">Chat Sessions</h1>
          </div>
          <Button variant="ghost" onClick={toggleSidebar}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onCreateNewSession}>
              <Plus className="h-4 w-4 mr-2" />
              New Session
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <History className="h-4 w-4 mr-2" />
              History
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup>
          <SidebarGroupLabel>Sessions</SidebarGroupLabel>
          <SidebarGroupContent>
            {sessions.map((session) => (
              <div
                key={session.session_id}
                className={`flex items-center justify-between p-2 rounded-lg hover:bg-muted/10 cursor-pointer ${
                  currentSession?.session_id === session.session_id ? "bg-muted/10" : ""
                }`}
                onMouseEnter={() => setHoveredSession(session.session_id)}
                onMouseLeave={() => setHoveredSession(null)}
                onClick={() => onLoadSession(session.session_id)}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-medium">{session.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatRelativeTime(session.updated_at)}</span>
                  {hoveredSession === session.session_id && (
                    <SidebarMenuAction onClick={() => onDeleteSession(session.session_id)}>
                      <Trash2 className="h-4 w-4" />
                    </SidebarMenuAction>
                  )}
                </div>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
