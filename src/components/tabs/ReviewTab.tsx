"use client";
import { useState } from "react";

export default function ReviewTab() {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white">
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-[28px] font-bold text-gray-900 mb-1" style={{ letterSpacing: "-0.4px" }}>Write a Review</h1>
        <p className="text-[14px] text-gray-400">Share your experience to help other travelers</p>
      </div>

      {/* Recent trips to review */}
      <div className="px-4 mb-5">
        <h2 className="text-[16px] font-semibold text-gray-900 mb-3">Recent trips</h2>
        {[
          { name: "Kyoto", country: "Japan", date: "Mar 2025", photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg", reviewed: false },
          { name: "Buenos Aires", country: "Argentina", date: "Jan 2025", photo: "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg", reviewed: true },
        ].map((t, i) => (
          <div key={i} className="flex gap-3 items-center border border-gray-100 rounded-2xl p-3 mb-2.5 shadow-sm">
            <div className="w-[60px] h-[60px] rounded-xl overflow-hidden flex-shrink-0">
              <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="text-[15px] font-bold text-gray-900">{t.name}</div>
              <div className="text-[12px] text-gray-400">{t.country} · {t.date}</div>
            </div>
            <button className={`px-3 py-1.5 rounded-full text-[12px] font-semibold ${t.reviewed ? "bg-[#f2f2f7] text-gray-500" : "bg-gray-900 text-white"}`}>
              {t.reviewed ? "Reviewed" : "Review"}
            </button>
          </div>
        ))}
      </div>

      {/* Write review form */}
      <div className="px-4 mb-6">
        <h2 className="text-[16px] font-semibold text-gray-900 mb-3">Rate your experience</h2>
        <div className="bg-[#f9f9fb] rounded-2xl p-4 border border-gray-100">
          <div className="flex gap-2 mb-4">
            {[1,2,3,4,5].map(s => (
              <button key={s} onClick={() => setRating(s)} className="flex-1 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: s <= rating ? "#00AA6C" : "#e5e5ea" }}>
                <span style={{ filter: s <= rating ? "brightness(10)" : "none" }}>●</span>
              </button>
            ))}
          </div>
          <textarea
            className="w-full bg-white border border-gray-200 rounded-xl p-3 text-[14px] text-gray-800 placeholder-gray-400 outline-none resize-none"
            rows={4}
            placeholder="Tell travelers about your experience..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button className="w-full mt-3 py-3 rounded-xl text-white text-[15px] font-semibold" style={{ background: text && rating ? "#1c1c1e" : "#e5e5ea", color: text && rating ? "white" : "#8e8e93" }}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
