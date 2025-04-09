# Business Dashboard

Interactive business dashboard connecting to PostgreSQL via MCP tool.

## Features

- Real-time business metrics visualization
- Integration with PostgreSQL database
- Key performance indicators:
  - Revenue and profit tracking
  - Top products analysis
  - Customer acquisition metrics
  - Category performance
  - Monthly trends

## Technical Stack

- **Backend**: Node.js with Express
- **Frontend**: React with Recharts for data visualization
- **Database**: PostgreSQL via MCP tool
- **Styling**: Tailwind CSS

## Setup

1. Clone this repository
2. Install dependencies with `npm run install-all`
3. Configure database connection in `.env` file
4. Start the application with `npm run dev-all`

## API Endpoints

- `/api/summary` - Overall business performance metrics
- `/api/top-products` - Best-selling products
- `/api/category-performance` - Category-wise performance
- `/api/monthly-sales` - Monthly revenue trends
- `/api/customer-acquisition` - New customer sign-ups by month
