import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Users,
  UserPlus,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { getStudents } from "../services/StudentService";

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudents(0, 5)
      .then((response) => {
        setTotalStudents(response.data.totalElements);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your Student Management System.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Users size={25} />
          </div>

          <div>
            <p>Total Students</p>
            <h2>{loading ? "..." : totalStudents}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <BookOpen size={25} />
          </div>

          <div>
            <p>Student Records</p>
            <h2>{loading ? "..." : totalStudents}</h2>
          </div>
        </div>
      </div>

      <div className="welcome-card">
        <h2>Manage Your Students</h2>

        <p>
          Add new students, update student information,
          search records and manage your student database.
        </p>

        <div className="welcome-actions">
          <Link to="/students" className="primary-btn">
            <Users size={18} />
            View Students
          </Link>

          <Link to="/students/new" className="secondary-btn">
            <UserPlus size={18} />
            Add Student
          </Link>
        </div>
      </div>

      <div className="quick-card">
        <h3>Quick Access</h3>

        <Link to="/students" className="quick-link">
          <span>
            <Users size={19} />
            View all student records
          </span>
          <ArrowRight size={19} />
        </Link>

        <Link to="/students/new" className="quick-link">
          <span>
            <UserPlus size={19} />
            Register a new student
          </span>
          <ArrowRight size={19} />
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;