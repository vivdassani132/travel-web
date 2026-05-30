"use client";
import { useState } from "react";

const TICKETS = [
  {
    id: "fifa-usa-arg",
    name: "USA vs Argentina",
    venue: "MetLife Stadium, New Jersey",
    date: "15 Jun 2026",
    type: "FIFA World Cup",
    seat: "Section 114 · Row F · Seat 22",
    color: "#d4f060",
    textColor: "#1a2800",
    revealed: false,
  },
  {
    id: "fifa-bra-eng",
    name: "Brazil vs England",
    venue: "SoFi Stadium, Los Angeles",
    date: "20 Jun 2026",
    type: "FIFA World Cup",
    seat: "Section 202 · Row C · Seat 8",
    color: "#f0e060",
    textColor: "#2a2000",
    revealed: false,
  },
  {
    id: "fifa-final",
    name: "FIFA World Cup Final",
    venue: "MetLife Stadium, New Jersey",
    date: "19 Jul 2026",
    type: "FIFA World Cup",
    seat: "Section 108 · Row B · Seat 14",
    color: "#1c1c1e",
    textColor: "#ffffff",
    revealed: false,
  },
];

const GAMES = [
  { match: "USA vs Argentina",      venue: "MetLife Stadium, NJ",   date: "15 Jun 2026", group: "Group A", flag1: "🇺🇸", flag2: "🇦🇷" },
  { match: "Brazil vs England",     venue: "SoFi Stadium, LA",      date: "20 Jun 2026", group: "Group C", flag1: "🇧🇷", flag2: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { match: "France vs Spain",       venue: "AT&T Stadium, Dallas",  date: "23 Jun 2026", group: "Group D", flag1: "🇫🇷", flag2: "🇪🇸" },
  { match: "Germany vs Portugal",   venue: "Hard Rock Stadium, Miami", date: "26 Jun 2026", group: "Group E", flag1: "🇩🇪", flag2: "🇵🇹" },
  { match: "Semi-Final 1",          venue: "Levi's Stadium, SF",    date: "14 Jul 2026", group: "Semi-Final", flag1: "⚽", flag2: "⚽" },
  { match: "FIFA World Cup Final",  venue: "MetLife Stadium, NJ",   date: "19 Jul 2026", group: "Final",  flag1: "🏆", flag2: "🏆" },
];

// Zigzag stamp edge via SVG clip path string
function StampCard({ ticket, onReveal }: { ticket: typeof TICKETS[0]; onReveal: () => void }) {
  const isRevealed = ticket.revealed;
  const isDark = ticket.color === "#1c1c1e";

  return (
    <div className="relative mx-1" style={{ marginBottom: 4 }}>
      {/* Stamp shape via CSS mask */}
      <div
        style={{
          background: ticket.color,
          borderRadius: 16,
          padding: "24px 20px 20px",
          maskImage: `
            radial-gradient(circle at 0px 12px, transparent 10px, black 10px),
            radial-gradient(circle at 100% 12px, transparent 10px, black 10px),
            radial-gradient(circle at 12px 0px, transparent 10px, black 10px),
            radial-gradient(circle at 12px 100%, transparent 10px, black 10px)
          `,
          WebkitMaskImage: `
            radial-gradient(circle at 0px 12px, transparent 10px, black 10px),
            radial-gradient(circle at 100% 12px, transparent 10px, black 10px),
            radial-gradient(circle at 12px 0px, transparent 10px, black 10px),
            radial-gradient(circle at 12px 100%, transparent 10px, black 10px)
          `,
          position: "relative",
          overflow: "hidden",
          boxShadow: isDark
            ? "0 8px 32px rgba(0,0,0,0.35)"
            : "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Perforated divider */}
        <div
          style={{
            position: "absolute",
            left: 0, right: 0,
            top: "54%",
            borderTop: `2px dashed ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}`,
          }}
        />

        {/* Top section */}
        <div className="mb-5">
          <div
            className="font-satoshi text-[11px] font-600 uppercase tracking-widest mb-1"
            style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}
          >
            {ticket.type}
          </div>
          <div className="font-serif text-[26px] leading-tight" style={{ color: ticket.textColor }}>
            {ticket.name}
          </div>
          <div className="font-satoshi text-[13px] mt-1" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}>
            {ticket.venue}
          </div>
          <div className="font-satoshi text-[12px] mt-0.5" style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.38)" }}>
            {ticket.seat}
          </div>
        </div>

        {/* QR section */}
        <div className="flex flex-col items-center py-4 relative">
          {/* Blurred QR placeholder */}
          <div
            className="w-[120px] h-[120px] rounded-xl overflow-hidden relative"
            style={{ filter: isRevealed ? "none" : "blur(10px)", transition: "filter 0.4s ease" }}
          >
            {/* QR grid pattern */}
            <div style={{ background: isDark ? "#fff" : "#000", width: "100%", height: "100%", padding: 8 }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                {/* Simplified QR-like pattern */}
                <rect x="0" y="0" width="40" height="40" fill={isDark ? "#000" : "#fff"}/>
                <rect x="5" y="5" width="30" height="30" fill={isDark ? "#fff" : "#000"}/>
                <rect x="10" y="10" width="20" height="20" fill={isDark ? "#000" : "#fff"}/>
                <rect x="60" y="0" width="40" height="40" fill={isDark ? "#000" : "#fff"}/>
                <rect x="65" y="5" width="30" height="30" fill={isDark ? "#fff" : "#000"}/>
                <rect x="70" y="10" width="20" height="20" fill={isDark ? "#000" : "#fff"}/>
                <rect x="0" y="60" width="40" height="40" fill={isDark ? "#000" : "#fff"}/>
                <rect x="5" y="65" width="30" height="30" fill={isDark ? "#fff" : "#000"}/>
                <rect x="10" y="70" width="20" height="20" fill={isDark ? "#000" : "#fff"}/>
                {/* Random data dots */}
                {[45,50,55,60,45,50,55,60,45,50].map((x,i) => (
                  <rect key={i} x={x} y={45+(i%4)*5} width="4" height="4" fill={isDark ? (i%2===0?"#000":"#fff") : (i%2===0?"#fff":"#000")}/>
                ))}
                <rect x="45" y="60" width="50" height="40" fill={isDark ? "#000" : "#fff"}/>
                {[0,5,10,15,20,25,30,35,40].map((x,i) => (
                  <rect key={i} x={45+x} y={65} width="4" height="4" fill={isDark ? "#fff" : "#000"}/>
                ))}
                {[0,10,20,30,40].map((x,i) => (
                  <rect key={i} x={45+x} y={72} width="8" height="8" fill={isDark ? "#fff" : "#000"}/>
                ))}
                {[0,5,15,25,35].map((x,i) => (
                  <rect key={i} x={45+x} y={82} width="4" height="12" fill={isDark ? "#fff" : "#000"}/>
                ))}
              </svg>
            </div>
          </div>

          {!isRevealed && (
            <button
              onClick={onReveal}
              className="absolute font-satoshi text-[13px] font-600 px-5 py-2 rounded-full shadow-lg"
              style={{
                background: isDark ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.92)",
                color: "#1c1c1e",
                top: "50%",
                transform: "translateY(-50%)",
                backdropFilter: "blur(8px)",
              }}
            >
              Tap to reveal QR
            </button>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-2">
          <div className="font-satoshi text-[13px]" style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}>
            {ticket.date}
          </div>
          <div
            className="font-serif text-[16px] italic"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.55)" }}
          >
            football
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TicketsTab() {
  const [seg, setSeg] = useState<"Tickets"|"Games">("Tickets");
  const [tickets, setTickets] = useState(TICKETS);

  const reveal = (id: string) => {
    setTickets(ts => ts.map(t => t.id === id ? { ...t, revealed: !t.revealed } : t));
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white">
      <div className="px-5 pt-12 pb-2">
        <h1 className="font-serif text-[30px] text-black">Your access tickets</h1>
        <p className="font-satoshi text-[14px] text-gray-400 mt-0.5">FIFA World Cup 2026 · North America</p>
      </div>

      {/* Segment */}
      <div className="flex border-b border-gray-100 px-5 mb-4">
        {(["Tickets","Games"] as const).map(s => (
          <button key={s} onClick={() => setSeg(s)}
            className="px-4 py-3 text-[14px] font-satoshi font-500 relative mr-2"
            style={{ color: seg === s ? "#1c1c1e" : "#8e8e93" }}>
            {s}
            {seg === s && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"/>}
          </button>
        ))}
      </div>

      {seg === "Tickets" && (
        <div className="px-4 space-y-5 pb-8">
          {tickets.map(t => (
            <StampCard key={t.id} ticket={t} onReveal={() => reveal(t.id)} />
          ))}
        </div>
      )}

      {seg === "Games" && (
        <div className="px-5 pb-8 space-y-3">
          <div className="font-satoshi text-[12px] font-600 text-gray-400 uppercase tracking-wider mb-2">
            FIFA World Cup 2026 · Schedule
          </div>
          {GAMES.map((g, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 flex-1">
                  <span className="text-[22px]">{g.flag1}</span>
                  <div className="font-satoshi text-[11px] font-600 text-gray-400 px-1">vs</div>
                  <span className="text-[22px]">{g.flag2}</span>
                  <div className="flex-1 ml-1">
                    <div className="font-satoshi text-[14px] font-600 text-gray-900 leading-snug">{g.match}</div>
                    <div className="font-satoshi text-[12px] text-gray-400">{g.venue}</div>
                  </div>
                </div>
                {tickets.some(t => t.name === g.match) && (
                  <div className="bg-black rounded-full px-2.5 py-1">
                    <span className="font-satoshi text-[10px] font-600 text-white">Ticket</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="font-satoshi text-[12px] text-gray-500">{g.date}</span>
                <span className="font-satoshi text-[11px] font-500 text-gray-400 bg-gray-100 rounded-full px-2.5 py-0.5">{g.group}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
