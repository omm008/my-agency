// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  User,
  RefreshCcw,
  Send,
  Search,
  MoreVertical,
  Phone,
  Paperclip,
} from "lucide-react";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🆕 State for Input
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null); // Auto-scroll ke liye

  // 1. Load Contacts
  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching contacts:", error);
    else setContacts(data || []);
    setLoading(false);
  };

  // 2. Load Messages
  const fetchMessages = async (contactId) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("contact_id", contactId)
      .order("created_at", { ascending: true });

    if (error) console.error("Error fetching messages:", error);
    else setMessages(data || []);
  };

  // 3. 🚀 HANDLE SEND MESSAGE (Simulation Logic)
  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedContact) return;

    const textToSend = inputText;
    setInputText(""); // UI ko turant clear karo

    // A. Database mein save karo (Fake Outbound)
    const { error } = await supabase.from("messages").insert([
      {
        contact_id: selectedContact.id,
        content: textToSend,
        direction: "outbound", // Yeh right side dikhega
        status: "sent",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message locally.");
    } else {
      // B. Message list refresh karo
      fetchMessages(selectedContact.id);
    }
  };

  // 4. Handle Enter Key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial Load & Polling
  useEffect(() => {
    fetchContacts();
    const interval = setInterval(() => {
      fetchContacts();
      if (selectedContact) fetchMessages(selectedContact.id);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedContact]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    fetchMessages(contact.id);
  };

  return (
    <div className="flex h-screen bg-[#0b141a] text-[#e9edef] overflow-hidden font-sans">
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 min-w-[320px] max-w-[450px] border-r border-[#2f3b43] flex flex-col bg-[#111b21]">
        {/* Header */}
        <div className="h-16 px-4 bg-[#202c33] flex items-center justify-between border-b border-[#2f3b43]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
              <img
                src="/webautomy.svg"
                alt="Me"
                className="w-6 h-6 opacity-80"
              />
            </div>
            <span className="font-semibold text-gray-300">WebAutomy Admin</span>
          </div>
          <div className="flex gap-4 text-[#aebac1]">
            <button
              onClick={fetchContacts}
              className="hover:text-white transition-colors"
              title="Refresh"
            >
              <RefreshCcw size={20} />
            </button>
            <MoreVertical size={20} className="cursor-pointer" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-2 border-b border-[#2f3b43]">
          <div className="bg-[#202c33] rounded-lg flex items-center px-4 py-1.5">
            <Search size={18} className="text-[#aebac1] mr-4" />
            <input
              type="text"
              placeholder="Search or start new chat"
              className="bg-transparent w-full text-sm py-1 focus:outline-none text-[#d1d7db] placeholder-[#8696a0]"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-20 text-[#8696a0] text-sm">
              Loading chats...
            </div>
          ) : contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-[#8696a0]">
              <p>No active chats.</p>
              <span className="text-xs mt-2">
                Waiting for webhook events...
              </span>
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                className={`flex items-center gap-3 p-3 cursor-pointer border-b border-[#2f3b43] hover:bg-[#202c33] transition-colors ${
                  selectedContact?.id === contact.id ? "bg-[#2a3942]" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#6a7175] flex items-center justify-center flex-shrink-0">
                  <User size={24} className="text-[#cfd4d6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[#e9edef] font-medium truncate">
                      {contact.name || contact.phone}
                    </h3>
                    <span className="text-xs text-[#8696a0]">
                      {new Date(contact.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-[#8696a0] truncate mt-0.5">
                    {contact.phone}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT MAIN: Chat Area */}
      <div className="flex-1 flex flex-col relative bg-[#0b141a]">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
          }}
        ></div>

        {selectedContact ? (
          <>
            {/* Header */}
            <div className="h-16 px-4 bg-[#202c33] flex items-center justify-between z-10 border-b border-[#2f3b43]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#6a7175] flex items-center justify-center">
                  <User size={20} className="text-[#cfd4d6]" />
                </div>
                <div>
                  <h2 className="text-[#e9edef] font-medium">
                    {selectedContact.name}
                  </h2>
                  <p className="text-xs text-[#8696a0]">
                    {selectedContact.phone}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 text-[#aebac1]">
                <Phone size={20} className="cursor-pointer hover:text-white" />
                <Search size={20} className="cursor-pointer hover:text-white" />
                <MoreVertical
                  size={20}
                  className="cursor-pointer hover:text-white"
                />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-2 z-10 custom-scrollbar">
              {messages.length === 0 ? (
                <div className="flex justify-center mt-10">
                  <div className="bg-[#1f2c34] text-[#ffd279] text-xs px-4 py-2 rounded-lg shadow-sm border border-[#2a3942]">
                    Messages are end-to-end encrypted. No one outside of this
                    chat, not even WhatsApp, can read or listen to them.
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[65%] px-3 py-1.5 rounded-lg text-sm shadow-sm relative leading-relaxed ${
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
                ))
              )}
              {/* Invisible element to auto-scroll to bottom */}
              <div ref={messagesEndRef} />
            </div>

            {/* 🆕 Footer Input (Working Now) */}
            <div className="min-h-[62px] bg-[#202c33] px-4 py-2 flex items-center gap-3 z-10 border-t border-[#2f3b43]">
              <Paperclip
                size={24}
                className="text-[#8696a0] cursor-pointer hover:text-[#cfd4d6]"
              />
              <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center px-4 py-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="bg-transparent w-full focus:outline-none text-[#d1d7db] placeholder-[#8696a0] text-sm"
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="text-[#8696a0] hover:text-[#00a884] transition-colors"
              >
                <Send size={24} />
              </button>
            </div>

            {/* Warning ko thoda friendly bana diya */}
            <div className="bg-[#111b21] text-[#00a884] text-[10px] text-center py-1 z-10 border-t border-[#2f3b43]">
              ✅ Simulator Mode: Messages are saved to Database only.
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#222e35] border-b-8 border-[#00a884] z-10">
            <div className="text-center">
              <h1 className="text-3xl font-light text-[#e9edef] mb-4">
                WebAutomy Web
              </h1>
              <p className="text-[#8696a0] text-sm max-w-md mx-auto leading-6">
                Send and receive messages without keeping your phone online.{" "}
                <br />
                Use WebAutomy on up to 4 linked devices and 1 phone.
              </p>
              <div className="mt-8 flex justify-center text-[#667781] text-xs items-center gap-1">
                <span>🔒</span> End-to-end encrypted
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
