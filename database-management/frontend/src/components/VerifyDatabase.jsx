import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, Loader2, Database, ShieldCheck } from 'lucide-react';
import api from '../services/api';

const VerifyDatabase = () => {
  const [inputName, setInputName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null, 'found', or 'not_found'

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;

    setLoading(true);
    setStatus(null);

    try {
      const response = await api.post('/databases/verify', { dbName: inputName });
      
      if (response.data.exists) {
        setStatus('found');
      } else {
        setStatus('not_found');
      }
    } catch (err) {
      // If backend returns 404, the catch block handles it
      setStatus('not_found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative bg-white/90 backdrop-blur-sm p-6 lg:p-7 rounded-2xl border border-zinc-200/60 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl blur opacity-50"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl">
              <Search size={20} className="text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-800">Verify Database</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Check if database exists</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
              <Database size={18} />
            </div>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter database name to verify..."
              className="block w-full pl-11 pr-4 py-3 bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-xl text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-200 shadow-sm"
              aria-label="Database name to verify"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !inputName.trim()}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Verify Database</span>
              </>
            )}
          </button>
        </form>

        {/* Result Cards */}
        <div className="mt-6">
          {status === 'found' && (
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex-shrink-0 mt-0.5">
                <div className="p-1.5 bg-emerald-100 rounded-lg">
                  <CheckCircle2 className="text-emerald-600" size={18} />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-emerald-800">Database Found</p>
                <p className="text-xs text-emerald-700 mt-1">
                  The database exists and is ready for operations.
                </p>
              </div>
            </div>
          )}

          {status === 'not_found' && (
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/60 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex-shrink-0 mt-0.5">
                <div className="p-1.5 bg-rose-100 rounded-lg">
                  <XCircle className="text-rose-600" size={18} />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-rose-800">Database Not Found</p>
                <p className="text-xs text-rose-700 mt-1">
                  The database doesn't exist. Please verify the name or create it first.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyDatabase;