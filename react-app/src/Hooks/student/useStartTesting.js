import axiosClient from "../../api/axiosClient";

export const useStartTesting = ({ test, user }) => {
  const startTesting = async () => {
    try {
      await axiosClient.patch(
        `/Students/StartTesting/${user.id}/${test.testId}`,
        null,
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Loi khi start testing " + error);
    }
  };

  return { startTesting };
};
