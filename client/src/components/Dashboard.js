import React, { useState, useEffect } from 'react';
import KPICard from './KPICard';
import RevenueChart from './RevenueChart';
import CategoryPerformance from './CategoryPerformance';
import TopProducts from './TopProducts';
import CustomerAcquisition from './CustomerAcquisition';
import api from '../api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    summary: null,
    topProducts: null,
    categoryPerformance: null,
    monthlySales: null,
    customerAcquisition: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [summary, topProducts, categoryPerformance, monthlySales, customerAcquisition] = await Promise.all([
          api.getSummary(),
          api.getTopProducts(),
          api.getCategoryPerformance(),
          api.getMonthlySales(),
          api.getCustomerAcquisition(),
        ]);

        setData({
          summary,
          topProducts,
          categoryPerformance,
          monthlySales,
          customerAcquisition,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format large numbers with commas and dollar signs
  const formatCurrency = (value) => {
    if (!value) return '$0';
    return '$' + parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  // Format percentages
  const formatPercent = (value) => {
    if (!value) return '0%';
    return parseFloat(value).toFixed(1) + '%';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  // Get the first year's data (2024 in this case)
  const yearlyRevenueData = data.summary?.yearlyRevenue?.[0] || {};
  const profitMarginData = data.summary?.profitMargin?.[0] || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Business Performance Dashboard</h1>
        <p className="text-gray-600">Financial overview for 2024</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Total Revenue" 
          value={formatCurrency(yearlyRevenueData.total_revenue)}
        />
        <KPICard 
          title="Profit Margin" 
          value={formatPercent(profitMarginData.profit_margin)}
        />
        <KPICard 
          title="Total Customers" 
          value={yearlyRevenueData.total_customers || 0}
        />
        <KPICard 
          title="Revenue per Customer" 
          value={formatCurrency(yearlyRevenueData.revenue_per_customer)}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart data={data.monthlySales} />
        <CategoryPerformance data={data.categoryPerformance} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TopProducts data={data.topProducts} />
        <CustomerAcquisition data={data.customerAcquisition} />
      </div>
    </div>
  );
};

export default Dashboard;
