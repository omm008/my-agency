import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Search,
  FileText,
  Image as ImageIcon,
  X,
} from "lucide-react";
import MessageList from "./ChatArea/MessageList";
import MessageInput from "./ChatArea/MessageInput";
import ChatHeader from "./ChatArea/ChatHeader";
import { supabase } from "../../lib/supabaseClient"; // Path check kar lena
import { toast } from "react-toastify";

const ChatWindow = ({
  contact,
  messages = [],
  inputText,
  setInputText,
  onSendMessage,
  messagesEndRef,
  onContactUpdate,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("File size must be less than 5MB");
    }
    const fileType = file.type.startsWith("image/") ? "image" : "document";

    setIsUploading(true);
    const toastId = toast.loading("Uploading media...");

    try {
      // 1. Supabase Storage mein Upload
      const fileName = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;
      const { error: uploadError } = await supabase.storage
        .from("chat-media")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Public URL nikalo
      const {
        data: { publicUrl },
      } = supabase.storage.from("chat-media").getPublicUrl(fileName);

      // 3. Database mein Entry
      const { error: dbError } = await supabase.from("messages").insert([
        {
          contact_id: contact.id,
          direction: "outbound",
          status: "sent",
          content: fileType === "image" ? "📷 Image" : "📄 Document",
          media_url: publicUrl,
          media_type: fileType,
          media_filename: file.name,
        },
      ]);

      if (dbError) throw dbError;

      // 4. 🔥 Backend API Call (Ab ye real WhatsApp message bhejega)
      await axios.post(
        "https://webautomy-backend.onrender.com/api/send-message",
        {
          phone: contact.phone,
          mediaUrl: publicUrl, // URL bhejo
          mediaType: fileType, // Type batao
          // Message body khali chhod sakte hain ya caption bana sakte hain
          message: fileType === "document" ? file.name : "",
        },
      );

      toast.update(toastId, {
        render: "Media Sent! 📤",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: "Failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // --- UI RENDER ---
  return (
    <div className="flex flex-col h-full bg-[#0b141a] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] pointer-events-none"></div>

      {/* Header */}
      <ChatHeader contact={contact} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-4 custom-scrollbar relative z-10">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#202c33] flex items-center gap-2 z-20">
        {/* Attachment Button */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*,application/pdf"
          onChange={handleFileUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={`p-2 text-[#8696a0] hover:bg-[#2a3942] rounded-full transition-colors ${isUploading ? "animate-pulse" : ""}`}
          title="Attach Image or PDF"
        >
          {isUploading ? (
            <MoreVertical className="animate-spin" />
          ) : (
            <Paperclip size={24} />
          )}
        </button>

        {/* Text Input Component */}
        <div className="flex-1">
          <MessageInput
            value={inputText}
            onChange={setInputText}
            onSend={onSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
