"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  sender: string;
  text?: string;
  images?: string[];
  time: string;
  isMine: boolean;
  avatar?: string;
  dateDivider?: string;
}

const MESSAGES: Message[] = [
  {
    id: 1,
    sender: "John",
    text: "Yeah, use this address",
    time: "15:52 PM",
    isMine: false,
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=60&q=80&fit=crop",
  },
  {
    id: 2,
    sender: "Me",
    text: "I need pictures from our last trip so I can make a collage.\n\n@Jane, do you have any?",
    time: "15:55 PM",
    isMine: true,
  },
  {
    id: 3,
    sender: "Jane",
    text: "Here are some",
    images: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=200&q=80&fit=crop",
    ],
    time: "18:00 PM",
    isMine: false,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80&fit=crop",
    dateDivider: "Today 18:00 PM",
  },
];

const conversations = [
  { id: "sf", name: "Les Gars_SF Trip", preview: "Here are some photos 📸", time: "18:00", unread: 3, photo: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=100&q=80&fit=crop" },
  { id: "kyoto", name: "Kyoto Squad 🇯🇵", preview: "Should we book Kikunoi?", time: "Yesterday", unread: 0, photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=100&q=80&fit=crop" },
  { id: "venice", name: "Venice Crew 🇮🇹", preview: "Gondola at sunset 🌅", time: "Mon", unread: 0, photo: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=100&q=80&fit=crop" },
];

export default function ChatTab() {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  if (activeChat) {
    const convo = conversations.find(c => c.id === activeChat)!;
    return <ChatThread name={convo.name} photo={convo.photo} onBack={() => setActiveChat(null)} />;
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-[28px] font-bold text-gray-900">Messages</h1>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-2.5 bg-[#f2f2f7] rounded-xl px-3.5 py-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-[15px] text-gray-400">Search</span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {conversations.map(c => (
          <button key={c.id} onClick={() => setActiveChat(c.id)} className="w-full flex items-center gap-3 px-5 py-3 text-left active:bg-gray-50">
            <div className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0">
              <img src={c.photo} alt={c.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="text-[16px] font-semibold text-gray-900">{c.name}</span>
                <span className="text-[12px] text-gray-400">{c.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-400 truncate flex-1">{c.preview}</span>
                {c.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-[#007AFF] flex items-center justify-center ml-2">
                    <span className="text-white text-[11px] font-semibold">{c.unread}</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="h-28" />
    </div>
  );
}

function ChatThread({ name, photo, onBack }: { name: string; photo: string; onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: "Me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMine: true,
    }]);
    setInput("");
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-gray-100">
        <button onClick={onBack} className="flex items-center gap-1 text-[#007AFF] mr-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="text-[16px] font-semibold text-gray-900">{name}</div>
        </div>
        <button>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1.5" fill="#8e8e93"/>
            <circle cx="12" cy="12" r="1.5" fill="#8e8e93"/>
            <circle cx="12" cy="19" r="1.5" fill="#8e8e93"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={msg.id}>
            {msg.dateDivider && (
              <div className="text-center text-[11px] text-gray-400 my-3">{msg.dateDivider}</div>
            )}
            <div className={`flex items-end gap-2 ${msg.isMine ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              {!msg.isMine && (
                <div className="w-[28px] h-[28px] rounded-full overflow-hidden flex-shrink-0 mb-1">
                  {msg.avatar
                    ? <img src={msg.avatar} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs">{msg.sender[0]}</div>
                  }
                </div>
              )}
              <div className={`flex flex-col ${msg.isMine ? "items-end" : "items-start"} max-w-[72%]`}>
                {/* Show sender name for group chats */}
                {!msg.isMine && idx === 0 || (!msg.isMine && messages[idx-1]?.sender !== msg.sender) ? (
                  <span className="text-[11px] text-gray-400 mb-1 px-1">{msg.sender}</span>
                ) : null}

                {/* Photo grid */}
                {msg.images && (
                  <div className="flex flex-wrap gap-1 mb-1 max-w-full">
                    {msg.images.slice(0, 3).map((img, i) => (
                      <div key={i} className={`rounded-2xl overflow-hidden ${msg.images!.length === 1 ? "w-[180px] h-[140px]" : "w-[100px] h-[100px]"}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {msg.images.length > 3 && (
                      <div className="w-[100px] h-[100px] rounded-2xl bg-black/40 flex items-center justify-center">
                        <span className="text-white font-semibold text-[16px]">+{msg.images.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Bubble */}
                {msg.text && (
                  <div
                    className="px-3.5 py-2.5 rounded-[18px] text-[15px] leading-snug"
                    style={
                      msg.isMine
                        ? { background: "#007AFF", color: "white", borderBottomRightRadius: 4 }
                        : { background: "#f2f2f7", color: "#1c1c1e", borderBottomLeftRadius: 4 }
                    }
                  >
                    {msg.text.split("\n").map((line, i) => (
                      <span key={i}>{line}{i < msg.text!.split("\n").length - 1 && <br />}</span>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-gray-400 mt-0.5 px-1">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2.5">
        <button className="w-[34px] h-[34px] flex items-center justify-center flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex-1 bg-[#f2f2f7] rounded-full px-4 py-2 flex items-center">
          <input
            className="flex-1 bg-transparent text-[15px] text-gray-800 outline-none placeholder-gray-400"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
          />
        </div>
        <button className="w-[34px] h-[34px] flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 4v3m0 0a7 7 0 000 14" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          onClick={send}
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: input.trim() ? "#007AFF" : "#e5e5ea" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
