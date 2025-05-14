import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
export const useTop5Course = ({ id }) => {
  const [barSeries, setBarSeries] = useState([
    {
      name: "Students",
      data: [],
    },
  ]);

  const [barOptions, setBarOptions] = useState({
    chart: {
      id: "bar-chart",
      toolbar: { show: false },
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: [],
          fontSize: "10px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
          fontSize: "10px",
        },
      },
    },
    plotOptions: {
      bar: { distributed: true },
    },
    colors: ["#F44336", "#2196F3", "#FFC107", "#4CAF50", "#9C27B0"],
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    legend: { show: false },
  });

  const fetchTop5Course = async () => {
    try {
      const res = await axiosClient.get(
        `/Courses/top-courses-by-instructor/${id}`
      );

      const names = res.data.map((item) => item.courseName);
      const values = res.data.map((item) => item.studentCount);
      setBarSeries([{ name: "Students", data: values }]);

      setBarOptions((prev) => ({
        ...prev,
        xaxis: {
          ...prev.xaxis,
          categories: names,
          labels: {
            ...prev.xaxis.labels,
            colors: names.map(() => "#fff"),
          },
        },
      }));
    } catch (error) {}
  };

  useEffect(() => {
    fetchTop5Course();
  }, [id]);

  return { barOptions, barSeries };
};
