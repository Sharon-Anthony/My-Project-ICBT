import React from 'react';


function QueryPopup({ query, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-1/3 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
         
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-700">Query Details</h2>
        <div className="space-y-4 text-gray-600">
          <div>
            <span className="font-semibold">Query ID:</span> {query.queryId}
          </div>
          <div>
            <span className="font-semibold">Service Name:</span> {query.serviceName}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {query.email}
          </div>
          <div>
            <span className="font-semibold">Query:</span> {query.query}
          </div>
          <div>
            <span className="font-semibold">Response:</span> {query.response}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default QueryPopup;
