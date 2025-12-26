import { useState } from "react";
import { getGroqResponse } from "../services/groq";

import { useChat } from "../context/ChatContext";

function ChatInput() {
  const [input, setInput] = useState("");

  const { addMessage, updateLastMessage, isTyping, setIsTyping } = useChat();

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    setIsTyping(true);

    addMessage({ role: "user", text: input });
    addMessage({ role: "ai", text: "Typing..." });

    setInput("");

    try {
      const aiResponse = await getGroqResponse(input);
      updateLastMessage(aiResponse);
    } catch (err) {
      updateLastMessage("⚠️ Something went wrong. Please try again.");
    } finally {
      setIsTyping(false);
    }


    setIsTyping(false);
  };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // prevent new line
        handleSend();
      }
    };


  return (
    <div className="sticky bottom-0 bg-gray-900 py-2">
      <div className="flex flex-col items-center ">
        <div className="w-full max-w-[60%] items-center bg-gray-800 text-white rounded-full px-4 flex flex-row py-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent px-4 outline-none ${
              isTyping ? "opacity-50 cursor-not-allowed" : ""
            }`}
            placeholder={isTyping ? "AI is typing..." : "Ask something"}
          />

          <button
            onClick={handleSend}
            disabled={isTyping}
            className={`ml-2 px-4 py-2 rounded-full transition ${
              isTyping
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Ask
          </button>
        </div>
        <div className="text-xs pt-1">
          Please cross verify important info. OrionAI can make mistakes.
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
