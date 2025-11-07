import React, { useState } from 'react';
import { PRIORITY } from '../types';

const SearchFilter = ({ onSearch, agents, stages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    triggerSearch(value, selectedStage, selectedAgent, selectedPriority);
  };

  const handleStageChange = (e) => {
    const value = e.target.value;
    setSelectedStage(value);
    triggerSearch(searchTerm, value, selectedAgent, selectedPriority);
  };

  const handleAgentChange = (e) => {
    const value = e.target.value;
    setSelectedAgent(value);
    triggerSearch(searchTerm, selectedStage, value, selectedPriority);
  };

  const handlePriorityChange = (e) => {
    const value = e.target.value;
    setSelectedPriority(value);
    triggerSearch(searchTerm, selectedStage, selectedAgent, value);
  };

  const triggerSearch = (term, stage, agent, priority) => {

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      onSearch({
        searchTerm: term,
        stageId: stage,
        agentId: agent,
        priority: priority
      });
    }, 300);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStage('');
    setSelectedAgent('');
    setSelectedPriority('');
    onSearch({
      searchTerm: '',
      stageId: '',
      agentId: '',
      priority: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search leads by name, email, or phone..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <select
            value={selectedStage}
            onChange={handleStageChange}
            className="block w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Stages</option>
            {stages.map(stage => (
              <option key={stage.id} value={stage.id}>{stage.name}</option>
            ))}
          </select>

          <select
            value={selectedAgent}
            onChange={handleAgentChange}
            className="block w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Agents</option>
            {agents.map(agent => (
              <option key={agent.id} value={agent.id}>{agent.name}</option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={handlePriorityChange}
            className="block w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Priorities</option>
            <option value={PRIORITY.HIGH}>High</option>
            <option value={PRIORITY.MEDIUM}>Medium</option>
            <option value={PRIORITY.LOW}>Low</option>
          </select>

          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;