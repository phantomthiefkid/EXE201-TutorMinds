import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
const Dashboard = () => {
  // Dữ liệu biểu đồ
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Revenue',
        backgroundColor: '#3182CE',
        borderColor: '#3182CE',
        borderWidth: 1,
        hoverBackgroundColor: '#3182CE',
        hoverBorderColor: '#3182CE',
        data: [2000, 2500, 3000, 2800, 3500, 3200],
      },
    ],
  });

  // Dữ liệu bảng
  const [tableData, setTableData] = useState([
    { month: 'January', revenue: 2000, invoices: 5 },
    { month: 'February', revenue: 2500, invoices: 6 },
    { month: 'March', revenue: 3000, invoices: 7 },
    { month: 'April', revenue: 2800, invoices: 6 },
    { month: 'May', revenue: 3500, invoices: 8 },
    { month: 'June', revenue: 3200, invoices: 7 },
  ]);

  // Tổng doanh thu và số hóa đơn
  const totalRevenue = tableData.reduce((total, item) => total + item.revenue, 0);
  const totalInvoices = tableData.reduce((total, item) => total + item.invoices, 0);

  return (
    <div className="container px-4 mx-auto sm:px-8 p-6">
      <h2 className="text-3xl py-5 font-semibold leading-tight text-gray-800 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text mb-6">Dashboard - TutorMinds</h2>
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
