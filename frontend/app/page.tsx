"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Cover } from "@/components/ui/cover";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function LandingPage() {


  return (
    <div className="min-h-screen flex flex-col">
    

      <Navbar />

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 py-20 flex flex-col items-center text-center mt-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="mb-8"
        >
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.1 },
            },
          }}
        >
          <AuroraText>Create Mathematical Animations with AI</AuroraText>
          <br />
          within <Cover className="italic">seconds </Cover>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-muted-foreground"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.2 },
            },
          }}
        >
          Transform your ideas into beautiful Manim animations using the power
          of AI. No coding required.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.3 },
            },
          }}
        >
          <Button size="lg" asChild className="bg-blue-400 hover:bg-blue-400 dark:bg-white dark:hover:bg-white dark:text-black dark:hover:text-black">
            <Link href="/chat">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="py-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <MathAnimation />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="aspect-video rounded-xl overflow-hidden border dark:shadow-zinc-500 shadow-lg">
            <video
              className="w-full h-full object-cover"
              autoPlay
              src="/llmanim-video-1748198460461.mp4"
              poster="/poster.png?height=720&width=1280"
              controls
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </motion.div>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          variants={fadeIn}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Create Stunning Animations with{" "}
          <LineShadowText
            shadowColor="gray"
            className="italic text-blue-600 text-4xl md:text-7xl"
          >
            AI
          </LineShadowText>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="AI-Powered Generation"
            description="Describe your animation in natural language and our AI will generate the Manim code for you."
          />
          <FeatureCard
            icon={<Code className="h-6 w-6" />}
            title="No Coding Required"
            description="Create complex mathematical animations without writing a single line of code."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Instant Results"
            description="Get your animations in seconds, not hours. Iterate quickly on your ideas."
          />
        </div>
      </motion.section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        id="about"
        className="container mx-auto px-4 py-20 bg-muted/30 rounded-3xl my-10"
      >
        <motion.h2
          variants={fadeIn}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <TextAnimate animation="blurInUp" by="character">
            How It Works
          </TextAnimate>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          <StepCard
            number="1"
            title="Describe Your Animation"
            description="Tell our AI what mathematical concept you want to visualize."
          />
          <StepCard
            number="2"
            title="AI Generates Manim Code"
            description="Our AI translates your description into Manim animation code."
          />
          <StepCard
            number="3"
            title="Get Your Animation"
            description="Download your animation or share it directly with others."
          />
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container mx-auto px-4 py-20 text-center"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7 },
            },
          }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          <TextAnimate animation="blurInUp" by="character">
            Ready to Create Beautiful Math Animations?
          </TextAnimate>
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.1 },
            },
          }}
          className="text-xl mb-10 max-w-2xl mx-auto text-muted-foreground"
        >
          Join thousands of educators, students, and math enthusiasts who are
          creating stunning visualizations with ManimAI.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.2 },
            },
          }}
        >
          <Button
            size="lg"
            asChild
            className="bg-blue-400 hover:bg-blue-400 dark:bg-white dark:hover:bg-white dark:text-black dark:hover:text-black"
          >
            <Link href="/chat">
              Start Creating Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.section>

      <footer className="mt-auto border-t py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="font-medium">ManimAI</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ManimAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="p-6 rounded-xl bg-background shadow-sm relative"
    >
      <div className="absolute -top-6 left-6 h-12 w-12 rounded-full flex items-center justify-center text-white dark:text-black font-bold text-xl bg-blue-400">
        {number}
      </div>
      <div className="mt-6 ">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

function MathAnimation() {
  return (
    <svg width="1000" height="400" viewBox="0 0 1000 400">
      <motion.path
        d="M100,200 C100,100 400,100 400,200 S700,300 700,200 S1000,100 1000,200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 0.5,
          transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          },
        }}
      />
      <motion.circle
        cx="100"
        cy="200"
        r="8"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5, delay: 0.5 },
        }}
      />
      <motion.circle
        cx="400"
        cy="200"
        r="8"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5, delay: 1 },
        }}
      />
      <motion.circle
        cx="700"
        cy="200"
        r="8"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5, delay: 1.5 },
        }}
      />
      <motion.circle
        cx="1000"
        cy="200"
        r="8"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5, delay: 2 },
        }}
      />
    </svg>
  );
}
