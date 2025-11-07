import React, { useState } from 'react';
import LeadCard from './LeadCard';

const KanbanColumn = ({ 
  stage, 
  leads, 
  agents, 
  onLeadEdit, 
  onLeadDelete, 
  onLeadMove, 
  onStageEdit,
  onStageDelete 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isEditingStage, setIsEditingStage] = useState(false);
  const [editedStageName, setEditedStageName] = useState(stage.name);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      onLeadMove(leadId, stage.id);
    }
  };

  const handleStageEdit = () => {
    setIsEditingStage(true);
    setEditedStageName(stage.name);
  };

  const handleStageSave = () => {
    if (editedStageName.trim() && editedStageName !== stage.name) {
      onStageEdit(stage.id, editedStageName.trim());
    }
    setIsEditingStage(false);
  };

  const handleStageCancel = () => {
    setEditedStageName(stage.name);
    setIsEditingStage(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStageSave();
    } else if (e.key === 'Escape') {
      handleStageCancel();
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 rounded-lg p-4 min-h-96 w-80">
      <div className="flex items-center justify-between mb-4">
        {isEditingStage ? (
          <div className="flex items-center space-x-2 flex-1">
            <input
              type="text"
              value={editedStageName}
              onChange={(e) => setEditedStageName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleStageSave}
              className="text-green-600 hover:text-green-800"
              title="Save"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              onClick={handleStageCancel}
              className="text-gray-400 hover:text-gray-600"
              title="Cancel"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-gray-900 text-lg">{stage.name}</h3>
            <div className="flex items-center space-x-1">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {leads.length}
              </span>
              <button
                onClick={handleStageEdit}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit stage"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onStageDelete(stage.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
                title="Delete stage"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      <div
        className={`flex-1 space-y-3 min-h-32 rounded-lg transition-colors ${
          isDragOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onEdit={onLeadEdit}
            onDelete={onLeadDelete}
          />
        ))}
        {leads.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
            </svg>
            <p className="text-sm">Drop leads here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;