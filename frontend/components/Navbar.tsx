"use client";

import Link from "next/link"
import { useTheme } from "next-themes"
import { ArrowRight, Moon, Sun, Code, Sparkles, Play, Zap } from "lucide-react"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, type FC } from "react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar: FC = () => {

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

  return (
    <header className="fixed backdrop-blur-lg bg-white/30 dark:bg-black/30 z-10 mx-auto py-6 px-4 flex justify-between items-center border border-gray-200 dark:border-gray-800  shadow-sm w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <Link href="/"><span className="font-bold text-xl">ManimAI</span></Link>
        </motion.div>

        <div className="flex items-center gap-4">
          {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
          </motion.div> */}

          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/chat" className="text-sm font-medium hover:text-primary transition-colors">
              Chat
            </Link>
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              GitHub
            </Link>
          </motion.nav>

          <ThemeToggle />

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Button asChild className="bg-purple-400 hover:bg-purple-400 dark:bg-white dark:hover:bg-white dark:text-black dark:hover:text-black">
              <Link href="/chat">Try Now</Link>
            </Button>
          </motion.div>
        </div>
      </header>
  );
};
