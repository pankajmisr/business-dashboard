require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'example-servers/postgres',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'mcp_demo',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || ''
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connection successful');
  }
});

// API endpoints
app.get('/api/summary', async (req, res) => {
  try {
    // Get total revenue and year-over-year metrics
    const yearlyRevenueResult = await pool.query(
      `SELECT 
        EXTRACT(YEAR FROM sale_date) AS year,
        SUM(total_price) AS total_revenue,
        COUNT(DISTINCT customer_id) AS total_customers,
        SUM(total_price) / COUNT(DISTINCT customer_id) AS revenue_per_customer
      FROM 
        sales
      GROUP BY 
        EXTRACT(YEAR FROM sale_date)
      ORDER BY 
        year`
    );

    // Get profit margins
    const profitMarginResult = await pool.query(
      `SELECT 
        EXTRACT(YEAR FROM s.sale_date) AS year,
        SUM(s.total_price) AS total_revenue,
        SUM(p.cost_price * s.quantity) AS total_cost,
        SUM(s.total_price) - SUM(p.cost_price * s.quantity) AS total_profit,
        (SUM(s.total_price) - SUM(p.cost_price * s.quantity)) / SUM(s.total_price) * 100 AS profit_margin
      FROM 
        sales s
      JOIN 
        products p ON s.product_id = p.product_id
      GROUP BY 
        EXTRACT(YEAR FROM s.sale_date)
      ORDER BY 
        year`
    );

    // Respond with combined data
    res.json({
      yearlyRevenue: yearlyRevenueResult.rows,
      profitMargin: profitMarginResult.rows
    });
  } catch (error) {
    console.error('Error fetching summary data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/top-products', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        p.product_name,
        p.category,
        SUM(s.total_price) AS total_revenue,
        SUM(s.quantity) AS units_sold,
        SUM(s.total_price) - SUM(p.cost_price * s.quantity) AS total_profit
      FROM 
        sales s
      JOIN 
        products p ON s.product_id = p.product_id
      GROUP BY 
        p.product_name, p.category
      ORDER BY 
        total_revenue DESC
      LIMIT 5`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/category-performance', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        p.category,
        SUM(s.total_price) AS revenue,
        COUNT(DISTINCT s.customer_id) AS customers,
        SUM(s.total_price) - SUM(p.cost_price * s.quantity) AS profit,
        (SUM(s.total_price) - SUM(p.cost_price * s.quantity)) / SUM(s.total_price) * 100 AS profit_margin
      FROM 
        sales s
      JOIN 
        products p ON s.product_id = p.product_id
      GROUP BY 
        p.category
      ORDER BY 
        revenue DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching category performance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/monthly-sales', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        EXTRACT(YEAR FROM sale_date) AS year,
        EXTRACT(MONTH FROM sale_date) AS month,
        SUM(total_price) AS monthly_revenue
      FROM 
        sales
      GROUP BY 
        EXTRACT(YEAR FROM sale_date),
        EXTRACT(MONTH FROM sale_date)
      ORDER BY 
        year, month`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching monthly sales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/customer-acquisition', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        EXTRACT(YEAR FROM signup_date) AS year,
        EXTRACT(MONTH FROM signup_date) AS month,
        COUNT(*) AS new_customers
      FROM 
        customers
      GROUP BY 
        EXTRACT(YEAR FROM signup_date),
        EXTRACT(MONTH FROM signup_date)
      ORDER BY 
        year, month`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customer acquisition data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
