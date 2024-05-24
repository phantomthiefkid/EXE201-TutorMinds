import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
const Dashboard = () => {
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

  return (
    <div className="container mx-auto max-w-full p-6">
      <h2 className="text-2xl font-semibold leading-tight text-gray-600  mb-4">
        Chào mừng Admin!
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div class="p-4 bg-white rounded-lg shadow-lg h-32">
          <div class="flex items-center justify-between">
            <div className="block">
              <h3 class="text-lg font-bold text-gray-300">Số lượng học sinh</h3>
              <p class="text-gray-600 text-2xl font-bold">449</p>
            </div>
            <img
              alt="student"
              className="h-20 w-20 just"
              src="https://cdn-icons-png.freepik.com/512/2940/2940653.png"
            />
          </div>
        </div>

        <div class="p-4 bg-white rounded-lg shadow-lg h-32">
          <div class="flex items-center justify-between">
            <div className="block">
              <h3 class="text-lg font-bold text-gray-300">Số lượng gia sư</h3>
              <p class="text-gray-600 text-2xl font-bold">205</p>
            </div>
            <img
              alt="student"
              className="h-20 w-20 just"
              src="https://cdn-icons-png.freepik.com/512/607/607438.png"
            />
          </div>
        </div>

        <div class="p-4 bg-white rounded-lg shadow-lg h-32">
          <div class="flex items-center justify-between">
            <div className="block">
              <h3 class="text-lg font-bold text-gray-300">Tổng số lớp học</h3>
              <p class="text-gray-600 text-2xl font-bold">18</p>
            </div>
            <img
              alt="student"
              className="h-20 w-20 just"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfDhQwYkvbExlEDDidPW0o5X27oABpTj-MpH3w2FQGVatB9llsY1VswShanckPjcM_Ic8&usqp=CAU"
            />
          </div>
        </div>

        <div class="p-4 bg-white rounded-lg shadow-lg h-32">
          <div class="flex items-center justify-between">
            <div className="block">
              <h3 class="text-lg font-bold text-gray-300">Doanh thu</h3>
              <p class="text-gray-600 text-2xl font-bold">56.000.000 VNĐ</p>
            </div>
            <img
              alt="student"
              className="h-20 w-20 just"
              src="https://blog.webico.vn/wp-content/uploads/2019/12/1417423865-2.jpg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Biểu đồ */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <Bar data={chartData} />
        </div>
        {/* Bảng dữ liệu */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue Summary</h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Month</th>
                <th className="px-4 py-2">Revenue ($)</th>
                <th className="px-4 py-2">Invoices</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
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
          <h2 className="text-xl font-semibold mb-4">Overall Summary</h2>
          <p className="text-gray-600">Total Revenue: ${totalRevenue}</p>
          <p className="text-gray-600">Total Invoices: {totalInvoices}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
