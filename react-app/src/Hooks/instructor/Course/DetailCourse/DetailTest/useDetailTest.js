// useDetailTest.js
import { useState } from "react";

export const useDetailTest = (initialTest) => {
  const [showEditTest, setShowEditTest] = useState(false);
  const [test, setTest] = useState(initialTest);
  const [loadListFile, setLoadListFile] = useState(false);

  const toggleEditTest = () => {
    setShowEditTest(!showEditTest);
  };

  const handleOnCloseEdit = (updatedTest) => {
    setTest(updatedTest);
    toggleEditTest();
    setLoadListFile(!loadListFile);
  };

  return {
    test,
    showEditTest,
    loadListFile,
    toggleEditTest,
    handleOnCloseEdit,
  };
};
