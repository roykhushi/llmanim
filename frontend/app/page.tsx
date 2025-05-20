"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  videoUrl?: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Send message to backend
      const response = await axios.post("http://127.0.0.1:8000/api/generate", { prompt: input });

      console.log(response);

      // Add assistant response with video
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.data.message || "Here is the video you requested:",
        videoUrl: response.data.video_url,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <header className="py-4 border-b">
        <h1 className="text-2xl font-bold text-center">AI Video Chat</h1>
      </header>

      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Send a message to start the conversation</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <Avatar className={`h-8 w-8 ${message.role === "user" ? "ml-3" : "mr-3"}`}>
                <div
                  className={`h-full w-full rounded-full ${message.role === "user" ? "bg-blue-500" : "bg-gray-500"} flex items-center justify-center text-white`}
                >
                  {message.role === "user" ? "U" : "AI"}
                </div>
              </Avatar>

              <Card className={`p-3 ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
                <p>{message.content}</p>

                {message.videoUrl && (
                  <div className="mt-3">
                    <video controls className="rounded-md w-full max-w-md" src={message.videoUrl}>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </Card>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex">
              <Avatar className="h-8 w-8 mr-3">
                <div className="h-full w-full rounded-full bg-gray-500 flex items-center justify-center text-white">
                  AI
                </div>
              </Avatar>

              <Card className="p-3 bg-gray-100">
                <div className="flex space-x-2">
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </Card>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t pt-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="h-full">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
