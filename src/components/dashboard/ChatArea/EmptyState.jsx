import React from "react";

const EmptyState = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0b141a] z-10 text-center border-b-8 border-[#00a884]">
      <h1 className="text-2xl font-light text-[#e9edef] mb-2">WebAutomy Web</h1>
      <p className="text-[#8696a0] text-sm">Select a chat to start messaging</p>
      <div className="mt-8 text-xs text-[#667781]">🔒 End-to-end encrypted</div>
    </div>
  );
};

export default EmptyState;
