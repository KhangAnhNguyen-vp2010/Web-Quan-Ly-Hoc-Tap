import { createContext, useContext, useState } from "react";
import axiosClient from "../api/axiosClient";

const CourseContext = createContext();

export const useCourse = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  const [load, setLoad] = useState(false);

  const getListCourses = async (page, pageSize, query, sort) => {
    try {
      const res = await axiosClient.get(
        `/Courses?page=${page}&pageSize=${pageSize}&search=${query}&sort=${sort}`,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khoá học:", error);
      return null;
    }
  };

  return (
    <CourseContext.Provider
      value={{
        getListCourses,
        load,
        setLoad,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
