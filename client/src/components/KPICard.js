import React from 'react';

const KPICard = ({ title, value, change, icon }) => {
  const isPositive = parseFloat(change) >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-500 text-sm font-medium">{title}</span>
        {icon && <span className="text-blue-500">{icon}</span>}
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      {change && (
        <div className={`text-sm flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <span className="mr-1">
            {isPositive ? '↑' : '↓'}
          </span>
          <span>{Math.abs(change)}% from previous period</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;
