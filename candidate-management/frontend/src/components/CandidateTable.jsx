import { useState } from 'react';
import { Edit2, Trash2, Search, X, UserPlus } from 'lucide-react';

const CandidateTable = ({ candidates, onEdit, onDelete, onAddNew, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = !searchTerm || 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (candidate.skills && candidate.skills.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || candidate.status === statusFilter;
    const matchesPosition = !positionFilter || 
      (candidate.applied_position && candidate.applied_position.toLowerCase().includes(positionFilter.toLowerCase()));

    return matchesSearch && matchesStatus && matchesPosition;
  });

  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-800 border-blue-200',
    'Interviewing': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Hired': 'bg-green-100 text-green-800 border-green-200',
    'Rejected': 'bg-red-100 text-red-800 border-red-200'
  };

  const uniqueStatuses = [...new Set(candidates.map(c => c.status))];
  const uniquePositions = [...new Set(candidates.map(c => c.applied_position).filter(Boolean))];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Candidates</h2>
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            aria-label="Add new candidate"
          >
            <UserPlus size={18} />
            Add Candidate
          </button>
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Positions</option>
              {uniquePositions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>

            {(statusFilter || positionFilter) && (
              <button
                onClick={() => {
                  setStatusFilter('');
                  setPositionFilter('');
                }}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
                aria-label="Clear filters"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading candidates...</div>
        ) : filteredCandidates.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            {candidates.length === 0 ? 'No candidates found. Add your first candidate!' : 'No candidates match your filters.'}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Skills</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {candidate.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                        <div className="text-sm text-gray-500">Age: {candidate.age}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{candidate.email}</div>
                    {candidate.phone && (
                      <div className="text-sm text-gray-500">{candidate.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{candidate.applied_position || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={candidate.skills}>
                      {candidate.skills || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {candidate.experience !== null && candidate.experience !== undefined 
                        ? `${candidate.experience} ${candidate.experience === 1 ? 'year' : 'years'}`
                        : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${statusColors[candidate.status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(candidate)}
                        className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                        aria-label={`Edit ${candidate.name}`}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(candidate)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={`Delete ${candidate.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filteredCandidates.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          Showing {filteredCandidates.length} of {candidates.length} candidate{candidates.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default CandidateTable;
