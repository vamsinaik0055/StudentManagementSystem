import { GraduationCap } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <GraduationCap size={30} />
        <span>Student Management</span>
      </div>

      <div className="navbar-right">
        <span className="admin-label">Admin</span>
        <div className="admin-avatar">A</div>
      </div>
    </header>
  );
}

export default Navbar;