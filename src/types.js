
export const PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};


export const DEFAULT_STAGES = [
  { id: 'new-lead', name: 'New Lead', order: 0 },
  { id: 'contacted', name: 'Contacted', order: 1 },
  { id: 'qualified', name: 'Qualified', order: 2 },
  { id: 'won', name: 'Won', order: 3 },
  { id: 'lost', name: 'Lost', order: 4 }
];


export const DEFAULT_AGENTS = [
  { id: 'john', name: 'John Smith', email: 'john@company.com' },
  { id: 'priya', name: 'Priya Patel', email: 'priya@company.com' },
  { id: 'ahmed', name: 'Ahmed Hassan', email: 'ahmed@company.com' }
];


export const PRIORITY_COLORS = {
  [PRIORITY.HIGH]: '#ef4444',
  [PRIORITY.MEDIUM]: '#f59e0b',
  [PRIORITY.LOW]: '#10b981'
};