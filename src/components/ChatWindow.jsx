import { useChat } from "../context/ChatContext";
import ChatInput from "./ChatInput";
import { useEffect, useRef } from "react";
import Message from "./Message";

function ChatWindow() {
  const { activeChat } = useChat();
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);


  return (
    <div className="flex flex-col  bg-gray-900 h-full">
      <div className="sticky top-0 bg-gray-900 z-10 border-b border-gray-800">
        <div className="px-6 py-4 text-lg font-semibold">OrionAI</div>
      </div>
      <div className="flex-1 overflow-y-auto pb-28 pt-2">
        <div className="mx-auto w-full max-w-[80%]">
          {activeChat?.messages.map((msg, index) => (
            <Message key={index} role={msg.role} text={msg.text} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatWindow;
