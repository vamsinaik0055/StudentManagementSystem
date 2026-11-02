import { Link } from "react-router-dom";

import { Pencil, Trash2 } from "lucide-react";

function StudentTable({ students, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <h3>No students found</h3>
        <p>Try another search or add a new student.</p>

        <Link to="/students/new" className="primary-btn">
          Add Student
        </Link>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Department</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>

              <td>
                <strong>
                  {student.firstName} {student.lastName}
                </strong>
              </td>

              <td>{student.email}</td>

              <td>{student.phone}</td>

              <td>{student.course}</td>

              <td>
                <span className="department-badge">
                  {student.department}
                </span>
              </td>

              <td>{student.age}</td>

              <td>
                <div className="action-buttons">
                  <Link
                    to={`/students/edit/${student.id}`}
                    className="edit-btn"
                    title="Edit student"
                  >
                    <Pencil size={17} />
                  </Link>

                  <button
                    className="delete-btn"
                    title="Delete student"
                    onClick={() => onDelete(student.id)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;