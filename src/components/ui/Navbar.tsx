"use client";

import { useEffect, useState } from "react";
import { Sparkles, Sun, Moon, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ onNewChat }: { onNewChat: () => void }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark";
    if (saved) setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md 
                 border-b border-white/20 dark:border-gray-800/50 flex items-center justify-between 
                 px-6 py-3"
    >
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-pink-500 flex items-center justify-center shadow-lg">
          <Sparkles className="text-white" size={20} />
        </div>
        <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
          SayHalo
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg 
                     bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md 
                     hover:shadow-lg hover:scale-[1.05] transition-all"
        >
          <Plus size={16} />
          New Chat
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon size={18} className="text-gray-700" />
          ) : (
            <Sun size={18} className="text-yellow-400" />
          )}
        </button>
      </div>
    </motion.nav>
  );
}
