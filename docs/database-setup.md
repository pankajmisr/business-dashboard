# PostgreSQL Database Connection via MCP

This document explains how to set up and connect to the PostgreSQL database using the MCP tool for the Business Dashboard application.

## Database Connection Details

The application is configured to connect to a PostgreSQL database with the following default settings:

```
Host: example-servers/postgres
Port: 5432
Database: mcp_demo
User: postgres
Password: (empty by default)
```

## Configuration

The database connection settings are stored in the `.env` file in the root directory of the project. You can modify these settings as needed:

```
DB_HOST=example-servers/postgres
DB_PORT=5432
DB_NAME=mcp_demo
DB_USER=postgres
DB_PASSWORD=
```

## Tables and Schema

The application expects the following tables to be present in the database:

1. **products** - Product information
   - product_id (integer): Primary key
   - product_name (varchar): Name of the product
   - category (varchar): Product category
   - supplier_id (integer): Foreign key to suppliers table
   - cost_price (numeric): Cost price of the product

2. **sales** - Sales transactions
   - sale_id (integer): Primary key
   - product_id (integer): Foreign key to products table
   - customer_id (integer): Foreign key to customers table
   - sale_date (date): Date of the sale
   - quantity (integer): Quantity sold
   - unit_price (numeric): Unit price of the product
   - total_price (numeric): Total sale amount

3. **customers** - Customer information
   - customer_id (integer): Primary key
   - customer_name (varchar): Name of the customer
   - email (varchar): Email address
   - phone (varchar): Phone number
   - address (text): Physical address
   - signup_date (date): Date when the customer signed up

4. **suppliers** - Supplier information
   - supplier_id (integer): Primary key
   - supplier_name (varchar): Name of the supplier
   - contact_name (varchar): Contact person name
   - email (varchar): Email address
   - phone (varchar): Phone number
   - address (text): Physical address

## Testing the Connection

You can test the database connection by starting the Node.js server:

```bash
npm start
```

If the connection is successful, you should see the following message in the console:

```
Database connection successful
Server running on port 5000
```

## Troubleshooting

If you encounter any connection issues, verify:

1. The MCP tool is properly configured and running
2. The database server is accessible at the specified host and port
3. The provided credentials have appropriate permissions
4. The required tables exist in the database

If issues persist, check the server logs for specific error messages that can help identify the problem.
