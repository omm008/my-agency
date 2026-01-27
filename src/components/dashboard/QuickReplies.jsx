import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { X, Zap, Loader } from "lucide-react";

const QuickReplies = ({ onSelect, onClose }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Templates from DB
  useEffect(() => {
    const fetchReplies = async () => {
      const { data } = await supabase.from("quick_replies").select("*");
      setReplies(data || []);
      setLoading(false);
    };
    fetchReplies();
  }, []);

  return (
    <div className="absolute bottom-20 left-4 right-4 bg-[#202c33] border border-[#2f3b43] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 max-w-lg">
      {/* Header */}
      <div className="bg-[#2a3942] p-3 flex items-center justify-between border-b border-[#2f3b43]">
        <div className="flex items-center gap-2 text-[#00a884] font-medium">
          <Zap size={16} fill="currentColor" /> Quick Replies
        </div>
        <button onClick={onClose} className="text-[#aebac1] hover:text-white">
          <X size={18} />
        </button>
      </div>

      {/* List */}
      <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
        {loading ? (
          <div className="p-4 text-center text-[#8696a0] flex justify-center">
            <Loader className="animate-spin" size={20} />
          </div>
        ) : replies.length === 0 ? (
          <div className="p-4 text-center text-[#8696a0] text-sm">
            No templates found.
          </div>
        ) : (
          <div className="grid gap-2">
            {replies.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item.message)}
                className="p-3 hover:bg-[#111b21] rounded-lg cursor-pointer border border-transparent hover:border-[#2f3b43] transition-all group"
              >
                <div className="text-[#e9edef] font-medium text-sm mb-1 group-hover:text-[#00a884]">
                  {item.title}
                </div>
                <div className="text-[#8696a0] text-xs truncate">
                  {item.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickReplies;
