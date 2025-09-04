"use client";

import Link from "next/link"
import {Sparkles} from "lucide-react"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { type FC } from "react";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar: FC = () => {

  return (
    <header className="fixed backdrop-blur-lg bg-white/30 dark:bg-black/30 z-40 mx-auto py-6 px-4 flex justify-between items-center border border-gray-200 dark:border-gray-800  shadow-sm w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <Link href="/"><span className="font-bold text-xl">ManimAI</span></Link>
        </motion.div>

        <div className="flex items-center gap-4">

          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/chat" className="text-sm font-medium hover:text-primary transition-colors">
              Chat
            </Link>
            <Link href="#about" scroll={true} className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="https://github.com/roykhushi/llmanim" className="text-sm font-medium hover:text-primary transition-colors">
              GitHub
            </Link>
          
          <ThemeToggle />
          </motion.nav>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Button asChild className="bg-red-400 hover:bg-red-400 dark:bg-white dark:hover:bg-white dark:text-black dark:hover:text-black">
              <Link href="/chat">Try Now</Link>
            </Button>
          </motion.div>
        </div>
      </header>
  );
};
