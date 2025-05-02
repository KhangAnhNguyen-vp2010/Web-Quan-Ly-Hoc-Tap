import { useState } from "react";

export function useDetailAssignment(assignment, onClose) {
  const [showEditAssignment, setShowEditAssignment] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(assignment);
  const [loadListFile, setLoadListFile] = useState(false);

  const [count, setCount] = useState({
    completed: 0,
    unCompleted: 0,
  });

  const handleOnCloseEdit = (obj) => {
    setCurrentAssignment(obj);
    setShowEditAssignment(!showEditAssignment);
    setLoadListFile(!loadListFile);
  };

  const toggleEditAssignment = () => {
    setShowEditAssignment(!showEditAssignment);
  };

  return {
    showEditAssignment,
    currentAssignment,
    loadListFile,
    count,
    handleOnCloseEdit,
    toggleEditAssignment,
    setCount,
  };
}
