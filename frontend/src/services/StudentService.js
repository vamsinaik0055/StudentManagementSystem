import axios from "axios";

const API = axios.create({
  baseURL: "https://studentmanagementsystem-2ebw.onrender.com/api/students",
});

export const getStudents = (page = 0, size = 5, search = "") => {
  return API.get("", {
    params: { page, size, search },
  });
};

export const getStudentById = (id) => API.get(`/${id}`);

export const addStudent = (student) => API.post("", student);

export const updateStudent = (id, student) =>
  API.put(`/${id}`, student);

export const deleteStudent = (id) => API.delete(`/${id}`);