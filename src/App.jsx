import { ChatProvider } from "./context/ChatContext";


import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <>
      <ChatProvider>
        <div className="bg-black text-white flex h-screen overflow-hidden">
          <div className="w-64 h-full">
            <Sidebar />
          </div>
          <div className="flex-1 h-full">
            <ChatWindow />
          </div>
        </div>
      </ChatProvider>
    </>
  );
}

export default App;
