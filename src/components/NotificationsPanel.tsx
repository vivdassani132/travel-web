"use client";

const NOTIFS = [
  { id: 1, icon: "heart",    title: "New match for you",         body: "Kyoto matches 97% of your travel DNA.",          time: "2m ago",   unread: true,  photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
  { id: 2, icon: "tag",      title: "Price drop alert",          body: "Flights to Buenos Aires dropped 18% today.",    time: "1h ago",   unread: true,  photo: "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
  { id: 3, icon: "users",    title: "#TagAlong — 1 slot left",   body: "Tokyo Food Week trip is almost full.",           time: "3h ago",   unread: true,  photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
  { id: 4, icon: "star",     title: "Trip tip",                  body: "Best time to visit Santorini is June–Sept.",    time: "Yesterday",unread: false, photo: "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
  { id: 5, icon: "map",      title: "Your Cusco trip",           body: "14 days to go — check your itinerary.",         time: "2d ago",   unread: false, photo: "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
  { id: 6, icon: "reward",   title: "Rewards earned",            body: "You earned 240 pts from your last booking.",    time: "3d ago",   unread: false, photo: null },
];

type IconType = "heart"|"tag"|"users"|"star"|"map"|"reward";
type IconMap = Record<IconType, React.ReactElement>;

function Icon({ type }: { type: IconType }) {
  const icons: IconMap = {
    heart: <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff2d55"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    tag:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="#00AA6C" strokeWidth="2"/><circle cx="7" cy="7" r="1.5" fill="#00AA6C"/></svg>,
    users: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#007AFF" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="#007AFF" strokeWidth="2"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#007AFF" strokeWidth="2" strokeLinecap="round"/></svg>,
    star:  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5a623"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    map:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#8b5cf6" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" fill="#8b5cf6"/></svg>,
    reward:<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#d4a017" strokeWidth="2"/><path d="M12 8v4l2 2" stroke="#d4a017" strokeWidth="2" strokeLinecap="round"/></svg>,
  };
  return icons[type];
}

interface Props { onClose: () => void; }

export default function NotificationsPanel({ onClose }: Props) {
  const unreadCount = NOTIFS.filter(n => n.unread).length;

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Panel slides down */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-white rounded-b-3xl shadow-2xl"
        style={{ maxHeight: "80vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-12 pb-4 border-b border-gray-100">
          <div>
            <span className="font-serif text-[24px] text-black">Notifications</span>
            {unreadCount > 0 && (
              <span className="ml-2 font-satoshi text-[12px] font-600 text-white bg-black rounded-full px-2 py-0.5">{unreadCount} new</span>
            )}
          </div>
          <button onClick={onClose} className="font-satoshi text-[14px] font-500 text-[#00AA6C]">
            Mark all read
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto scrollbar-hide" style={{ maxHeight: "calc(80vh - 80px)" }}>
          {NOTIFS.map((n, i) => (
            <div key={n.id} className={`flex items-start gap-3.5 px-5 py-4 ${i < NOTIFS.length - 1 ? "border-b border-gray-50" : ""} ${n.unread ? "bg-[#fafafa]" : "bg-white"}`}>
              {/* Left: icon circle or photo */}
              {n.photo ? (
                <div className="w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0 relative">
                  <img src={n.photo} alt="" className="w-full h-full object-cover" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow">
                    <Icon type={n.icon as IconType} />
                  </div>
                </div>
              ) : (
                <div className="w-11 h-11 rounded-2xl bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                  <Icon type={n.icon as IconType} />
                </div>
              )}

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-satoshi text-[14px] font-600 text-gray-900 leading-snug">{n.title}</div>
                  <span className="font-satoshi text-[11px] text-gray-400 flex-shrink-0">{n.time}</span>
                </div>
                <div className="font-satoshi text-[13px] text-gray-500 mt-0.5 leading-snug">{n.body}</div>
              </div>

              {/* Unread dot */}
              {n.unread && <div className="w-2 h-2 rounded-full bg-black flex-shrink-0 mt-1.5" />}
            </div>
          ))}
          <div className="h-4" />
        </div>
      </div>
    </>
  );
}
