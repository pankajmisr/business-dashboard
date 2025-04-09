import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomerAcquisition = ({ data }) => {
  // Format month numbers to month names
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const formattedData = data?.map(item => ({
    ...item,
    month: monthNames[parseInt(item.month) - 1],
    new_customers: parseInt(item.new_customers)
  })) || [];

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Customer Acquisition (2024)</h2>
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
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [value, 'New Customers']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar 
            dataKey="new_customers" 
            name="New Customers" 
            fill="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerAcquisition;
