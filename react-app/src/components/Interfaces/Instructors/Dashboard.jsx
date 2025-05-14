import clsx from "clsx";
import styles from "../../../assets/css/Instructor/Dashboard.module.css";
import Chart from "react-apexcharts";
import { useTop5Course } from "../../../Hooks/Other/useTop5Course";
import { useGetTotalCoursesByInstructor } from "../../../Hooks/Other/useGetTotalCoursesByInstructor";

function Dashboard({ isCollapsed, user }) {
  const { barOptions, barSeries } = useTop5Course({ id: user.id });
  const { total } = useGetTotalCoursesByInstructor({ id: user.id });

  const areaOptions = {
    chart: {
      id: "area-chart",
      type: "area",
      zoom: { enabled: false },
      toolbar: {
        show: false, // Tắt menu góc phải
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: {
          colors: "#fff", // Màu chữ trục X
          fontSize: "10px", // Kích thước chữ trục X
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff", // Màu chữ trục Y
          fontSize: "10px", // Kích thước chữ trục Y
        },
      },
    },
    tooltip: {
      enabled: true, // Kích hoạt tooltip
      theme: "dark", // Giao diện tối cho tooltip
      style: {
        fontSize: "14px", // Kích thước chữ trong tooltip
        fontWeight: "bold", // Đậm chữ
      },
    },
    dataLabels: {
      enabled: false, // Tắt data labels
    },
    legend: {
      show: false, // Tắt legend dưới
    },
  };

  const areaSeries = [
    {
      name: "Purchase Orders",
      data: [20, 40, 35, 50, 49, 60],
    },
    {
      name: "Sales Orders",
      data: [30, 60, 45, 80, 70, 90],
    },
  ];

  return (
    <main className={clsx(styles["main-container"])}>
      <div className={clsx(styles["main-title"])}>
        <h2>DASHBOARD</h2>
      </div>
      <div className={clsx(styles["main-cards"])}>
        <div className={clsx(styles.card)}>
          <div className={clsx(styles["card-inner"])}>
            <h3>MY COURSES</h3>
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <h1>{total}</h1>
        </div>

        <div className={clsx(styles.card)}>
          <div className={clsx(styles["card-inner"])}>
            <h3>CATEGORIES</h3>
            <span className="material-symbols-outlined">category</span>
          </div>
          <h1>25</h1>
        </div>

        <div className={clsx(styles.card)}>
          <div className={clsx(styles["card-inner"])}>
            <h3>STUDENTS</h3>
            <span className="material-symbols-outlined">groups</span>
          </div>
          <h1>1500</h1>
        </div>

        <div className={clsx(styles.card)}>
          <div className={clsx(styles["card-inner"])}>
            <h3>ALERTS</h3>
            <span className="material-symbols-outlined">
              notification_important
            </span>
          </div>
          <h1>56</h1>
        </div>
      </div>

      <div className={clsx(styles.charts)}>
        <div className={clsx(styles["charts-card"])}>
          <h2 className={clsx(styles["chart-title"])}>Top 5 Course</h2>
          <Chart
            key={isCollapsed ? "collapsed" : "expanded"}
            options={barOptions}
            series={barSeries}
            type="bar"
            height={300}
            width={!isCollapsed ? 400 : 480}
          />
        </div>

        <div className={clsx(styles["charts-card"])}>
          <h2 className={clsx(styles["chart-title"])}>Purchase and Sales</h2>
          <Chart
            options={areaOptions}
            series={areaSeries}
            type="area"
            height={300}
            width={!isCollapsed ? 400 : 480}
          />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
