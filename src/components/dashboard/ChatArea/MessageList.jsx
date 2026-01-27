import React from "react";

const MessageList = ({ messages, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 z-10 custom-scrollbar">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.direction === "outbound" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[65%] px-3 py-1.5 rounded-lg text-sm shadow-sm relative ${
              msg.direction === "outbound"
                ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none"
                : "bg-[#202c33] text-[#e9edef] rounded-tl-none"
            }`}
          >
            <p className="mr-2">{msg.content}</p>
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
  );
};

export default MessageList;
