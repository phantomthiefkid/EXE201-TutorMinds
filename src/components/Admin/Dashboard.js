import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  ChartLegend
);

const URL_STATISTIC = "https://fams-management.tech/api/statistic";
const URL_REVENUE_BY_RANGE =
  "https://fams-management.tech/api/statistic/revenue-by-range";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [statistic, setStatistic] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [revenues, setRevenues] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchStatistic();
    }
  }, [token, navigate]);

  const fetchStatistic = async () => {
    try {
      const response = await axios.get(URL_STATISTIC, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      setStatistic(data);
      updateChartData(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchRevenue = async (startDate, endDate) => {
    try {
      const startUTC = new Date(
        Date.UTC(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
      );
      const endUTC = new Date(
        Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
      );

      const response = await axios.get(URL_REVENUE_BY_RANGE, {
        params: {
          startDate: startUTC.toISOString().slice(0, 10),
          endDate: endUTC.toISOString().slice(0, 10),
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const revenueData = response.data;
      setRevenues(revenueData);
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  const handleCalculateRevenue = () => {
    if (startDate && endDate) {
      fetchRevenue(startDate, endDate);
    } else {
      console.warn("Please select both start and end dates.");
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("sv-SE", options);
  };

  const updateChartData = (data) => {
    if (data && data.weeklyStatisticList) {
      const weeklyData = data.weeklyStatisticList;
      const labels = weeklyData.map((item) => item.dayOfWeek);
      const dates = weeklyData.map((item) => item.date);
      const firstDate = new Date(dates[0]);
      const lastDate = new Date(dates[dates.length - 1]);
      const formattedFirstDay = formatDate(firstDate);
      const formattedLastDay = formatDate(lastDate);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Weekly Revenue",
            backgroundColor: "#3182CE",
            borderColor: "#3182CE",
            borderWidth: 1,
            hoverBackgroundColor: "#3182CE",
            hoverBorderColor: "#3182CE",
            data: weeklyData.map((item) => item.revenue || 0),
          },
        ],
      });

      setFirstDay(formattedFirstDay);
      setLastDay(formattedLastDay);
    }
  };

  const classStatusData = [
    { name: "Rejected", value: statistic?.rejectedRequestAmount || 0 },
    { name: "Approval", value: statistic?.approvedRequestAmount || 0 },
    { name: "Other", value: statistic?.otherRequestAmount || 0 },
  ];

  const COLORS = ["#FF8042", "#0088FE", "#FFBB28"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${classStatusData[index].name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="container mx-auto p-10">
      <div className="flex items-center">
        <h2 className="text-3xl font-semibold text-gray-800 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
          Xin chào Admin!
        </h2>
      </div>
      {/* Biểu đồ hình tròn và các item */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Số lượng yêu cầu lớp học</h2>
        <div className="flex flex-wrap">
          {/* Biểu đồ tròn */}
          <div className="w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
            <PieChart width={320} height={320}>
              <Pie
                data={classStatusData}
                cx={150}
                cy={160}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {classStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          {/* Các item */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Số lượng học sinh",
                count: statistic?.studentAmount || 0,
                imgSrc:
                  "https://cdn-icons-png.freepik.com/512/2940/2940653.png",
              },
              {
                title: "Số lượng gia sư",
                count: statistic?.tutorAmount || 0,
                imgSrc: "https://cdn-icons-png.freepik.com/512/607/607438.png",
              },
              {
                title: "Số lượng khóa học",
                count: statistic?.numberOfCourse || 0,
                imgSrc:
                  "https://www.behalacollege.in/website/site_assets/images/our_courses.jpg",
              },
              {
                title: "Tổng số lớp học",
                count: statistic?.approvedRequestAmount || 0,
                imgSrc:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfDhQwYkvbExlEDDidPW0o5X27oABpTj-MpH3w2FQGVatB9llsY1VswShanckPjcM_Ic8&usqp=CAU",
              },
              {
                title: "Tổng số tiền đã nạp",
                count: "20.000.000 VNĐ",
                imgSrc:
                  "https://cdn-icons-png.flaticon.com/512/13045/13045169.png",
              },
              {
                title: "Tổng doanh thu",
                count: formatCurrency(statistic?.revenue || 0),
                imgSrc:
                  "https://blog.webico.vn/wp-content/uploads/2019/12/1417423865-2.jpg",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-lg flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-500">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xl font-bold">
                    {item.count}
                  </p>
                </div>
                <img
                  alt="icon"
                  className="h-20 w-20 object-contain"
                  src={item.imgSrc}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Biểu đồ */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Doanh thu hàng tuần</h2>
            <div className="flex space-x-4 p-4 bg-white rounded-lg shadow-lg">
              <p className="text-md font-bold">{firstDay}</p>
              <p className="flex items-center">
                <ArrowRight size={20} />
              </p>
              <p className="text-md font-bold">{lastDay}</p>
            </div>
          </div>

          {/* Bar chart for weekly revenue */}
          {chartData ? (
            <Bar data={chartData} />
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">
            Tính doanh thu theo khoảng ngày
          </h2>
          <div className="flex flex-col mt-4 md:flex-row md:items-center md:space-x-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              placeholderText="Từ ngày"
              dateFormat="yyyy/MM/dd"
              className="border-gray-300 border rounded-lg p-2 outline-none mb-2 md:mb-0"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              endDate={endDate}
              placeholderText="Đến ngày"
              dateFormat="yyyy/MM/dd"
              className="border-gray-300 border rounded-lg p-2 outline-none mb-2 md:mb-0"
            />
            <button
              className="bg-blue-500 text-white rounded-lg shadow-md px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600"
              onClick={handleCalculateRevenue}
            >
              Tính toán
            </button>
          </div>
          <h2 className="text-xl font-semibold mt-6">
            Doanh thu: {formatCurrency(revenues || 0)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
