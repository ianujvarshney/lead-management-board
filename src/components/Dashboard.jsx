import React from 'react';

const Dashboard = ({ leads, stages, agents }) => {

  const stats = {
    totalLeads: leads.length,
    leadsPerStage: stages.map(stage => ({
      stage,
      count: leads.filter(lead => lead.stageId === stage.id).length
    })),
    leadsPerAgent: agents.map(agent => ({
      agent,
      count: leads.filter(lead => lead.assignedAgent?.id === agent.id).length
    })),
    priorityBreakdown: {
      high: leads.filter(lead => lead.priority === 'high').length,
      medium: leads.filter(lead => lead.priority === 'medium').length,
      low: leads.filter(lead => lead.priority === 'low').length
    }
  };

  const totalAssignedLeads = leads.filter(lead => lead.assignedAgent).length;
  const unassignedLeads = leads.length - totalAssignedLeads;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Total Leads</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Assigned</p>
              <p className="text-2xl font-bold text-green-900">{totalAssignedLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">Unassigned</p>
              <p className="text-2xl font-bold text-yellow-900">{unassignedLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Stages</p>
              <p className="text-2xl font-bold text-purple-900">{stages.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Leads per Stage</h3>
          <div className="space-y-3">
            {stats.leadsPerStage.map(({ stage, count }) => (
              <div key={stage.id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.totalLeads > 0 ? (count / stats.totalLeads) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Leads per Agent</h3>
          <div className="space-y-3">
            {stats.leadsPerAgent.map(({ agent, count }) => (
              <div key={agent.id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{agent.name}</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.totalLeads > 0 ? (count / stats.totalLeads) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
            {unassignedLeads > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Unassigned</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.totalLeads > 0 ? (unassignedLeads / stats.totalLeads) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right">{unassignedLeads}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Priority Breakdown</h3>
        <div className="flex space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700">High: {stats.priorityBreakdown.high}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700">Medium: {stats.priorityBreakdown.medium}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700">Low: {stats.priorityBreakdown.low}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;