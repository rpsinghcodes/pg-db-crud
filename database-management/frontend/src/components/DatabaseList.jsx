import React from 'react';
import { Layers, HardDrive, Database } from 'lucide-react';

const DatabaseList = ({ databases, loading }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-5 lg:p-6 shadow-lg sticky top-24 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg blur opacity-50"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg">
              <Layers size={16} className="text-white" />
            </div>
          </div>
          <h2 className="text-sm font-bold text-zinc-800 uppercase tracking-wider">Database Inventory</h2>
        </div>
        {!loading && (
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-bold rounded-lg">
            {databases.length}
          </span>
        )}
      </div>

      {/* Content */}
      {loading && databases.length === 0 ? (
        <div className="space-y-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gradient-to-r from-zinc-100 via-zinc-50 to-zinc-100 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto custom-scrollbar">
          {databases.length > 0 ? (
            databases.map((db, index) => (
              <div 
                key={db}
                className="group flex items-center gap-3 px-3.5 py-2.5 bg-gradient-to-r from-zinc-50 to-white border border-zinc-200 rounded-xl hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50/30 transition-all duration-200 cursor-default hover:shadow-md hover:shadow-indigo-100"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="p-1.5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
                    <HardDrive size={14} className="text-indigo-600 group-hover:text-indigo-700" />
                  </div>
                </div>
                <span className="text-sm font-semibold text-zinc-700 group-hover:text-zinc-900 truncate flex-1">
                  {db}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-zinc-100 rounded-full mb-3">
                <Database size={24} className="text-zinc-400" />
              </div>
              <p className="text-sm text-zinc-500 font-medium">No databases found</p>
              <p className="text-xs text-zinc-400 mt-1">Create your first database to get started</p>
            </div>
          )}
        </div>
      )}
      
      {/* Footer */}
      {databases.length > 0 && !loading && (
        <div className="mt-6 pt-4 border-t border-zinc-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-medium">Total Databases</span>
            <span className="text-sm font-bold text-zinc-700 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {databases.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseList;