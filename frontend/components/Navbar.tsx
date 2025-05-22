"use client";

import Link from "next/link"
import { useTheme } from "next-themes"
import { ArrowRight, Moon, Sun, Code, Sparkles, Play, Zap } from "lucide-react"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, type FC } from "react";

export const Navbar: FC = () => {

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

  return (
    <header className=" mx-auto py-6 px-4 flex justify-between items-center border-2 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-xl">ManimAI</span>
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
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
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Button asChild>
              <Link href="/chat">Try Now</Link>
            </Button>
          </motion.div>
        </div>
      </header>
  );
};
