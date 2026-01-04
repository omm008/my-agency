import React, { useState, useRef } from "react";
import {
  ChevronsLeftRight,
  MapPin,
  Search,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const TransformationSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-20 bg-brand-black overflow-hidden px-4">
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
          Don't stay <span className="text-neutral-600">invisible.</span>
        </h2>
        <p className="text-neutral-400">
          Drag to see the difference optimization makes.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* The Slider Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-col-resize select-none border border-white/10 shadow-2xl"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          {/* --- LAYER 1: BEFORE (The Background) --- */}
          <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
            {/* "Bad" Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-8 opacity-60 grayscale filter blur-[1px]">
              {/* Item 1: Bad GMB */}
              <div className="bg-neutral-800 p-6 rounded-xl border border-red-900/30">
                <div className="flex items-center gap-3 mb-4 text-red-500">
                  <AlertCircle />
                  <span className="font-bold">Hard to Find</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
                  <div className="mt-4 p-3 bg-red-900/20 rounded text-red-400 text-sm font-mono">
                    Google Rank: #50+
                  </div>
                </div>
              </div>

              {/* Item 2: No WhatsApp */}
              <div className="bg-neutral-800 p-6 rounded-xl border border-red-900/30 flex flex-col justify-center items-center text-center">
                <div className="bg-neutral-700 p-4 rounded-full mb-4">
                  <MessageCircle className="text-neutral-500" size={32} />
                </div>
                <h4 className="text-neutral-400 font-bold">Missed Leads</h4>
                <p className="text-neutral-600 text-sm mt-2">
                  No direct way to chat.
                </p>
              </div>
            </div>

            {/* Background Label */}
            <div className="absolute bottom-10 text-neutral-600 font-bold text-xl tracking-widest uppercase">
              Current State
            </div>
          </div>

          {/* --- LAYER 2: AFTER (The Foreground - Resizable) --- */}
          <div
            className="absolute inset-0 h-full bg-brand-blue overflow-hidden border-r-4 border-white"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* Inner Container: Keeps content centered regardless of width */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800">
              {/* "Good" Content Layout - Fixed Width to prevent squishing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-8 min-w-[300px] md:min-w-[800px]">
                {/* Item 1: Good GMB */}
                <div className="bg-white text-black p-6 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3 mb-4 text-green-600">
                    <CheckCircle2 />
                    <span className="font-bold">Top Local Result</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-red-500" size={20} />
                      <span className="font-bold text-lg">
                        Your Business Name
                      </span>
                    </div>
                    <div className="flex gap-1 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i}>★</span>
                      ))}
                      <span className="text-neutral-400 text-sm ml-2">
                        (48 Reviews)
                      </span>
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded text-green-800 text-sm font-mono font-bold">
                      Google Rank: #1 - #3
                    </div>
                  </div>
                </div>

                {/* Item 2: WhatsApp Link */}
                <div className="bg-white text-black p-6 rounded-xl shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden group">
                  {/* The "Tricky" Click-to-Chat Button */}
                  <div className="bg-[#25D366] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg scale-110 mb-2">
                    <MessageCircle size={20} />
                    <span>Chat on WhatsApp</span>
                  </div>
                  <p className="text-neutral-500 text-xs mt-2 max-w-[150px]">
                    Customers click & send a pre-filled message instantly.
                  </p>
                </div>
              </div>

              {/* Foreground Label */}
              <div className="absolute bottom-10 text-blue-200 font-bold text-xl tracking-widest uppercase">
                Optimized
              </div>
            </div>
          </div>

          {/* --- THE HANDLE --- */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center z-20 cursor-ew-resize hover:scale-110 transition-transform"
            style={{ left: `${sliderPosition}%` }}
          >
            <ChevronsLeftRight className="text-brand-blue" size={24} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSlider;
