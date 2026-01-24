// src/pages/Simulator.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  Send,
  Smartphone,
  Terminal,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Simulator = () => {
  const [phone, setPhone] = useState("919876543210");
  const [name, setName] = useState("Rahul Client");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [activeTab, setActiveTab] = useState("form"); // form, json

  // 🔥 Update your URL here
  const BACKEND_URL = "https://webautomy-backend.onrender.com/webhook";

  const handleSend = async () => {
    if (!message) return;
    setStatus("loading");

    const payload = {
      object: "whatsapp_business_account",
      entry: [
        {
          changes: [
            {
              value: {
                messaging_product: "whatsapp",
                metadata: { phone_number_id: "123456789" },
                contacts: [{ profile: { name: name }, wa_id: phone }],
                messages: [
                  {
                    from: phone,
                    id: "wamid.test_" + Date.now(),
                    text: { body: message },
                    type: "text",
                    timestamp: Date.now() / 1000,
                  },
                ],
              },
            },
          ],
        },
      ],
    };

    try {
      await axios.post(BACKEND_URL, payload);
      setStatus("success");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-2xl bg-[#1e293b] rounded-xl border border-[#334155] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f172a] p-4 border-b border-[#334155] flex justify-between items-center">
          <div className="flex items-center gap-2 text-cyan-400">
            <Smartphone size={20} />
            <span className="font-bold tracking-wider">
              WebAutomy Simulator v1.0
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-[500px]">
          {/* Left Panel: Form */}
          <div className="flex-1 p-6 flex flex-col gap-5 border-r border-[#334155]">
            <h2 className="text-gray-400 text-xs uppercase tracking-widest font-semibold">
              Simulate Incoming Message
            </h2>

            <div className="space-y-1">
              <label className="text-xs text-gray-400">Customer Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400">
                Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none transition-colors text-green-400"
              />
            </div>

            <div className="space-y-1 flex-1 flex flex-col">
              <label className="text-xs text-gray-400">Message Body</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full flex-1 bg-[#0f172a] border border-[#334155] rounded px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                placeholder="Type the message here..."
              />
            </div>

            <button
              onClick={handleSend}
              disabled={status === "loading"}
              className={`w-full py-3 rounded font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                status === "success"
                  ? "bg-green-600 text-white"
                  : status === "error"
                    ? "bg-red-600 text-white"
                    : "bg-cyan-600 hover:bg-cyan-500 text-white"
              }`}
            >
              {status === "loading" ? (
                "Sending Payload..."
              ) : status === "success" ? (
                <>
                  Payload Sent <CheckCircle size={16} />
                </>
              ) : status === "error" ? (
                <>
                  Failed <AlertCircle size={16} />
                </>
              ) : (
                <>
                  Execute Webhook <Send size={16} />
                </>
              )}
            </button>
          </div>

          {/* Right Panel: Output Log */}
          <div className="w-full md:w-1/3 bg-[#020617] p-4 font-mono text-xs overflow-y-auto">
            <div className="flex items-center gap-2 mb-4 text-gray-500 border-b border-gray-800 pb-2">
              <Terminal size={14} /> <span>System Logs</span>
            </div>

            <div className="space-y-2">
              <div className="text-gray-500">
                <span className="text-blue-500">[INFO]</span> Simulator Ready
              </div>
              <div className="text-gray-500">
                <span className="text-blue-500">[INFO]</span> Target:{" "}
                <span className="text-gray-600 truncate block">
                  ...onrender.com/webhook
                </span>
              </div>

              {status === "loading" && (
                <div className="text-yellow-500">
                  <span className="animate-pulse"> Transmitting JSON...</span>
                </div>
              )}

              {status === "success" && (
                <div className="text-green-500">
                  <span> 200 OK Received</span>
                  <br />
                  <span className="text-gray-600">Message saved to DB</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
