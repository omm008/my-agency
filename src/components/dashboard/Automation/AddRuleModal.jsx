import React, { useState } from "react";
import { toast } from "react-toastify";

const AddRuleModal = ({ onAdd, onCancel }) => {
  const [newRule, setNewRule] = useState({
    keyword: "",
    reply: "",
    matchType: "contains",
  });

  const handleSave = () => {
    if (!newRule.keyword || !newRule.reply) {
      return toast.warning("Please fill all fields");
    }
    onAdd(newRule);
  };

  return (
    <div className="bg-[#202c33] p-6 rounded-xl border border-[#2f3b43] mb-6 shadow-xl animate-in fade-in slide-in-from-top-4">
      <h3 className="text-white font-medium mb-4">Create New Auto-Reply</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="text-xs text-[#8696a0] uppercase tracking-wider mb-1 block">
            When customer says:
          </label>
          <input
            type="text"
            placeholder="e.g. Price"
            className="w-full bg-[#111b21] p-3 rounded-lg text-white border border-[#2f3b43] focus:border-[#00a884] outline-none"
            value={newRule.keyword}
            onChange={(e) =>
              setNewRule({ ...newRule, keyword: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-xs text-[#8696a0] uppercase tracking-wider mb-1 block">
            Bot should reply:
          </label>
          <input
            type="text"
            placeholder="e.g. Our price is $50"
            className="w-full bg-[#111b21] p-3 rounded-lg text-white border border-[#2f3b43] focus:border-[#00a884] outline-none"
            value={newRule.reply}
            onChange={(e) => setNewRule({ ...newRule, reply: e.target.value })}
          />
        </div>
        <div>
          <label className="text-xs text-[#8696a0] uppercase tracking-wider mb-1 block">
            Matching Logic:
          </label>
          <select
            className="w-full bg-[#111b21] p-3 rounded-lg text-white border border-[#2f3b43] focus:border-[#00a884] outline-none"
            value={newRule.matchType}
            onChange={(e) =>
              setNewRule({ ...newRule, matchType: e.target.value })
            }
          >
            <option value="contains">Contains (e.g. 'Price please')</option>
            <option value="exact">Exact Match (Must be 'Price')</option>
          </select>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="text-[#8696a0] hover:text-white px-4 py-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-[#00a884] text-[#111b21] px-6 py-2 rounded-lg font-bold hover:bg-[#008f6f]"
        >
          Save Rule
        </button>
      </div>
    </div>
  );
};

export default AddRuleModal;
