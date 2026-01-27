import React, { useState, useEffect } from "react";

const ContactInfo = ({ contact, onUpdateNotes }) => {
  const [noteText, setNoteText] = useState(contact.notes || "");
  const [isSaving, setIsSaving] = useState(false);

  // Jab contact change ho, note bhi update ho jaye
  useEffect(() => {
    setNoteText(contact.notes || "");
  }, [contact]);

  const handleSaveNote = async () => {
    setIsSaving(true);
    await onUpdateNotes(contact.id, noteText);
    setIsSaving(false);
  };

  return (
    <div className="p-6 border-b bg-white">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-500 mb-2">
          {contact.name?.charAt(0) || "#"}
        </div>
        <h2 className="text-lg font-bold text-gray-800">
          {contact.name || "Unknown"}
        </h2>
        <p className="text-sm text-gray-500">{contact.phone}</p>
      </div>

      {/* Private Notes Section */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Private Notes
        </label>
        <textarea
          className="w-full text-sm p-3 border rounded-lg bg-yellow-50 focus:bg-white focus:ring-2 focus:ring-yellow-200 outline-none transition-all resize-none h-32"
          placeholder="Write internal notes about this client..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button
          onClick={handleSaveNote}
          disabled={isSaving}
          className="w-full py-2 text-xs font-medium text-white bg-gray-800 rounded hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Note"}
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;
