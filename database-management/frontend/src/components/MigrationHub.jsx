import React, { useState } from 'react';
import {
    ArrowRightCircle,
    Database,
    Loader2,
    CheckCircle,
    AlertTriangle,
    RefreshCcw
} from 'lucide-react';
import api from '../services/api';

const MigrationHub = ({ allDatabases }) => {
    const [sourceDb, setSourceDb] = useState('');
    const [targetDb, setTargetDb] = useState('');
    const [isMigrating, setIsMigrating] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const startMigration = async () => {
        // 1. Validation Logic
        if (!sourceDb || !targetDb) {
            setStatus({ type: 'error', message: 'Please select both a Source and a Target database.' });
            return;
        }

        if (sourceDb === targetDb) {
            setStatus({ type: 'error', message: 'Source and Target cannot be the same database.' });
            return;
        }

        // 2. State Update
        setIsMigrating(true);
        setStatus({ type: 'progress', message: 'Migration initiated. Streaming data via pg_dump...' });

        try {
            // 3. API Request
            const response = await api.post('/databases/migrate', {
                sourceDbName: sourceDb,
                targetDbName: targetDb
            });

            setStatus({
                type: 'success',
                message: response.data.message || 'Data migration completed successfully!'
            });

            // Reset selections after success
            setSourceDb('');
            setTargetDb('');

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Migration failed. Ensure target is empty or has matching schema.';
            setStatus({ type: 'error', message: errorMsg });
        } finally {
            setIsMigrating(false);
        }
    };

    return (
        <section className="relative overflow-hidden bg-white/90 backdrop-blur-sm border border-zinc-200/60 p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Decorative background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-purple-50/30 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
                {/* Header Area */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl blur opacity-50"></div>
                            <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl">
                                <RefreshCcw className={`text-white ${isMigrating ? 'animate-spin' : ''}`} size={20} />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl lg:text-2xl font-bold text-zinc-800">Migration Hub</h2>
                            <p className="text-xs text-zinc-500 mt-0.5">Transfer data between databases</p>
                        </div>
                    </div>
                    <span className="hidden sm:inline-block text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-zinc-100 px-2.5 py-1 rounded-lg">
                        v1.0
                    </span>
                </div>

                {/* Selector Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-6">
                    {/* Source Dropdown */}
                    <div className="group relative bg-gradient-to-br from-zinc-50 to-white p-5 lg:p-6 rounded-xl border-2 border-zinc-200 shadow-sm hover:border-blue-400 focus-within:border-blue-500 transition-all duration-200">
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                            Source <span className="text-zinc-400 font-normal">(From)</span>
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <Database className="text-blue-600" size={20} />
                            </div>
                            <select
                                value={sourceDb}
                                onChange={(e) => setSourceDb(e.target.value)}
                                disabled={isMigrating}
                                className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-zinc-700 cursor-pointer appearance-none focus:ring-0"
                                aria-label="Select source database"
                            >
                                <option value="">Select source database...</option>
                                {allDatabases.map(db => (
                                    <option key={db} value={db}>{db}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Central Execute Trigger */}
                    <div className="flex flex-col items-center justify-center">
                        <button
                            onClick={startMigration}
                            disabled={isMigrating || !sourceDb || !targetDb}
                            className="group relative p-3 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95"
                            aria-label="Start migration"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all">
                                {isMigrating ? (
                                    <Loader2 className="animate-spin text-white" size={32} />
                                ) : (
                                    <ArrowRightCircle className="text-white group-hover:scale-110 transition-transform" size={32} />
                                )}
                            </div>
                        </button>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase mt-2 tracking-wider">Execute</p>
                    </div>

                    {/* Target Dropdown */}
                    <div className="group relative bg-gradient-to-br from-zinc-50 to-white p-5 lg:p-6 rounded-xl border-2 border-zinc-200 shadow-sm hover:border-purple-400 focus-within:border-purple-500 transition-all duration-200">
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                            Target <span className="text-purple-500 font-normal">(To)</span>
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                <Database className="text-purple-600" size={20} />
                            </div>
                            <select
                                value={targetDb}
                                onChange={(e) => setTargetDb(e.target.value)}
                                disabled={isMigrating}
                                className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-zinc-700 cursor-pointer appearance-none focus:ring-0"
                                aria-label="Select target database"
                            >
                                <option value="">Select target database...</option>
                                {allDatabases.map(db => (
                                    <option key={db} value={db}>{db}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Status Overlay/Footer */}
                {status.message && (
                    <div className={`mt-8 flex items-start gap-4 p-5 rounded-xl border transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                        status.type === 'success' 
                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200/60 text-emerald-800' 
                            : status.type === 'progress' 
                                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200/60 text-indigo-800' 
                                : 'bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200/60 text-rose-800'
                    }`}>
                        <div className="flex-shrink-0 mt-0.5">
                            {status.type === 'success' && (
                                <div className="p-1.5 bg-emerald-100 rounded-lg">
                                    <CheckCircle className="text-emerald-600" size={22} />
                                </div>
                            )}
                            {status.type === 'progress' && (
                                <div className="p-1.5 bg-indigo-100 rounded-lg">
                                    <Loader2 className="animate-spin text-indigo-600" size={22} />
                                </div>
                            )}
                            {status.type === 'error' && (
                                <div className="p-1.5 bg-rose-100 rounded-lg">
                                    <AlertTriangle className="text-rose-600" size={22} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold mb-1">
                                {status.type === 'success' ? 'Migration Successful' : status.type === 'error' ? 'Migration Failed' : 'Migration in Progress'}
                            </p>
                            <p className="text-xs opacity-90 leading-relaxed">{status.message}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MigrationHub;
