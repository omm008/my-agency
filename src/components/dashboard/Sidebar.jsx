import React from "react";
import { MessageSquare, Bot, Lock } from "lucide-react";
import logo from "../../assets/logo.png"; // Logo ka path check karlena

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="w-[80px] bg-[#202c33] flex flex-col items-center py-6 border-r border-[#2f3b43] gap-6 z-20">
      <div className="w-10 h-10 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
        <img src={logo} alt="Logo" className="w-full h-full object-contain" />
      </div>

      {/* Chats Tab */}
      <div
        onClick={() => setActiveTab("chats")}
        className={`p-3 rounded-xl cursor-pointer transition-all ${
          activeTab === "chats"
            ? "bg-[#00a884] text-white shadow-lg shadow-[#00a884]/20"
            : "text-[#aebac1] hover:bg-[#2a3942] hover:text-white"
        }`}
      >
        <MessageSquare size={24} />
      </div>

      {/* Automation Tab */}
      <div
        onClick={() => setActiveTab("automation")}
        className={`p-3 rounded-xl cursor-pointer transition-all ${
          activeTab === "automation"
            ? "bg-[#00a884] text-white shadow-lg shadow-[#00a884]/20"
            : "text-[#aebac1] hover:bg-[#2a3942] hover:text-white"
        }`}
      >
        <Bot size={24} />
      </div>

      <div className="mt-auto p-3 text-[#aebac1] hover:text-white cursor-pointer">
        <Lock size={24} onClick={onLogout} title="Lock System" />
      </div>
    </div>
  );
};

export default Sidebar;
