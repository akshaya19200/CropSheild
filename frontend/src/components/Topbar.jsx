import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={18} />

        <input
          placeholder="Search farms, crops, reports..."
        />
      </div>

      <div className="topbar-right">
        <button className="icon-button">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <div className="avatar">
            {user?.name?.charAt(0)?.toUpperCase() ||
              "U"}
          </div>

          <div>
            <strong>{user?.name || "Farmer"}</strong>
            <span>{user?.email || ""}</span>
          </div>
        </div>
      </div>
    </header>
  );
}