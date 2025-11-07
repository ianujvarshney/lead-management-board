import React, { useState, useEffect } from 'react';
import { PRIORITY, DEFAULT_STAGES, DEFAULT_AGENTS } from './types';
import storageService from './storage';
import { exportToCSV, generateSampleData } from './utils/exportUtils';
import KanbanColumn from './components/KanbanColumn';
import LeadForm from './components/LeadForm';
import Dashboard from './components/Dashboard';
import SearchFilter from './components/SearchFilter';
import './App.css';

function App() {
  const [leads, setLeads] = useState([]);
  const [stages, setStages] = useState(DEFAULT_STAGES);
  const [agents, setAgents] = useState(DEFAULT_AGENTS);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    stageId: '',
    agentId: '',
    priority: ''
  });
  const [showDashboard, setShowDashboard] = useState(true);


  useEffect(() => {
    const loadedLeads = storageService.getLeads();
    const loadedStages = storageService.getStages();
    const loadedAgents = storageService.getAgents();

    setLeads(loadedLeads);
    setStages(loadedStages);
    setAgents(loadedAgents);


    if (loadedLeads.length === 0) {
      const sampleLeads = generateSampleData();
      setLeads(sampleLeads);
      storageService.saveLeads(sampleLeads);
    }
  }, []);


  useEffect(() => {
    if (leads.length > 0) {
      storageService.saveLeads(leads);
    }
  }, [leads]);

  useEffect(() => {
    storageService.saveStages(stages);
  }, [stages]);

  useEffect(() => {
    storageService.saveAgents(agents);
  }, [agents]);


  const handleAddLead = (leadData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      ...leadData,
      createdAt: new Date().toISOString()
    };
    setLeads([...leads, newLead]);
    setShowLeadForm(false);
  };

  const handleEditLead = (leadData) => {
    setLeads(leads.map(lead => lead.id === leadData.id ? leadData : lead));
    setShowLeadForm(false);
    setEditingLead(null);
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== leadId));
    }
  };

  const handleMoveLead = (leadId, newStageId) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, stageId: newStageId } : lead
    ));
  };


  const handleAddStage = () => {
    const newStageName = prompt('Enter new stage name:');
    if (newStageName && newStageName.trim()) {
      const newStage = {
        id: `stage-${Date.now()}`,
        name: newStageName.trim(),
        order: stages.length
      };
      setStages([...stages, newStage]);
    }
  };

  const handleEditStage = (stageId, newName) => {
    setStages(stages.map(stage => 
      stage.id === stageId ? { ...stage, name: newName } : stage
    ));
  };

  const handleDeleteStage = (stageId) => {
    const stage = stages.find(s => s.id === stageId);
    if (stage && window.confirm(`Are you sure you want to delete "${stage.name}" stage? All leads in this stage will be unassigned.`)) {
      setStages(stages.filter(stage => stage.id !== stageId));

      const firstStage = stages.find(s => s.id !== stageId);
      if (firstStage) {
        setLeads(leads.map(lead => 
          lead.stageId === stageId ? { ...lead, stageId: firstStage.id } : lead
        ));
      }
    }
  };


  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };


  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchFilters.searchTerm || 
      lead.name.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchFilters.searchTerm.toLowerCase());

    const matchesStage = !searchFilters.stageId || lead.stageId === searchFilters.stageId;
    const matchesAgent = !searchFilters.agentId || lead.assignedAgent?.id === searchFilters.agentId;
    const matchesPriority = !searchFilters.priority || lead.priority === searchFilters.priority;

    return matchesSearch && matchesStage && matchesAgent && matchesPriority;
  });

  const leadsByStage = stages.reduce((acc, stage) => {
    acc[stage.id] = filteredLeads.filter(lead => lead.stageId === stage.id);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Lead Management Board</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowDashboard(!showDashboard)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  showDashboard 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
              </button>
              <button
                onClick={() => exportToCSV(leads, stages, agents)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Export CSV
              </button>
              <button
                onClick={handleAddStage}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                Add Stage
              </button>
              <button
                onClick={() => {
                  setEditingLead(null);
                  setShowLeadForm(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Add Lead
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {showDashboard && (
          <Dashboard leads={leads} stages={stages} agents={agents} />
        )}

    
        <SearchFilter
          onSearch={handleSearch}
          agents={agents}
          stages={stages}
        />


        <div className="flex space-x-6 overflow-x-auto pb-6">
          {stages.map(stage => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              leads={leadsByStage[stage.id] || []}
              agents={agents}
              onLeadEdit={(lead) => {
                setEditingLead(lead);
                setShowLeadForm(true);
              }}
              onLeadDelete={handleDeleteLead}
              onLeadMove={handleMoveLead}
              onStageEdit={handleEditStage}
              onStageDelete={handleDeleteStage}
            />
          ))}
        </div>
      </main>


      {showLeadForm && (
        <LeadForm
          lead={editingLead}
          agents={agents}
          stages={stages}
          onSave={editingLead ? handleEditLead : handleAddLead}
          onCancel={() => {
            setShowLeadForm(false);
            setEditingLead(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
