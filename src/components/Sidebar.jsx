import { useChat } from "../context/ChatContext";

function Sidebar() {
  const { chats, activeChatId, setActiveChatId, createNewChat, deleteChat } =
    useChat();

  return (
    <div className="flex flex-col bg-gray-950 h-full">
      <h1 className="ml-3 mt-3 mb-4 font-bold text-gray-200">Recent</h1>

      <button
        onClick={createNewChat}
        className="mx-2 mb-4 px-4 py-2 rounded-3xl bg-gray-800 hover:bg-gray-700 transition text-sm"
      >
        + New Chat
      </button>

      <div className="flex-1 overflow-y-auto pb-6 px-2 space-y-1">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            className={`group flex items-center justify-between px-4 py-2 rounded-2xl cursor-pointer transition
              ${
                chat.id === activeChatId
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
          >
            {/* Chat title */}
            <span className="truncate text-sm">{chat.title}</span>

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition"
              title="Delete chat"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
