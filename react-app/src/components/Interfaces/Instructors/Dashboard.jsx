import clsx from "clsx";
import styles from "../../../assets/css/Instructor/Dashboard.module.css";
import Chart from "react-apexcharts";
function Dashboard({ isCollapsed }) {
  const barOptions = {
    chart: {
      id: "bar-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "Product A",
        "Product B",
        "Product C",
        "Product D",
        "Product E",
      ],
      labels: {
        style: {
          colors: ["#fff", "#fff", "#fff", "#fff", "#fff"],
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
      bar: {
        distributed: true, // ⚠️ Bắt buộc để mỗi cột có 1 màu riêng
      },
    },
    colors: ["#F44336", "#2196F3", "#FFC107", "#4CAF50", "#9C27B0"],
    tooltip: {
      enabled: true, // Kích hoạt tooltip
      theme: "dark", // Giao diện tối cho tooltip
      style: {
        fontSize: "14px", // Kích thước chữ trong tooltip
        fontWeight: "bold", // Đậm chữ
      },
    },
    legend: {
      show: false, // Tắt legend dưới
    },
  };

  const barSeries = [
    {
      name: "Sales",
      data: [50, 70, 30, 90, 40],
    },
  ];

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
    <main
      className={clsx(styles["main-container"])}
      data-aos="zoom-in"
      data-aos-delay="1500"
    >
      <div className={clsx(styles["main-title"])}>
        <h2>DASHBOARD</h2>
      </div>
      <div className={clsx(styles["main-cards"])}>
        <div className={clsx(styles.card)}>
          <div className={clsx(styles["card-inner"])}>
            <h3>CATEGORIES</h3>
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <h1>249</h1>
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
            <h3>CUSTOMERS</h3>
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
          <h2 className={clsx(styles["chart-title"])}>Top 5 Product</h2>
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
