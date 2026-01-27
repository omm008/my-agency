import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import { User, RefreshCcw, Bot, Plus, Trash2, X, Lock } from "lucide-react";

// --- IMPORTS (Apne naye components) ---
import Sidebar from "../components/dashboard/Sidebar";
import ChatList from "../components/dashboard/ChatList"; // Step 3 wala component
import ChatWindow from "../components/dashboard/ChatWindow"; // Step 2 wala component

// --- CONFIGURATION ---
const COLOR_CLASSES = {
  gold: "border-yellow-500 text-yellow-500 bg-yellow-500/10",
  blue: "border-blue-500 text-blue-500 bg-blue-500/10",
  red: "border-red-500 text-red-500 bg-red-500/10",
  green: "border-green-500 text-green-500 bg-green-500/10",
  gray: "border-gray-500 text-gray-500 bg-gray-500/10",
};

const PREDEFINED_TAGS = [
  { text: "VIP", color: "gold" },
  { text: "Lead", color: "blue" },
  { text: "Pending", color: "red" },
  { text: "Customer", color: "green" },
];

const AdminDashboard = () => {
  // --- AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState("chats");
  const [isAddingRule, setIsAddingRule] = useState(false);

  // --- DATA STATE ---
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [rules, setRules] = useState([]);

  // --- INPUTS ---
  const [inputText, setInputText] = useState("");
  const [newRule, setNewRule] = useState({
    keyword: "",
    reply: "",
    matchType: "contains",
  });

  const messagesEndRef = useRef(null);

  // ==========================
  // 🔐 1. LOGIN LOGIC
  // ==========================
  const handleLogin = () => {
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      if (passwordInput === "admin@webautomy") {
        setIsAuthenticated(true);
        loadInitialData();
        toast.success("Welcome Back! 🚀");
      } else {
        setError("Invalid Credentials");
        setIsLoading(false);
        toast.error("Access Denied");
      }
    }, 800);
  };

  const loadInitialData = () => {
    fetchContacts();
    fetchRules();
  };

  // ==========================
  // 📡 2. DATA FETCHING
  // ==========================
  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setContacts(data || []);
  };

  const fetchMessages = async (contactId) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("contact_id", contactId)
      .order("created_at", { ascending: true });
    if (error) console.error(error);
    else setMessages(data || []);
  };

  const fetchRules = async () => {
    const { data, error } = await supabase
      .from("automation_rules")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setRules(data || []);
  };

  // ==========================
  // ⚡ 3. ACTION HANDLERS
  // ==========================
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    fetchMessages(contact.id);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedContact) return;
    const textToSend = inputText;
    setInputText("");

    const { error } = await supabase.from("messages").insert([
      {
        contact_id: selectedContact.id,
        content: textToSend,
        direction: "outbound",
        status: "sent",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) toast.error("Failed to send");
    else fetchMessages(selectedContact.id);
  };

  // 🔥 IMPORTANT: Ye function missing tha, isiliye error aa raha tha!
  const handleContactUpdate = (updatedContact) => {
    // 1. Selected Contact update karo
    setSelectedContact(updatedContact);
    // 2. Contacts List bhi update karo (taki sidebar/pin status update ho)
    setContacts((prev) =>
      prev.map((c) => (c.id === updatedContact.id ? updatedContact : c)),
    );
  };

  // --- Automation Handlers ---
  const handleAddRule = async () => {
    if (!newRule.keyword || !newRule.reply)
      return toast.warning("Fill all fields");
    const { data, error } = await supabase
      .from("automation_rules")
      .insert([
        {
          trigger_keyword: newRule.keyword,
          reply_message: newRule.reply,
          match_type: newRule.matchType,
          is_active: true,
        },
      ])
      .select();

    if (error) toast.error("Error saving rule");
    else {
      setRules([data[0], ...rules]);
      setIsAddingRule(false);
      setNewRule({ keyword: "", reply: "", matchType: "contains" });
      toast.success("Rule Active 🤖");
    }
  };

  const handleDeleteRule = async (id) => {
    const { error } = await supabase
      .from("automation_rules")
      .delete()
      .eq("id", id);
    if (!error) {
      setRules(rules.filter((r) => r.id !== id));
      toast.info("Rule Deleted");
    }
  };

  // ==========================
  // 🔄 4. EFFECTS
  // ==========================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let interval;
    if (isAuthenticated) {
      interval = setInterval(() => {
        fetchContacts();
        if (selectedContact) fetchMessages(selectedContact.id);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [selectedContact, isAuthenticated]);

  // ==========================
  // 🖥️ 5. RENDER
  // ==========================
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#09090b] relative overflow-hidden font-sans selection:bg-[#00a884] selection:text-white">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00a884] rounded-full mix-blend-screen filter blur-[150px] opacity-15 animate-pulse"></div>
        <div className="relative z-10 w-full max-w-[400px] p-8 m-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white tracking-wider mb-8">
            WEBAUTOMY
          </h2>
          <input
            type="password"
            placeholder="Access Key"
            className="w-full bg-black/30 text-white p-4 rounded-xl border border-white/10 outline-none focus:border-[#00a884]"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            autoFocus
          />
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-[#00a884] text-white font-bold py-4 rounded-xl mt-4 hover:bg-[#008f6f]"
          >
            {isLoading ? "..." : "UNLOCK"}
          </button>
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0b141a] text-[#e9edef] overflow-hidden font-sans">
      {/* SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => setIsAuthenticated(false)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* === TAB 1: CHATS === */}
        {activeTab === "chats" && (
          <>
            {/* LIST COLUMN (New Component) */}
            <ChatList
              contacts={contacts}
              selectedContact={selectedContact}
              onSelectContact={handleSelectContact}
              onRefresh={fetchContacts}
            />

            {/* CHAT AREA */}
            {selectedContact ? (
              <>
                {/* CHAT WINDOW (New Component) */}
                <ChatWindow
                  contact={selectedContact}
                  messages={messages}
                  inputText={inputText}
                  setInputText={setInputText}
                  onSendMessage={handleSendMessage}
                  messagesEndRef={messagesEndRef}
                  onContactUpdate={handleContactUpdate} // 👈 Passed Here!
                />

                {/* RIGHT PANEL (CRM Info - Inline Logic) */}
                <div className="w-[300px] bg-[#111b21] border-l border-[#2f3b43] hidden xl:block overflow-y-auto p-6 custom-scrollbar">
                  {/* Profile Header */}
                  <div className="flex flex-col items-center border-b border-[#2f3b43] pb-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-[#6a7175] flex items-center justify-center mb-4 overflow-hidden">
                      {selectedContact.avatar_url ? (
                        <img
                          src={selectedContact.avatar_url}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      ) : (
                        <User size={40} className="text-[#cfd4d6]" />
                      )}
                    </div>
                    <h2 className="text-xl text-[#e9edef] font-medium">
                      {selectedContact.name}
                    </h2>
                    <p className="text-[#8696a0]">{selectedContact.phone}</p>
                  </div>

                  {/* Tags Section */}
                  <div className="mb-6 border-b border-[#2f3b43] pb-6">
                    <h3 className="text-[#8696a0] text-xs uppercase tracking-wider mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(Array.isArray(selectedContact.tags)
                        ? selectedContact.tags
                        : []
                      ).map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs border flex items-center gap-1 ${COLOR_CLASSES[tag.color] || COLOR_CLASSES.gray}`}
                        >
                          {tag.text}
                          <X
                            size={12}
                            className="cursor-pointer hover:opacity-80"
                            onClick={async () => {
                              const newTags = selectedContact.tags.filter(
                                (t) => t.text !== tag.text,
                              );
                              await supabase
                                .from("contacts")
                                .update({ tags: newTags })
                                .eq("id", selectedContact.id);
                              handleContactUpdate({
                                ...selectedContact,
                                tags: newTags,
                              });
                            }}
                          />
                        </span>
                      ))}
                      {(!selectedContact.tags ||
                        selectedContact.tags.length === 0) && (
                        <span className="text-xs text-[#667781] italic">
                          No tags added
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-[#8696a0] mb-2">Add Tag:</div>
                    <div className="flex flex-wrap gap-2">
                      {PREDEFINED_TAGS.map((tag) => (
                        <button
                          key={tag.text}
                          onClick={async () => {
                            const current = Array.isArray(selectedContact.tags)
                              ? selectedContact.tags
                              : [];
                            if (current.some((t) => t.text === tag.text))
                              return;
                            const newTags = [...current, tag];
                            await supabase
                              .from("contacts")
                              .update({ tags: newTags })
                              .eq("id", selectedContact.id);
                            handleContactUpdate({
                              ...selectedContact,
                              tags: newTags,
                            });
                          }}
                          className="bg-[#202c33] hover:bg-[#2a3942] text-[#d1d7db] px-2 py-1 rounded border border-[#2f3b43] text-xs flex items-center gap-1 transition-colors"
                        >
                          <Plus size={10} /> {tag.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div>
                    <label className="text-xs text-[#8696a0] uppercase tracking-wider mb-2 block">
                      Private Note
                    </label>
                    <textarea
                      className="w-full bg-[#202c33] text-sm text-[#d1d7db] p-3 rounded-lg border border-[#2f3b43] focus:border-[#00a884] outline-none h-24 resize-none"
                      placeholder="Write something..."
                      defaultValue={selectedContact.notes || ""}
                      onBlur={async (e) => {
                        const val = e.target.value;
                        if (val === selectedContact.notes) return;
                        await supabase
                          .from("contacts")
                          .update({ notes: val })
                          .eq("id", selectedContact.id);
                        toast.success("Note Saved! 📝");
                        handleContactUpdate({ ...selectedContact, notes: val });
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-[#0b141a] z-10 text-center border-b-8 border-[#00a884]">
                <h1 className="text-2xl font-light text-[#e9edef] mb-2">
                  WebAutomy Web
                </h1>
                <p className="text-[#8696a0] text-sm">
                  Select a chat to start messaging
                </p>
              </div>
            )}
          </>
        )}

        {/* === TAB 2: AUTOMATION === */}
        {activeTab === "automation" && (
          <div className="flex-1 flex flex-col bg-[#0b141a] relative">
            <div className="h-16 px-8 bg-[#202c33] flex items-center justify-between border-b border-[#2f3b43] z-10">
              <div className="flex items-center gap-3">
                <Bot size={24} className="text-[#00a884]" />
                <h2 className="font-semibold text-gray-300 text-xl">
                  Automation Rules
                </h2>
              </div>
              <button
                onClick={() => setIsAddingRule(true)}
                className="bg-[#00a884] text-[#111b21] px-4 py-2 rounded-lg font-bold flex items-center gap-2"
              >
                <Plus size={18} /> New Rule
              </button>
            </div>
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar z-10">
              {isAddingRule && (
                <div className="bg-[#202c33] p-6 rounded-xl border border-[#2f3b43] mb-6 shadow-xl">
                  <h3 className="text-white font-medium mb-4">
                    New Auto-Reply
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Trigger Word"
                      className="bg-[#111b21] p-3 rounded-lg text-white border border-[#2f3b43]"
                      value={newRule.keyword}
                      onChange={(e) =>
                        setNewRule({ ...newRule, keyword: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Bot Reply"
                      className="bg-[#111b21] p-3 rounded-lg text-white border border-[#2f3b43]"
                      value={newRule.reply}
                      onChange={(e) =>
                        setNewRule({ ...newRule, reply: e.target.value })
                      }
                    />
                    <select
                      className="bg-[#111b21] p-3 rounded-lg text-white border border-[#2f3b43]"
                      value={newRule.matchType}
                      onChange={(e) =>
                        setNewRule({ ...newRule, matchType: e.target.value })
                      }
                    >
                      <option value="contains">Contains</option>
                      <option value="exact">Exact</option>
                    </select>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setIsAddingRule(false)}
                      className="text-[#8696a0]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddRule}
                      className="bg-[#00a884] px-6 py-2 rounded-lg font-bold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
              <div className="grid gap-4">
                {rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="bg-[#111b21] p-4 rounded-lg border border-[#2f3b43] flex justify-between items-center"
                  >
                    <div className="flex gap-4 items-center">
                      <span className="text-[#00a884]">
                        "{rule.trigger_keyword}"
                      </span>{" "}
                      <span className="text-[#8696a0]">➔</span>{" "}
                      <span className="text-gray-300">
                        {rule.reply_message}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      className="text-[#8696a0] hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
