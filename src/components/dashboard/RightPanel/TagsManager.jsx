import React, { useState } from "react";
import { tagColorMap } from "../../../utils/colorMap";

const TagsManager = ({ contact, onUpdateTags }) => {
  if (!contact)
    return <div className="p-6 text-gray-500 text-xs">Loading tags...</div>;

  // Safe check for tags array
  const currentTags = Array.isArray(contact.tags) ? contact.tags : [];

  const [tagName, setTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");

  const addTag = () => {
    if (!tagName) return;
    const newTag = { text: tagName, color: selectedColor };
    const updatedTags = [...(contact.tags || []), newTag];
    onUpdateTags(updatedTags); // Supabase में अपडेट करने के लिए फंक्शन
    setTagName("");
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-semibold mb-3">Tags</h3>

      {/* Tags Display */}
      <div className="flex flex-wrap gap-2 mb-4">
        {currentTags?.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-0.5 border rounded-full text-xs font-medium ${tagColorMap[tag.color] || tagColorMap.gray}`}
          >
            {tag.text}
          </span>
        ))}
      </div>

      {/* Add New Tag UI */}
      <div className="flex flex-col gap-2">
        <input
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="New tag..."
          className="text-xs p-2 border rounded outline-none focus:border-blue-500"
        />
        <div className="flex justify-between items-center">
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="text-xs border rounded p-1"
          >
            {Object.keys(tagColorMap).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={addTag}
            className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagsManager;
