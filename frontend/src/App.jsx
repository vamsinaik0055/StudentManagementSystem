import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import StudentForm from "./Components/StudentForm";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/students" element={<StudentList />} />

            <Route
              path="/students/new"
              element={<StudentForm />}
            />
            

            <Route
              path="/students/edit/:id"
              element={<StudentForm />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;