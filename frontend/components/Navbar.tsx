import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-semibold">M</span>
          </div>
          <span className="font-semibold text-lg">AnimAI</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/chat" className="text-sm font-medium hover:text-primary transition-colors">
              Chat
            </Link>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              GitHub
            </a>
          </nav>
          
          <ThemeToggle />
          
          <Button asChild className="hidden md:inline-flex">
            <Link to="/chat">Start Generating</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}