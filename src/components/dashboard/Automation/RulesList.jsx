import React from "react";
import { Bot, Trash2 } from "lucide-react";

const RulesList = ({ rules, onDeleteRule }) => {
  if (rules.length === 0) {
    return (
      <div className="text-center text-[#8696a0] mt-20">
        <Bot size={48} className="mx-auto mb-4 opacity-50" />
        <p>No automation rules yet.</p>
        <p className="text-sm">Create a rule to let the bot handle messages.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="bg-[#111b21] p-4 rounded-lg border border-[#2f3b43] flex items-center justify-between group hover:border-[#00a884] transition-colors"
        >
          <div className="flex items-center gap-6">
            <div className="bg-[#202c33] p-3 rounded-lg text-[#00a884] font-mono text-sm border border-[#2f3b43]">
              "{rule.trigger_keyword}"
            </div>
            <div className="text-[#8696a0]">➔</div>
            <div className="text-gray-300 text-sm truncate max-w-md">
              {rule.reply_message}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-[#8696a0] bg-[#202c33] px-2 py-1 rounded">
              {rule.match_type}
            </span>
            <button
              onClick={() => onDeleteRule(rule.id)}
              className="text-[#8696a0] hover:text-red-400 p-2 rounded-full hover:bg-[#202c33] transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RulesList;
