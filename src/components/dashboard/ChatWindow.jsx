import React, { useState } from "react";
import {
  User,
  Phone,
  MoreVertical,
  Paperclip,
  Send,
  Zap,
  Pin,
  PinOff,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "react-toastify";
import QuickReplies from "./QuickReplies";

const ChatWindow = ({
  contact,
  messages,
  inputText,
  setInputText,
  onSendMessage,
  messagesEndRef,
  onContactUpdate, // 👈 New Prop: Parent ko batane ke liye
}) => {
  const [showQuickReplies, setShowQuickReplies] = useState(false);

  // --- PIN/UNPIN LOGIC ---
  const handleTogglePin = async () => {
    const newStatus = !contact.is_pinned;

    // 1. DB Update
    const { error } = await supabase
      .from("contacts")
      .update({ is_pinned: newStatus })
      .eq("id", contact.id);

    if (error) {
      toast.error("Failed to update pin");
    } else {
      toast.success(newStatus ? "Chat Pinned 📌" : "Chat Unpinned");
      // 2. Parent ko bolo refresh kare (UI Update)
      if (onContactUpdate) {
        onContactUpdate({ ...contact, is_pinned: newStatus });
      }
    }
  };

  const handleTemplateSelect = (message) => {
    setInputText(message);
    setShowQuickReplies(false);
  };

  return (
    <div className="flex-1 flex flex-col relative bg-[#0b141a]">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
        }}
      ></div>

      {/* 1. Header */}
      <div className="h-16 px-4 bg-[#202c33] flex items-center justify-between z-10 border-b border-[#2f3b43]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center">
            <User size={20} className="text-[#cfd4d6]" />
          </div>
          <div>
            <h2 className="text-[#e9edef] font-medium flex items-center gap-2">
              {contact.name}
              {contact.is_pinned && (
                <Pin size={12} className="text-[#00a884] fill-current" />
              )}
            </h2>
            <p className="text-xs text-[#8696a0]">{contact.phone}</p>
          </div>
        </div>
        <div className="flex gap-4 text-[#aebac1]">
          {/* PIN BUTTON */}
          <button
            onClick={handleTogglePin}
            className="hover:text-white"
            title={contact.is_pinned ? "Unpin Chat" : "Pin Chat"}
          >
            {contact.is_pinned ? <PinOff size={20} /> : <Pin size={20} />}
          </button>

          <Phone size={20} className="cursor-pointer hover:text-white" />
          <MoreVertical size={20} className="cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* 2. Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 z-10 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[65%] px-3 py-1.5 rounded-lg text-sm shadow-sm relative ${msg.direction === "outbound" ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none" : "bg-[#202c33] text-[#e9edef] rounded-tl-none"}`}
            >
              <p className="mr-2 whitespace-pre-wrap">{msg.content}</p>
              <span className="text-[10px] float-right mt-1 text-[#8696a0]">
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies Popup */}
      {showQuickReplies && (
        <QuickReplies
          onSelect={handleTemplateSelect}
          onClose={() => setShowQuickReplies(false)}
        />
      )}

      {/* 3. Input Area */}
      <div className="min-h-[62px] bg-[#202c33] px-4 py-2 flex items-center gap-3 z-10 border-t border-[#2f3b43]">
        <button
          onClick={() => setShowQuickReplies(!showQuickReplies)}
          className={`transition-colors ${showQuickReplies ? "text-[#00a884]" : "text-[#8696a0] hover:text-[#00a884]"}`}
        >
          <Zap size={24} fill={showQuickReplies ? "currentColor" : "none"} />
        </button>
        <Paperclip
          size={24}
          className="text-[#8696a0] cursor-pointer hover:text-white"
        />
        <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center px-4 py-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
            placeholder="Type a message..."
            className="bg-transparent w-full focus:outline-none text-[#d1d7db] placeholder-[#8696a0] text-sm"
          />
        </div>
        <button
          onClick={onSendMessage}
          className="text-[#8696a0] hover:text-[#00a884]"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
