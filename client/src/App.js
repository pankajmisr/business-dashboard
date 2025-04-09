import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Business Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Connected to PostgreSQL via MCP</span>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Dashboard />
      </main>
      <footer className="bg-white mt-8 py-4 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">
            © 2025 Business Dashboard. Data sourced from PostgreSQL via MCP tool.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
