import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export const useGetTotalCoursesByInstructor = ({ id }) => {
  const [total, setTotal] = useState(0);
  const getCount = async () => {
    try {
      const res = await axiosClient.get(
        `/Courses/GetTotalCoursesByInstructor/${id}`
      );
      setTotal(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCount();
  }, [id]);

  return { total };
};
