import React from "react";
import { Paperclip, Send } from "lucide-react";

const MessageInput = ({ inputText, setInputText, onSendMessage }) => {
  return (
    <div className="min-h-[62px] bg-[#202c33] px-4 py-2 flex items-center gap-3 z-10 border-t border-[#2f3b43]">
      <Paperclip size={24} className="text-[#8696a0] cursor-pointer" />
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
  );
};

export default MessageInput;
