import React from "react";
import { User, Phone, Search, MoreVertical } from "lucide-react";

const ChatHeader = ({ contact }) => {
  return (
    <div className="h-16 px-4 bg-[#202c33] flex items-center justify-between z-10 border-b border-[#2f3b43]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center">
          <User size={20} className="text-[#cfd4d6]" />
        </div>
        <div>
          <h2 className="text-[#e9edef] font-medium">{contact.name}</h2>
          <p className="text-xs text-[#8696a0]">{contact.phone}</p>
        </div>
      </div>
      <div className="flex gap-6 text-[#aebac1]">
        <Phone size={20} className="cursor-pointer hover:text-white" />
        <Search size={20} className="cursor-pointer hover:text-white" />
        <MoreVertical size={20} className="cursor-pointer hover:text-white" />
      </div>
    </div>
  );
};

export default ChatHeader;
