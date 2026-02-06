import { useState, useEffect, useCallback } from 'react';
import { Users, X } from 'lucide-react';
import api from './services/api';
import CandidateTable from './components/CandidateTable';
import CandidateForm from './components/CandidateForm';
import DeleteDialog from './components/DeleteDialog';

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/candidates');
      if (response.data.success) {
        setCandidates(response.data.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch candidates');
      console.error('Failed to fetch candidates', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleAddNew = () => {
    setSelectedCandidate(null);
    setShowForm(true);
  };

  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate);
    setShowForm(true);
  };

  const handleDelete = (candidate) => {
    setSelectedCandidate(candidate);
    setShowDeleteDialog(true);
  };

  const handleSaveCandidate = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (selectedCandidate) {
        const response = await api.put(`/candidates/${selectedCandidate.id}`, formData);
        if (response.data.success) {
          setSuccess('Candidate updated successfully!');
          setShowForm(false);
          fetchCandidates();
        }
      } else {
        const response = await api.post('/candidates', formData);
        if (response.data.success) {
          setSuccess('Candidate added successfully!');
          setShowForm(false);
          fetchCandidates();
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save candidate');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCandidate) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.delete(`/candidates/${selectedCandidate.id}`);
      if (response.data.success) {
        setSuccess('Candidate deleted successfully!');
        setShowDeleteDialog(false);
        setSelectedCandidate(null);
        fetchCandidates();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete candidate');
      setShowDeleteDialog(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Users className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Candidate Management</h1>
              <p className="text-gray-600 mt-1">Manage your recruitment pipeline efficiently</p>
            </div>
          </div>
        </div>

        {(error || success) && (
          <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
            error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
          }`}>
            <p className={error ? 'text-red-800' : 'text-green-800'}>
              {error || success}
            </p>
            <button
              onClick={() => {
                setError(null);
                setSuccess(null);
              }}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Dismiss message"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <CandidateTable
          candidates={candidates}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddNew={handleAddNew}
          loading={loading}
        />

        {showForm && (
          <CandidateForm
            candidate={selectedCandidate}
            onSave={handleSaveCandidate}
            onCancel={() => {
              setShowForm(false);
              setSelectedCandidate(null);
            }}
            loading={loading}
          />
        )}

        {showDeleteDialog && (
          <DeleteDialog
            candidate={selectedCandidate}
            onConfirm={handleConfirmDelete}
            onCancel={() => {
              setShowDeleteDialog(false);
              setSelectedCandidate(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
