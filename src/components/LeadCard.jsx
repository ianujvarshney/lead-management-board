import React from 'react';
import { PRIORITY_COLORS } from '../types';

const LeadCard = ({ lead, onEdit, onDelete, onDragStart }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', lead.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const priorityColor = PRIORITY_COLORS[lead.priority] || PRIORITY_COLORS.medium;

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900 text-sm">{lead.name}</h4>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(lead)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit lead"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(lead.id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Delete lead"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-2">
        <span
          className="inline-block px-2 py-1 text-xs font-medium rounded-full text-white"
          style={{ backgroundColor: priorityColor }}
        >
          {lead.priority.toUpperCase()}
        </span>
      </div>

      <div className="space-y-1 text-xs text-gray-600">
        <div className="flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {lead.email}
        </div>
        <div className="flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {lead.phone}
        </div>
        {lead.assignedAgent && (
          <div className="flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {lead.assignedAgent.name}
          </div>
        )}
      </div>

      {lead.notes && (
        <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
          {lead.notes.length > 100 ? `${lead.notes.substring(0, 100)}...` : lead.notes}
        </div>
      )}
    </div>
  );
};

export default LeadCard;