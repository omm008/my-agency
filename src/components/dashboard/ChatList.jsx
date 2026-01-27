import React, { useState } from "react";
import { User, Search, Filter, X } from "lucide-react";

import { Pin } from "lucide-react";

const ChatList = ({
  contacts,
  selectedContact,
  onSelectContact,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("All"); // 'All', 'VIP', 'Lead', etc.
  const [showFilter, setShowFilter] = useState(false); // Filter menu khula hai ya band?

  const filteredContacts = contacts
    .filter((contact) => {
      // 1. Search Logic
      const matchesSearch =
        contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone?.includes(searchTerm);

      // 2. Tag Filter Logic
      let matchesTag = true;
      if (filterTag !== "All") {
        const tags = Array.isArray(contact.tags) ? contact.tags : [];
        matchesTag = tags.some((t) => t.text === filterTag);
      }
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      // 3. SORTING: Pinned items first!
      // Agar a pinned hai aur b nahi, to a upar (-1)
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      // Agar dono same hain, to date ke hisaab se sort karo (Newest first)
      return new Date(b.created_at) - new Date(a.created_at);
    });

  // Pre-defined filters (Jo humne TagsManager me banaye the)
  const FILTERS = ["All", "VIP", "Lead", "Pending", "Customer"];

  return (
    <div className="w-[350px] border-r border-[#2f3b43] flex flex-col bg-[#111b21]">
      {/* 1. Header with Filter Icon */}
      <div className="h-16 px-4 bg-[#202c33] flex items-center justify-between border-b border-[#2f3b43]">
        <span className="font-semibold text-gray-300 text-lg">Chats</span>
        <div className="flex gap-4 text-[#aebac1]">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`transition-colors ${filterTag !== "All" ? "text-[#00a884]" : "hover:text-white"}`}
            title="Filter by Tag"
          >
            <Filter
              size={20}
              fill={filterTag !== "All" ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      {/* 2. Filter Bar (Conditional Show) */}
      {showFilter && (
        <div className="bg-[#202c33] px-4 pb-3 border-b border-[#2f3b43] animate-in slide-in-from-top-2">
          <div className="text-[10px] text-[#8696a0] uppercase tracking-wider mb-2">
            Filter by Tag:
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilterTag(f)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  filterTag === f
                    ? "bg-[#00a884] text-[#111b21] border-[#00a884] font-bold"
                    : "bg-transparent text-[#aebac1] border-[#2f3b43] hover:border-[#8696a0]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Search Bar */}
      <div className="p-2 border-b border-[#2f3b43]">
        <div className="bg-[#202c33] rounded-lg flex items-center px-4 py-1.5">
          <Search size={16} className="text-[#aebac1] mr-3" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent w-full text-sm py-1 focus:outline-none text-[#d1d7db] placeholder-[#8696a0]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <X
              size={14}
              className="cursor-pointer text-[#8696a0]"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
      </div>

      {/* 4. The List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredContacts.length === 0 ? (
          <div className="p-8 text-center text-[#8696a0] text-sm flex flex-col items-center">
            <span className="mb-2">🔍</span>
            No chats found.
            {filterTag !== "All" && (
              <span
                className="text-xs mt-1 text-[#00a884]"
                onClick={() => setFilterTag("All")}
              >
                Clear Filter
              </span>
            )}
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className={`flex items-center gap-3 p-3 cursor-pointer border-b border-[#2f3b43] hover:bg-[#202c33] transition-colors ${selectedContact?.id === contact.id ? "bg-[#2a3942]" : ""}`}
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-[#6a7175] flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                {contact.avatar_url ? (
                  <img
                    src={contact.avatar_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={24} className="text-[#cfd4d6]" />
                )}
                {/* 📌 Small Pin Badge on Avatar */}
                {contact.is_pinned && (
                  <div className="absolute bottom-0 right-0 bg-[#00a884] p-0.5 rounded-full border-2 border-[#111b21]">
                    <Pin size={8} className="text-white fill-current" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[#e9edef] font-medium truncate text-base">
                    {contact.name || contact.phone}
                  </h3>
                  <span className="text-[10px] text-[#8696a0]">
                    {new Date(contact.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#8696a0] truncate max-w-[140px]">
                    {contact.phone}
                  </p>

                  {/* Tags Badges (Small dots) */}
                  <div className="flex gap-1">
                    {(Array.isArray(contact.tags) ? contact.tags : [])
                      .slice(0, 3)
                      .map((tag, idx) => {
                        const colorMap = {
                          gold: "bg-yellow-500",
                          blue: "bg-blue-500",
                          red: "bg-red-500",
                          green: "bg-green-500",
                        };
                        return (
                          <div
                            key={idx}
                            className={`w-2.5 h-2.5 rounded-full ${colorMap[tag.color] || "bg-gray-500"}`}
                            title={tag.text}
                          ></div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
