"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  return (
    <motion.div
      className="flex justify-center border-t border-border bg-background/80 backdrop-blur-sm py-4 sticky bottom-0 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="container max-w-3xl">
        <div className="flex gap-2 items-end">
          <Textarea
            placeholder="Type your animation request here... (e.g., 'Show the quadratic formula derivation')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[60px] resize-none flex-1"
            disabled={disabled}
          />
          <Button
            type="submit"
            className="bg-red-400 hover:bg-red-400 dark:bg-white dark:hover:bg-white dark:text-black dark:hover:text-black"
            disabled={disabled || !input.trim()}
          >
            Send
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center"></p>
      </form>
    </motion.div>
  )
}
