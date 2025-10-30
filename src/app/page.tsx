"use client";

import { useState } from "react";
import ChatInput from "@/components/ui/ChatInput";
import MessageWindow from "@/components/ui/MessageWindow";
import SettingsModal from "@/components/ui/SettingsModal";
import HeroSection from "@/components/ui/HeroSection";
import { AnimatePresence, motion } from "framer-motion";
import { ChatHistory, ChatSettings, Message, MessageRole } from "@/types";

export default function Home() {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 1,
    model: "gemini-2.0-flash-exp",
    systemInstruction: "you are a helpful assistant",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;
    const newUserMessage: Message = {
      role: "user" as MessageRole,
      parts: [{ text: message }],
    };
    const updatedHistory = [...history, newUserMessage];
    setHistory(updatedHistory);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: message, history: updatedHistory, settings }),
      });

      const data = await response.json();
      if (data.error) return console.error("AI Error:", data.error);

      const cleanResponse = data.response
  .replace(/\*\*/g, '')          // remove bold
  .replace(/\*/g, '')            // remove single asterisks
  .replace(/#+/g, '')            // remove markdown headers (#)
  .replace(/`+/g, '')            // remove code ticks
  .replace(/\n{2,}/g, '\n')      // reduce multiple newlines
  .trim();

const aiMessage: Message = {
  role: "model" as MessageRole,
  parts: [{ text: cleanResponse }],
};

      setHistory([...updatedHistory, aiMessage]);
    } catch (error) {
      console.error("Request Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSettings = () => setIsSettingsOpen(true);
  const handleCloseSettings = () => setIsSettingsOpen(false);
  const handleSaveSettings = (newSettings: ChatSettings) => setSettings(newSettings);
  const handleCardClick = (prompt: string) => handleSend(prompt);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100 text-gray-900"
      }`}
    >
      <AnimatePresence mode="wait">
        {history.length === 0 ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <HeroSection
              onCardClick={handleCardClick}
              darkMode={darkMode}
              toggleTheme={() => setDarkMode(!darkMode)}
            />
            <ChatInput onSend={handleSend} onOpenSettings={handleOpenSettings} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col flex-grow"
          >
            <MessageWindow history={history} darkMode={darkMode} isLoading={isLoading} />
            <SettingsModal
              isOpen={isSettingsOpen}
              onClose={handleCloseSettings}
              onSave={handleSaveSettings}
              currentSettings={settings}
            />
            <ChatInput
              onSend={handleSend}
              onOpenSettings={handleOpenSettings}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
