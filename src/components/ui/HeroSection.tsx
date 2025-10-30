"use client";

import { useEffect, useState } from "react";
import { Wand2, Sparkles, TrendingUp, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection({
  onCardClick,
  darkMode,
  toggleTheme,
}: {
  onCardClick: (prompt: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateClock();
    const timer = setInterval(updateClock, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-20 px-4 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-4 right-6 flex items-center gap-4"
      >
        <span className="text-sm text-gray-500">{currentTime}</span>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/70 dark:bg-gray-700/70 hover:scale-105 transition-all"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-4 flex items-center justify-center gap-2"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <Sparkles className="text-white" size={22} />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Aditi Chat-Bot</h1>
      </motion.div>

      <h2 className="text-4xl sm:text-5xl font-semibold mb-3">
  Hi,{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400">
    I'm AssistAI — Your Digital Assistant 
  </span>
</h2>

      <p className="text-lg text-gray-600 max-w-xl dark:text-gray-400">
        How Can I help you today?
      </p>
      <p className="text-sm text-gray-500 mt-2 max-w-md">
        Ready to assist you — from answering questions to giving recommendations.
      </p>

      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delayChildren: 0.3, staggerChildren: 0.15 },
          },
        }}
      >
        <HeroCard
          title="Wanderlust Destinations 2025"
          subtitle="Must-Visit Places"
          icon={<Wand2 size={20} />}
          onClick={() => onCardClick("Tell me about top travel destinations in 2025.")}
        />
        <HeroCard
          title="AssistAI: What Sets Us Apart"
          subtitle="Key Differentiators"
          icon={<Sparkles size={20} />}
          onClick={() => onCardClick("What makes AssistAI special?")}
        />
        <HeroCard
          title="Design Trends on Instagram 2025"
          subtitle="Trending Now"
          icon={<TrendingUp size={20} />}
          onClick={() => onCardClick("What are trending design styles on Instagram in 2025?")}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroCard({ title, subtitle, icon, onClick }: any) {
  return (
    <motion.button
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col w-64 sm:w-72 p-5 bg-white/80 dark:bg-gray-800/70 
                 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg 
                 transition-all duration-200 border border-white/60 
                 dark:border-gray-700 text-left"
    >
      <div className="flex items-center gap-2 text-blue-600 dark:text-pink-400 mb-1">
        {icon}
        <span className="font-semibold text-sm">{subtitle}</span>
      </div>
      <h3 className="text-gray-800 dark:text-gray-100 font-medium leading-snug">
        {title}
      </h3>
    </motion.button>
  );
}
