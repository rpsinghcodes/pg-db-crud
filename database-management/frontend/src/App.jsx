import React, { useState, useEffect, useCallback } from 'react';
import { Database, RefreshCw, Sparkles } from 'lucide-react';
import api from './services/api';
import CreateDatabase from './components/CreateDatabase';
import VerifyDatabase from './components/VerifyDatabase';
import MigrationHub from './components/MigrationHub';
import DatabaseList from './components/DatabaseList';

function App() {
  const [allDatabases, setAllDatabases] = useState([]);
  const [loading, setLoading] = useState(false);

  // Memoized fetch function so it can be called from anywhere
  const fetchDatabases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/databases');
      if (response.data.success) {
        setAllDatabases(response.data.databases);
      }
    } catch (err) {
      console.error("Failed to fetch databases", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on initial load
  useEffect(() => {
    fetchDatabases();
  }, [fetchDatabases]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-zinc-900 font-sans pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-zinc-200/60 py-5 px-6 lg:px-8 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-sm opacity-50"></div>
              <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
                <Database className="text-white" size={24} />
              </div>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent">
                PostgreSQL Manager
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">Database Management Interface</p>
            </div>
          </div>

          <button
            onClick={fetchDatabases}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30"
            aria-label="Refresh database list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Syncing...' : 'Refresh'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Sidebar: Database Inventory */}
        <aside className="lg:col-span-3">
          <DatabaseList databases={allDatabases} loading={loading} />
        </aside>

        {/* Right Content: Operations & Migration */}
        <div className="lg:col-span-9 space-y-6 lg:space-y-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CreateDatabase onSuccess={fetchDatabases} />
            <VerifyDatabase allDatabases={allDatabases} />
          </div>

          {/* Migration Hub */}
          <MigrationHub allDatabases={allDatabases} />
        </div>
      </main>
    </div>
  );
}

export default App;