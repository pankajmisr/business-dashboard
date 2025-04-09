# Business Dashboard

Interactive business dashboard connecting to PostgreSQL via MCP tool. This application provides real-time visualization of key business metrics including revenue, profits, product performance, and customer acquisition.

![Business Dashboard](https://via.placeholder.com/800x450.png?text=Business+Performance+Dashboard)

## Features

- **Interactive Dashboard**: Real-time display of business performance metrics
- **Revenue Tracking**: Monitor monthly revenue trends with visual charts
- **Product Analysis**: Identify top-performing products and categories
- **Profit Margin Analysis**: Track profitability across product categories
- **Customer Acquisition**: Monitor new customer sign-ups over time
- **PostgreSQL Integration**: Direct connection to your database via MCP tool

## Technical Stack

- **Backend**: Node.js with Express
- **Frontend**: React with Recharts for data visualization
- **Database**: PostgreSQL via MCP tool
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Access to a PostgreSQL database via the MCP tool
- The required database schema (see docs/database-setup.md)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pankajmisr/business-dashboard.git
   cd business-dashboard
   ```

2. Install server dependencies:
   ```bash
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

4. Configure the database connection:
   - Create a `.env` file in the root directory (or edit the existing one)
   - Add your PostgreSQL connection details:
     ```
     PORT=5000
     DB_HOST=example-servers/postgres
     DB_PORT=5432
     DB_NAME=mcp_demo
     DB_USER=postgres
     DB_PASSWORD=
     ```

## Running the Application

1. Start the development server (both frontend and backend):
   ```bash
   npm run dev-all
   ```

2. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

- `GET /api/summary`: Overall business performance metrics
- `GET /api/top-products`: Best-selling products
- `GET /api/category-performance`: Category-wise performance
- `GET /api/monthly-sales`: Monthly revenue trends
- `GET /api/customer-acquisition`: New customer sign-ups by month

## Database Schema

This application expects specific tables and schemas in your PostgreSQL database. See [Database Setup](docs/database-setup.md) for details on the required schema.

## Deployment

For production deployment:

1. Build the React frontend:
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. Set the environment variable:
   ```bash
   NODE_ENV=production
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
