"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Image, X, Settings, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onOpenSettings: () => void;
  isLoading?: boolean;
}

export default function ChatInput({
  onSend,
  onOpenSettings,
  isLoading = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || isLoading) return;
    onSend(message.trim());
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="m-10fixed bottom-4 left-0 right-0 flex justify-center px-4 ">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center w-full max-w-3xl 
                   bg-white/90 dark:bg-gray-900/90 
                   border border-gray-300/40 dark:border-gray-700/40
                   rounded-2xl backdrop-blur-2xl shadow-lg px-4 py-2
                   transition-colors duration-300"
      >
        {/* Mic */}
        <button
          className="p-2 hover:scale-110 transition-transform text-blue-600 dark:text-blue-300"
          aria-label="Record voice"
        >
          <Mic size={20} />
        </button>

        {/* Input */}
        <div className="relative flex-1 mx-2">
          <textarea
            className="w-full bg-transparent text-gray-900 dark:text-gray-100 
                       placeholder:text-gray-500 dark:placeholder:text-gray-400 
                       focus:outline-none resize-none py-2 text-base leading-relaxed
                       selection:bg-blue-200 dark:selection:bg-blue-700"
            placeholder="Ask SayHalo anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
            disabled={isLoading}
          />
          {message && !isLoading && (
            <button
              onClick={() => setMessage("")}
              className="absolute right-1 top-1/2 -translate-y-1/2 
                         p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                         transition-colors"
              aria-label="Clear input"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Image */}
        <button
          className="p-2 hover:scale-110 transition-transform text-blue-600 dark:text-blue-300"
          aria-label="Upload image"
        >
          <Image size={20} />
        </button>

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          className="p-2 hover:scale-110 transition-transform text-blue-600 dark:text-blue-300"
          aria-label="Open settings"
        >
          <Settings size={20} />
        </button>

        {/* Send */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          disabled={isLoading || !message.trim()}
          className={`ml-3 p-3 rounded-full shadow-md transition-all duration-200 ${
            message.trim() && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
