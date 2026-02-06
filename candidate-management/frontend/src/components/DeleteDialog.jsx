import { AlertTriangle, X } from 'lucide-react';

const DeleteDialog = ({ candidate, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm(candidate);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">Delete Candidate</h3>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-gray-700 mb-6">
            Are you sure you want to delete <span className="font-semibold">{candidate?.name}</span>? 
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
