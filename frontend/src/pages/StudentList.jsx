import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Plus, Search, RefreshCw } from "lucide-react";

import { getStudents, deleteStudent } from "../services/StudentService";

import StudentTable from "../Components/StudentTable";
import Pagination from "../Components/Pagination";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [size] = useState(5);

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getStudents(page, size, search);

      setStudents(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to fetch student records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(0);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);

      // Refresh the current page after deletion.
      if (students.length === 1 && page > 0) {
        setPage((previousPage) => previousPage - 1);
      } else {
        fetchStudents();
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to delete student."
      );
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>Manage all student information.</p>
        </div>

        <Link to="/students/new" className="primary-btn">
          <Plus size={19} />
          Add Student
        </Link>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div>
            <h3>Student Records</h3>
            <p>{totalElements} students found</p>
          </div>

          <div className="search-box">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="message">Loading students...</div>
        ) : error ? (
          <div className="error-message">
            {error}
            <button onClick={fetchStudents} className="retry-btn">
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        ) : (
          <>
            <StudentTable
              students={students}
              onDelete={handleDelete}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default StudentList;