import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { MessageType } from "@/components/ChatMessage";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <motion.div
      className="border-t border-border bg-background/80 backdrop-blur-sm py-4 sticky bottom-0 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="container max-w-3xl">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your animation request here... (e.g., 'Show the quadratic formula derivation')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[60px] resize-none"
            disabled={disabled}
          />
          <Button type="submit" disabled={disabled || !input.trim()}>
            Send
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Try describing math concepts, equations, or visual representations you'd like to see animated.
        </p>
      </form>
    </motion.div>
  );
}