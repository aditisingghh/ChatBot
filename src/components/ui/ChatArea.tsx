"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  darkMode: boolean;
}

export default function ChatArea({ messages, isLoading, darkMode }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div
      className={`flex-1 overflow-y-auto px-4 pb-32 pt-6 sm:px-6 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-transparent text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-3`}
            >
              {!isUser && (
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 flex items-center justify-center shadow-md">
                  <Bot size={18} className="text-white" />
                </div>
              )}

              <div
                className={`px-4 py-3 rounded-2xl text-sm sm:text-base shadow-md max-w-[80%] leading-relaxed ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 border border-white/30 dark:border-gray-700/40 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>

              {isUser && (
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                  <User size={18} className="text-white" />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Loading / Typing dots */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 flex items-center justify-center shadow-md">
              <Bot size={18} className="text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-white/30 dark:border-gray-700/40 text-gray-900 dark:text-gray-100 shadow-md flex gap-2">
              <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
