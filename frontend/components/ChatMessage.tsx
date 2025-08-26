import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"



export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  animation?: string;

};

interface ChatMessageProps {
  message: MessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user";

  const handleDownload = async (format: "mp4" | "gif") => {
    try {
      const baseUrl = message.animation!;
      const downloadUrl =
        format === "gif"
          ? baseUrl.replace("/upload/", "/upload/f_gif/") // cloudinary transformation
          : baseUrl;

      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `animation.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Silently handle download error
    }
  };




  return (
    <motion.div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
      >
        <Avatar className="h-8 w-8">
          {isUser ? (
            <>
              <AvatarFallback>U</AvatarFallback>
              <AvatarImage src="/avatar.svg" />
            </>
          ) : (
            <>
              <AvatarFallback>AI</AvatarFallback>
              <AvatarImage src="/robot-assistant.png" />
            </>
          )}
        </Avatar>

        <div
          className={cn(
            "flex flex-col max-w-md",
            isUser ? "items-end" : "items-start"
          )}
        >

          <div
            className={cn(
              "rounded-2xl px-4 py-2 text-sm",
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>

          {message.animation && (
            <div className="mt-2 rounded-lg overflow-hidden border border-border">
              <video
                src={message.animation}
                controls
                autoPlay
                className="w-full max-w-sm h-auto"
                playsInline
              >
                <source src={message.animation} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-2 flex justify-end bg-card">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4 cursor-pointer" />
                      Download
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="bg-gray border-2 cursor-pointer" onClick={() => handleDownload("mp4")}>
                      Download as MP4
                    </DropdownMenuItem>
                    <DropdownMenuItem className="bg-gray border-2 cursor-pointer" onClick={() => handleDownload("gif")}>
                      Download as GIF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          <span className="text-xs text-muted-foreground mt-1">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
