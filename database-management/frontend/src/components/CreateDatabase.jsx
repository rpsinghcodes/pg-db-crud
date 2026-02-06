import React, { useState } from 'react';
import { Database, PlusCircle, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

const CreateDatabase = ({ onSuccess }) => {
    const [dbName, setDbName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleCreate = async (e) => {
        e.preventDefault();

        // Prevent empty or whitespace-only submissions
        if (!dbName.trim()) {
            setMessage({ text: 'Please enter a database name', type: 'error' });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const response = await api.post('/databases', { dbName });

            setMessage({
                text: response.data.message || `Database "${dbName}" created successfully!`,
                type: 'success'
            });
            setDbName(''); // Clear input on success

            // Trigger auto-refresh
            if (onSuccess) onSuccess();

        } catch (err) {
            // Pull error message from backend or fallback to default
            const errorMsg = err.response?.data?.message || 'Failed to create database';
            setMessage({ text: errorMsg, type: 'error' });
        } finally {
            setLoading(false);
            // Clear message after 5 seconds
            setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        }
    };

    return (
        <div className="group relative bg-white/90 backdrop-blur-sm p-6 lg:p-7 rounded-2xl border border-zinc-200/60 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-blue-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl blur opacity-50"></div>
                        <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                            <PlusCircle size={20} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-zinc-800">Create Database</h2>
                        <p className="text-xs text-zinc-500 mt-0.5">Add a new PostgreSQL database</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleCreate} className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                            <Database size={18} />
                        </div>
                        <input
                            type="text"
                            value={dbName}
                            onChange={(e) => setDbName(e.target.value)}
                            placeholder="e.g., sales_data, analytics_db"
                            disabled={loading}
                            className="block w-full pl-11 pr-4 py-3 bg-gradient-to-br from-zinc-50 to-white border border-zinc-200 rounded-xl text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all duration-200 disabled:opacity-50 shadow-sm"
                            aria-label="Database name input"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !dbName.trim()}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/40 active:scale-[0.98]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                <span>Creating...</span>
                            </>
                        ) : (
                            <>
                                <PlusCircle size={18} />
                                <span>Create Database</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Feedback Messages */}
                {message.text && (
                    <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
                        message.type === 'success'
                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-200/60'
                            : 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-800 border border-rose-200/60'
                    }`}>
                        <div className="flex-shrink-0 mt-0.5">
                            {message.type === 'success' ? (
                                <CheckCircle2 size={18} className="text-emerald-600" />
                            ) : (
                                <AlertCircle size={18} className="text-rose-600" />
                            )}
                        </div>
                        <p className="flex-1">{message.text}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateDatabase;