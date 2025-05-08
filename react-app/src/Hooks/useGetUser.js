import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export const useGetUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Để xử lý loading

  const fetchUser = async () => {
    try {
      const response = await axiosClient.get("/Users/userinfo", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, setUser, loading, fetchUser };
};
