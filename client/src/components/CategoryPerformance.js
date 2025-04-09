import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CategoryPerformance = ({ data }) => {
  const formattedData = data?.map(item => ({
    ...item,
    revenue: parseFloat(item.revenue),
    profit: parseFloat(item.profit),
    profit_margin: parseFloat(item.profit_margin).toFixed(1)
  })) || [];

  const colors = {
    revenue: '#3B82F6',  // Blue
    profit: '#10B981',   // Green
  };

  // Custom tooltip to display profit margin
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-bold mb-1">{label}</p>
          <p className="text-sm text-blue-600">Revenue: ${payload[0].value.toLocaleString()}</p>
          <p className="text-sm text-green-600">Profit: ${payload[1].value.toLocaleString()}</p>
          <p className="text-sm mt-1">
            Profit Margin: {formattedData.find(item => item.category === label)?.profit_margin}%
          </p>
          <p className="text-sm">
            Customers: {formattedData.find(item => item.category === label)?.customers}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Category Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="revenue" fill={colors.revenue} name="Revenue" />
          <Bar dataKey="profit" fill={colors.profit} name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPerformance;
