import {
  LayoutDashboard,
  Sprout,
  Activity,
  ScanSearch,
  Droplets,
  CloudSun,
  BarChart3,
  Lightbulb,
  FileText,
  LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "Farm Management",
    path: "/farms",
    icon: Sprout
  },
  {
    label: "Crop Monitoring",
    path: "/monitoring",
    icon: Activity
  },
  {
    label: "Disease Detection",
    path: "/disease",
    icon: ScanSearch
  },
  {
    label: "Water Stress",
    path: "/water-stress",
    icon: Droplets
  },
  {
    label: "Weather",
    path: "/weather",
    icon: CloudSun
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3
  },
  {
    label: "Recommendations",
    path: "/recommendations",
    icon: Lightbulb
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileText
  }
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          🌱
        </div>

        <div>
          <h2>CropShield</h2>
          <span>AI Agriculture</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <button
        className="logout-button"
        onClick={logout}
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}