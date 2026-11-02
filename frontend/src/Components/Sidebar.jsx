import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  UserPlus,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="sidebar-heading">MENU</p>

      <NavLink to="/" end className="sidebar-link">
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/students" className="sidebar-link">
        <Users size={20} />
        <span>Students</span>
      </NavLink>

      <NavLink to="/students/new" className="sidebar-link">
        <UserPlus size={20} />
        <span>Add Student</span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;