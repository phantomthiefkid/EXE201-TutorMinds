import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "chart.js/auto";
import axios from "axios";

const URL_STATISTIC = "https://fams-management.tech/api/statistic";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [statistic, setStatistic] = useState([]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replace("₫", "VNĐ");
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
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  // Dữ liệu biểu đồ
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Revenue",
        backgroundColor: "#3182CE",
        borderColor: "#3182CE",
        borderWidth: 1,
        hoverBackgroundColor: "#3182CE",
        hoverBorderColor: "#3182CE",
        data: [2000, 2500, 3000, 2800, 3500, 3200],
      },
    ],
  });

  // Dữ liệu bảng
  const [tableData, setTableData] = useState([
    { month: "January", revenue: 2000, invoices: 5 },
    { month: "February", revenue: 2500, invoices: 6 },
    { month: "March", revenue: 3000, invoices: 7 },
    { month: "April", revenue: 2800, invoices: 6 },
    { month: "May", revenue: 3500, invoices: 8 },
    { month: "June", revenue: 3200, invoices: 7 },
  ]);

  // Tổng doanh thu và số hóa đơn
  const totalRevenue = tableData.reduce(
    (total, item) => total + item.revenue,
    0
  );
  const totalInvoices = tableData.reduce(
    (total, item) => total + item.invoices,
    0
  );

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  // Dữ liệu biểu đồ hình tròn cho các trạng thái lớp học
  const classStatusData = [
    { name: "Rejected", value: statistic.rejectedRequestAmount },
    { name: "Approval", value: statistic.approvedRequestAmount },
    { name: "Other", value: statistic.otherRequestAmount },
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
                count: statistic.studentAmount,
                imgSrc:
                  "https://cdn-icons-png.freepik.com/512/2940/2940653.png",
              },
              {
                title: "Số lượng gia sư",
                count: statistic.tutorAmount,
                imgSrc: "https://cdn-icons-png.freepik.com/512/607/607438.png",
              },
              {
                title: "Số lượng khóa học",
                count: 20,
                imgSrc:
                  "https://www.behalacollege.in/website/site_assets/images/our_courses.jpg",
              },
              {
                title: "Tổng số lớp học",
                count: 18,
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
                count: formatCurrency(statistic.revenue),
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Biểu đồ */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Doanh thu hàng tháng</h2>
          <Bar data={chartData} />
        </div>
        {/* Bảng dữ liệu */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Doanh thu tổng quan</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Month</th>
                <th className="px-4 py-2">Revenue ($)</th>
                <th className="px-4 py-2">Invoices</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2">{item.month}</td>
                  <td className="border px-4 py-2">{item.revenue}</td>
                  <td className="border px-4 py-2">{item.invoices}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Thống kê tổng quan */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tổng thể</h2>
          <p className="text-gray-600 mb-2">Total Revenue: ${totalRevenue}</p>
          <p className="text-gray-600">Total Invoices: {totalInvoices}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
