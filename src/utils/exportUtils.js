
export const exportToCSV = (leads, stages, agents) => {

  const headers = [
    'Lead Name',
    'Email',
    'Phone',
    'Stage',
    'Priority',
    'Assigned Agent',
    'Agent Email',
    'Notes',
    'Created Date'
  ];


  const rows = leads.map(lead => {
    const stage = stages.find(s => s.id === lead.stageId);
    const assignedAgent = lead.assignedAgent;
    
    return [
      `"${lead.name || ''}"`,
      `"${lead.email || ''}"`,
      `"${lead.phone || ''}"`,
      `"${stage?.name || ''}"`,
      `"${lead.priority || ''}"`,
      `"${assignedAgent?.name || 'Unassigned'}"`,
      `"${assignedAgent?.email || ''}"`,
      `"${lead.notes || ''}"`,
      `"${lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}"`
    ].join(',');
  });


  const csvContent = [headers.join(','), ...rows].join('\n');


  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {

    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};


export const generateSampleData = () => {
  const sampleLeads = [
    {
      id: 'lead-1',
      name: 'Alice Johnson',
      email: 'alice@techcorp.com',
      phone: '+1-555-0123',
      stageId: 'new-lead',
      priority: 'high',
      notes: 'Interested in enterprise solution. Budget: $50k.',
      assignedAgent: { id: 'john', name: 'John Smith', email: 'john@company.com' },
      createdAt: new Date().toISOString()
    },
    {
      id: 'lead-2',
      name: 'Bob Williams',
      email: 'bob@startup.io',
      phone: '+1-555-0456',
      stageId: 'contacted',
      priority: 'medium',
      notes: 'Startup looking for basic package. Follow up next week.',
      assignedAgent: { id: 'priya', name: 'Priya Patel', email: 'priya@company.com' },
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'lead-3',
      name: 'Carol Martinez',
      email: 'carol@enterprise.net',
      phone: '+1-555-0789',
      stageId: 'qualified',
      priority: 'high',
      notes: 'Large enterprise deal. Demo scheduled.',
      assignedAgent: { id: 'ahmed', name: 'Ahmed Hassan', email: 'ahmed@company.com' },
      createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 'lead-4',
      name: 'David Chen',
      email: 'david@smallbiz.com',
      phone: '+1-555-0321',
      stageId: 'won',
      priority: 'low',
      notes: 'Small business, basic plan purchased.',
      assignedAgent: { id: 'john', name: 'John Smith', email: 'john@company.com' },
      createdAt: new Date(Date.now() - 259200000).toISOString()
    },
    {
      id: 'lead-5',
      name: 'Eva Rodriguez',
      email: 'eva@consulting.co',
      phone: '+1-555-0654',
      stageId: 'lost',
      priority: 'medium',
      notes: 'Went with competitor. Keep in touch for future.',
      assignedAgent: { id: 'priya', name: 'Priya Patel', email: 'priya@company.com' },
      createdAt: new Date(Date.now() - 345600000).toISOString()
    }
  ];

  return sampleLeads;
};