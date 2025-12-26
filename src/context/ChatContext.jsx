import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("orion_chats");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "chat-1",
            title: "New Chat",
            messages: [{ role: "ai", text: "Hi! How can I help you today?" }],
          },
        ];
  });

    const deleteChat = (chatId) => {
      setChats((prev) => {
        if (prev.length === 1) return prev; // prevent deleting last chat

        const filtered = prev.filter((chat) => chat.id !== chatId);

        // If active chat deleted → switch to first available chat
        if (chatId === activeChatId) {
          setActiveChatId(filtered[0].id);
        }

        return filtered;
      });
    };


  const [activeChatId, setActiveChatId] = useState(() => {
    return localStorage.getItem("orion_active_chat") || "chat-1";
  });


  const [isTyping, setIsTyping] = useState(false);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const addMessage = (message) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== activeChatId) return chat;

        const isFirstUserMessage =
          chat.messages.length === 1 && message.role === "user";

        return {
          ...chat,
          title: isFirstUserMessage
            ? message.text.split(" ").slice(0, 5).join(" ")
            : chat.title,
          messages: [...chat.messages, message],
        };
      })
    );
  };


  const updateLastMessage = (newText) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== activeChatId) return chat;

        const updatedMessages = [...chat.messages];
        updatedMessages[updatedMessages.length - 1] = {
          ...updatedMessages[updatedMessages.length - 1],
          text: newText,
        };

        return { ...chat, messages: updatedMessages };
      })
    );
  };

  const createNewChat = () => {
    const newChatId = `chat-${Date.now()}`;

    const newChat = {
      id: newChatId,
      title: "New Chat",
      messages: [{ role: "ai", text: "Hi! How can I help you today?" }],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChatId);
    };
    
    useEffect(() => {
      localStorage.setItem("orion_chats", JSON.stringify(chats));
    }, [chats]);

    useEffect(() => {
      localStorage.setItem("orion_active_chat", activeChatId);
    }, [activeChatId]);


  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChat,
        activeChatId,
        setActiveChatId,
        addMessage,
        updateLastMessage,
        deleteChat,
        createNewChat,
        isTyping,
        setIsTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
