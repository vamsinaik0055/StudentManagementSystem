import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Save } from "lucide-react";

import {
  addStudent,
  getStudentById,
  updateStudent,
} from "../services/StudentService";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  course: "",
  department: "",
  age: "",
};

function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    const fetchStudent = async () => {
      try {
        const response = await getStudentById(id);
        setForm({
          ...initialForm,
          ...response.data,
          age: response.data.age ?? "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load student details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const student = {
      ...form,
      age: Number(form.age),
    };

    try {
      setSaving(true);

      if (isEdit) {
        await updateStudent(id, student);
        alert("Student updated successfully!");
      } else {
        await addStudent(student);
        alert("Student added successfully!");
      }

      navigate("/students");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Please check your details."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="message">Loading student details...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{isEdit ? "Edit Student" : "Add Student"}</h1>
          <p>
            {isEdit
              ? "Update the student information."
              : "Enter the details to register a new student."}
          </p>
        </div>

        <Link to="/students" className="secondary-btn">
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <div className="form-card">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Course</label>
              <input
                type="text"
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="Example: Java Full Stack"
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
                max="120"
              />
            </div>
          </div>

          <div className="form-actions">
            <Link to="/students" className="cancel-btn">
              Cancel
            </Link>

            <button
              type="submit"
              className="primary-btn"
              disabled={saving}
            >
              <Save size={18} />
              {saving
                ? "Saving..."
                : isEdit
                ? "Update Student"
                : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;