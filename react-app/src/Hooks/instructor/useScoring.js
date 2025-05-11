import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
export const useScoring = ({
  assignment,
  student,
  onClose,
  onUpdateScore,
  test,
}) => {
  const [score, setScore] = useState("");

  const handleChange = (e) => {
    setScore(e.target.value);
  };

  const handleClickSubmit = async () => {
    try {
      if (score === "") {
        toast.error("Vui lòng nhập điểm!");
        return;
      }

      if (score < 0 || score > 10) {
        toast.error("Điểm phải từ 1 đến 10");
        return;
      }

      if (assignment) {
        if (student.completion_Date === null) {
          toast.error(
            "Học sinh này chưa hoàn thành bài tập! Không thể chấm điểm!!!"
          );
          return;
        }

        await axiosClient.patch(
          `/Scores/GradingAssignment/${student.userID}/${assignment.assignmentId}/${score}`,
          null,
          { withCredentials: true }
        );
      } else {
        if (student.completedDate === null) {
          toast.error(
            "Học sinh này chưa hoàn thành bài kiểm tra! Không thể chấm điểm!!!"
          );
          return;
        }

        await axiosClient.patch(
          `/Scores/GradingTest/${student.userId}/${test.testId}/${score}`,
          null,
          { withCredentials: true }
        );
      }

      onUpdateScore();
      onClose();
    } catch (error) {}
  };

  return { handleChange, handleClickSubmit };
};
