import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export const useGetTimestamps = ({ test, user, showSubmitTest }) => {
  const [timestamps, setTimestamps] = useState({
    completedDate: null,
    startDate: null,
    endDate: null,
  });

  const getTimestamps = async () => {
    if (user.role === "Student") {
      try {
        const res = await axiosClient.get(
          `/Students/timestamps/${user.id}/${test.testId}`,
          { withCredentials: true }
        );
        setTimestamps({
          completedDate: res.data.completedDate,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getTimestamps();
  }, [, showSubmitTest]);

  return { timestamps, getTimestamps };
};
